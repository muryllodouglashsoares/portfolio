/**
 * Controlador das duas esferas.
 *
 * Princípio: UMA posição por esfera, em coordenadas de viewport. Essa mesma
 * posição alimenta (a) a máscara tipográfica nas letras do Hero e (b) a camada
 * flutuante atrás do conteúdo. Por isso a esfera nunca "some e reaparece":
 * na saída do Hero a camada flutuante apenas ganha opacidade no lugar em que
 * a esfera já estava, enquanto a máscara continua mostrando a mesma esfera
 * sobre as letras.
 *
 * Tudo é derivado do progresso da página — não há estado armazenado além de
 * posição/velocidade (inércia) e relógio:
 *
 *   heroP  = rolagem / (altura do Hero · exitDistance)   → HERO → EXITING_HERO
 *   mergeP = progresso até o fim da página               → MERGING → FINAL_FORM
 *
 * Um único requestAnimationFrame, sem listeners de rolagem: a posição é lida
 * por quadro (leitura barata, sem forçar layout) e o hook usePageExperience
 * continua sendo o único dono dos listeners de scroll. A geometria é medida
 * só quando o layout muda (ResizeObserver) e guardada em cache.
 */

import {
  ANCHORS,
  FOLLOW,
  HERO,
  MOTION,
  ORB_IDS,
  SECTION_ORDER,
  PATH,
  type Anchor,
  type OrbId,
  type OrbState,
  type SectionKey,
} from "./orbConfig"
import { createInteractions } from "./orbInteractions"

const TAU = Math.PI * 2
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a || 1))
  return t * t * (3 - 2 * t)
}

/** Suavização com velocidade (inércia) — não ultrapassa o alvo. */
function smoothDamp(
  cur: number,
  target: number,
  s: { v: number },
  smoothTime: number,
  dt: number,
) {
  const omega = 2 / Math.max(0.0001, smoothTime)
  const x = omega * dt
  const e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = cur - target
  const temp = (s.v + omega * change) * dt
  s.v = (s.v - omega * temp) * e
  return target + (change + temp) * e
}

type Box = { left: number; top: number; width: number; height: number }
type LetterGeo = { el: HTMLElement; left: number; width: number; sig: string }
type WordGeo = Box & { el: HTMLElement; font: number; letters: LetterGeo[] }
type FinalGeo = { x: number; y: number; r: number }

type Geo = {
  vw: number
  vh: number
  docHeight: number
  heroTop: number
  heroHeight: number
  words: Partial<Record<OrbId, WordGeo>>
  sections: Array<{ key: SectionKey; top: number }>
  contactTop: number
  timeline: Box | null
  cards: Box[]
  final: Partial<Record<OrbId, FinalGeo>>
}

type Orb = {
  id: OrbId
  el: HTMLElement
  x: number
  y: number
  r: number
  vx: { v: number }
  vy: { v: number }
  vr: { v: number }
  phase: number
  // Cache do que já foi escrito no DOM (evita escritas repetidas).
  wT: string
  wO: number
  wA: number
  wH: number
}

export type OrbController = { destroy(): void }

type Options = {
  root: HTMLElement
  sectionIds: string[]
  reducedMotion: boolean
}

export function createOrbController({
  root,
  sectionIds,
  reducedMotion,
}: Options): OrbController {
  const doc = document.documentElement
  const heroEl = document.getElementById("inicio")
  const finalEl = document.querySelector<HTMLElement>("[data-orb-final]")
  const timelineEl = document.getElementById("trajetoria")?.querySelector<HTMLElement>(".timeline") ?? null

  const orbs: Orb[] = ORB_IDS.map((id) => ({
    id,
    el: root.querySelector<HTMLElement>(`[data-orb="${id}"]`)!,
    x: 0,
    y: 0,
    r: 40,
    vx: { v: 0 },
    vy: { v: 0 },
    vr: { v: 0 },
    phase: HERO.sweepPhase[id] * 2,
    wT: "",
    wO: -1,
    wA: -1,
    wH: -1,
  })).filter((o) => o.el)

  const interactions = createInteractions()
  const lowPowerDevice =
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    ((navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8) <= 4

  let geo: Geo | null = null
  let dirty = true
  let disposed = false
  let raf = 0
  let last = 0
  let time = 0
  let readyAt = -1
  let snap = true
  let state: OrbState = "HERO"
  let slowFrames = 0
  let idleFrames = 0
  let frameNo = 0
  let lastLit = false
  let lastMeasure = -1
  let lastScroll = -1
  let finalOn = false
  let quality: "high" | "low" = "high"
  let interactionClock = 0
  const fin = { sph: 0, q: 0, m: 0, vs: { v: 0 }, vq: { v: 0 }, vm: { v: 0 }, ws: -1, wq: -1, wm: -1 }

  // ───────────────────────── Medição (só quando o layout muda) ─────────────

  function box(el: Element, scrollY: number): Box {
    const r = el.getBoundingClientRect()
    return {
      left: r.left + window.scrollX,
      top: r.top + scrollY,
      width: r.width,
      height: r.height,
    }
  }

  function measure() {
    const scrollY = window.scrollY
    const vw = doc.clientWidth
    const vh = window.innerHeight
    const words: Geo["words"] = {}

    heroEl?.querySelectorAll<HTMLElement>("[data-orb-word]").forEach((el) => {
      const id = el.dataset.orbWord as OrbId
      const b = box(el, scrollY)
      // Caixa de cada letra (coordenadas de documento): a máscara é pintada só
      // nas letras que a esfera sobrepõe.
      const letters: LetterGeo[] = Array.from(
        el.querySelectorAll<HTMLElement>(".name-letter"),
      ).map((letter) => {
        const lr = letter.getBoundingClientRect()
        return { el: letter, left: lr.left + window.scrollX, width: lr.width, sig: "" }
      })
      words[id] = { ...b, el, letters, font: parseFloat(getComputedStyle(el).fontSize) || 100 }
    })

    const sections: Geo["sections"] = []
    for (const key of SECTION_ORDER) {
      if (!sectionIds.includes(key)) continue
      const el = document.getElementById(key)
      if (el) sections.push({ key, top: key === "inicio" ? 0 : box(el, scrollY).top })
    }
    sections.sort((a, b) => a.top - b.top)

    const final: Geo["final"] = {}
    document.querySelectorAll<HTMLElement>("[data-orb-final-sphere]").forEach((el) => {
      const id = el.dataset.orbFinalSphere as OrbId
      const r = el.getBoundingClientRect()
      final[id] = {
        x: r.left + window.scrollX + r.width / 2,
        y: r.top + scrollY + r.height / 2,
        r: r.width / 2,
      }
    })

    const hero = heroEl ? box(heroEl, scrollY) : { top: 0, height: vh, left: 0, width: vw }
    geo = {
      vw,
      vh,
      docHeight: doc.scrollHeight,
      heroTop: hero.top,
      heroHeight: hero.height,
      words,
      sections,
      contactTop: sections.find((s) => s.key === "contato")?.top ?? doc.scrollHeight,
      timeline: timelineEl ? box(timelineEl, scrollY) : null,
      cards: Array.from(document.querySelectorAll(".project-visual")).map((el) => box(el, scrollY)),
      final,
    }
    if (!reducedMotion) interactions.rebuild(scrollY)
  }

  // ───────────────────────── Geometria derivada do scroll ──────────────────

  function sectionBlend(yRef: number) {
    const s = geo!.sections
    if (!s.length) return { from: "inicio" as SectionKey, to: "inicio" as SectionKey, a: 0 }
    let i = 0
    for (let k = 0; k < s.length; k++) if (s[k].top <= yRef) i = k
    const next = s[i + 1]
    if (!next) return { from: s[i].key, to: s[i].key, a: 0 }
    const a = smoothstep(0, 1, (yRef - s[i].top) / Math.max(1, next.top - s[i].top))
    return { from: s[i].key, to: next.key, a }
  }

  const freeRadius = (vw: number) => {
    const [min, k, max] = vw < 820 ? MOTION.radiusPhone : MOTION.radiusDesktop
    return clamp(vw * k, min, max)
  }

  /**
   * Pinta a esfera dentro das letras. Só as letras sobrepostas recebem
   * variáveis (e só quando mudam); as demais ficam com a camada desligada,
   * então quase nada é estilizado/repintado por quadro.
   */
  function paintWord(wg: WordGeo, x: number, y: number, r: number, gi: number, scrollY: number) {
    const top = wg.top - scrollY
    const nearY = y > top - r && y < top + wg.height + r
    for (const L of wg.letters) {
      const left = L.left - window.scrollX
      const hit = gi > 0 && nearY && x + r > left - 2 && x - r < left + L.width + 2
      const sig = hit ? `${(x - left).toFixed(1)}|${(y - top).toFixed(1)}|${r.toFixed(1)}|${gi.toFixed(2)}` : "off"
      if (L.sig === sig) continue
      L.sig = sig
      const st = L.el.style
      if (hit) {
        st.setProperty("--ox", `${(x - left).toFixed(1)}px`)
        st.setProperty("--oy", `${(y - top).toFixed(1)}px`)
        st.setProperty("--or", `${r.toFixed(1)}px`)
        st.setProperty("--gi", gi.toFixed(3))
      } else {
        st.setProperty("--gi", "0")
      }
    }
  }

  // ───────────────────────── Quadro de animação ────────────────────────────

  function frame(now: number) {
    if (disposed) return
    raf = requestAnimationFrame(frame)
    let dt = (now - last) / 1000
    last = now
    if (dt <= 0) return
    dt = Math.min(dt, 0.05)

    // Qualidade adaptativa: sustenta ~60fps sem sacrificar o conteúdo.
    if (dt > 0.026) slowFrames = Math.min(slowFrames + 1, 200)
    else slowFrames = Math.max(slowFrames - 2, 0)
    if (quality === "high" && slowFrames > 90) {
      quality = "low"
      root.dataset.quality = "low"
    }

    time += dt
    frameNo++
    if (dirty && (lastMeasure < 0 || now - lastMeasure > 120)) {
      measure()
      lastMeasure = now
      dirty = false
    }
    if (!geo) return
    const g = geo

    const scrollY = window.scrollY
    const vh = window.innerHeight
    const vw = g.vw
    const phone = vw < 820
    const ampScale = phone ? MOTION.phoneAmplitude : 1


    // ── Progresso global ──
    const heroP = clamp(scrollY / Math.max(1, g.heroHeight * HERO.exitDistance))
    const w = smoothstep(0.04, 0.96, heroP) // 0 = nas letras · 1 = livre
    const maxScroll = Math.max(1, g.docHeight - vh)
    const mergeStart = Math.max(g.contactTop - vh * MOTION.mergeLead, g.heroHeight)
    const mergeP = clamp((scrollY - mergeStart) / Math.max(1, maxScroll - mergeStart))
    const mm = smoothstep(0, 0.55, mergeP)

    // ── Estado (derivado) ──
    let next: OrbState
    if (mergeP >= 0.985) next = "FINAL_FORM"
    else if (mergeP > 0) next = "MERGING"
    else if (heroP <= 0.001) next = "HERO"
    else if (heroP < 0.999) next = "EXITING_HERO"
    else next = "FOLLOWING_PAGE"
    if (next !== state) {
      state = next
      root.dataset.state = state
    }

    // ── Introdução no Hero (depois de as letras entrarem) ──
    if (readyAt < 0 && heroEl?.dataset.ready === "true") readyAt = time
    const sinceReady = readyAt < 0 ? -1 : time - readyAt
    const intro = smoothstep(HERO.introDelay, HERO.introDelay + HERO.introFade, sinceReady)
    // Se a página abriu já rolada, as esferas não esperam a introdução.
    const gate = Math.max(intro, smoothstep(0.1, 0.4, heroP))

    // ── Alvos ──
    const blend = sectionBlend(scrollY + vh * 0.5)
    const weightOf = (key: SectionKey) =>
      (blend.from === key ? 1 - blend.a : 0) + (blend.to === key ? blend.a : 0)
    const wTimeline = weightOf("trajetoria")
    const wProjects = weightOf("projetos")
    const R = freeRadius(vw)
    const heroVisible = g.heroTop + g.heroHeight - scrollY > -60

    // Card de projeto mais próximo do centro da tela (atrator).
    let card: Box | null = null
    if (wProjects > 0.02) {
      let best = Infinity
      for (const c of g.cards) {
        const d = Math.abs(c.top + c.height / 2 - scrollY - vh * 0.5)
        if (d < best) {
          best = d
          card = c
        }
      }
    }
    const tlProgress = parseFloat(timelineEl?.style.getPropertyValue("--timeline-progress") ?? "") || 0

    let moved = 0
    const interactionOrbs: Array<{ id: OrbId; x: number; y: number; r: number }> = []

    for (const orb of orbs) {
      const id = orb.id
      const sign = id === "purple" ? 1 : -1
      const wordGeo = g.words[id]

      // 1) Alvo livre: âncora da seção + deriva orgânica + arrasto de rolagem.
      const A: Anchor = ANCHORS[blend.from][id]
      const B: Anchor = ANCHORS[blend.to][id]
      const ay = lerp(A.y, B.y, blend.a)
      const P = PATH[id]

      // Trajeto em função da rolagem (u): descer → um sentido, subir → o
      // inverso, exatamente. Sem tempo e sem aleatoriedade.
      const u = scrollY / vh
      const calm = (1 - mm) * ampScale
      const midY = lerp(0.5, ay, 0.35)
      let fx = vw * (0.5 + calm * (P.ax * Math.sin(TAU * u * P.fx + P.px) + P.ax2 * Math.sin(TAU * u * P.fx2 + P.px2)))
      let fy = vh * (midY + calm * (P.ay * Math.sin(TAU * u * P.fy + P.py) + P.ay2 * Math.sin(TAU * u * P.fy2 + P.py2)))

      // Projetos: a esfera passeia pelas bordas do card mais próximo.
      if (card) {
        const cx = (sign > 0 ? card.left + card.width + R * 0.1 : card.left - R * 0.1)
        const cy = card.top - scrollY + card.height * (sign > 0 ? 0.2 : 0.82)
        fx = lerp(fx, cx, 0.3 * wProjects)
        fy = lerp(fy, cy, 0.3 * wProjects)
      }
      // Trajetória: acompanha a linha do tempo que se desenha.
      if (g.timeline && wTimeline > 0.02) {
        const tl = g.timeline
        const lead = clamp(tlProgress + (sign > 0 ? 0.05 : -0.1))
        let tx: number
        let ty: number
        if (phone) {
          tx = tl.left + 17 + (sign > 0 ? 0 : 26)
          ty = tl.top - scrollY + 17 + (tl.height - 34) * lead
        } else {
          tx = tl.left + 17 + (tl.width - 34) * lead
          ty = tl.top - scrollY + 17 + (sign > 0 ? -R * 0.35 : R * 0.7)
        }
        fx = lerp(fx, tx, 0.55 * wTimeline)
        fy = lerp(fy, clamp(ty, vh * 0.1, vh * 0.9), 0.55 * wTimeline)
      }

      let tx = fx
      let ty = fy
      let tr = R
      let tAlpha = lerp(1, FOLLOW.body[id], smoothstep(0.05, 0.9, w))
      let tHalo = lerp(1, FOLLOW.halo, smoothstep(0.05, 0.9, w))

      // 2) Alvo no Hero: percorre a palavra de ponta a ponta (M→O / D→S).
      if (wordGeo) {
        const sweep = HERO.sweepSeconds[id]
        if (sinceReady > HERO.introDelay * 0.85) {
          // A "intensidade" da travessia cai conforme o Hero é deixado para trás.
          orb.phase += (dt / sweep) * (1 - 0.85 * w)
        }
        const p = orb.phase % 2
        const tri = p < 1 ? p : 2 - p
        const e = 0.5 - 0.5 * Math.cos(Math.PI * tri)
        const hr = HERO.radiusEm * wordGeo.font
        const hx = wordGeo.left + e * wordGeo.width
        const hy =
          wordGeo.top - scrollY + wordGeo.height / 2 + Math.sin(time * 0.8 + sign) * hr * HERO.bob
        tx = lerp(hx, tx, w)
        ty = lerp(hy, ty, w)
        tr = lerp(hr, tr, w)
      }

      // 3) Convergência: rumo à posição de cada esfera na composição final.
      const fin = g.final[id]
      if (mm > 0 && fin) {
        const gx = fin.x
        const gy = clamp(fin.y - scrollY, vh * 0.2, vh - fin.r * 0.8)
        const dx = gx - tx
        const dy = gy - ty
        const dist = Math.hypot(dx, dy) || 1
        // Curva suave (arco) em vez de linha reta → movimento orgânico.
        const arc = Math.sin(Math.PI * mm) * Math.min(160, dist * 0.22) * sign
        tx = lerp(tx, gx, mm) + (-dy / dist) * arc
        ty = lerp(ty, gy, mm) + (dx / dist) * arc
        tr = lerp(tr, fin.r, mm)
        tAlpha = lerp(tAlpha, 1, mm)
        tHalo = lerp(tHalo, 1, mm)
      }

      // 4) Inércia. Nas letras o acompanhamento é exato (sem atraso).
      const smooth = lerp(0.02, MOTION.travelTime[id], smoothstep(0, 0.35, w)) * (1 - 0.35 * mm)
      const px = orb.x
      const py = orb.y
      const pr = orb.r
      if (snap || (w < 0.003 && mm === 0)) {
        orb.x = tx
        orb.y = ty
        orb.r = tr
        orb.vx.v = orb.vy.v = orb.vr.v = 0
      } else {
        orb.x = smoothDamp(orb.x, tx, orb.vx, smooth, dt)
        orb.y = smoothDamp(orb.y, ty, orb.vy, smooth, dt)
        orb.r = smoothDamp(orb.r, tr, orb.vr, smooth * 0.8, dt)
      }

      moved += Math.abs(orb.x - px) + Math.abs(orb.y - py) + Math.abs(orb.r - pr)

      // 5) Camada flutuante: aparece (emerge) na saída e cede lugar à figura final.
      const emerge = smoothstep(0, 0.4, heroP) * gate
      const handoff = 1 - smoothstep(0.5, 0.58, mergeP)
      const opacity = reducedMotion ? 0 : emerge * handoff
      const transform = `translate3d(${orb.x.toFixed(1)}px,${orb.y.toFixed(1)}px,0) scale(${(orb.r / 100).toFixed(3)})`
      if (transform !== orb.wT) {
        orb.el.style.transform = transform
        orb.wT = transform
      }
      const o = Math.round(opacity * 1000) / 1000
      if (o !== orb.wO) {
        orb.el.style.opacity = String(o)
        orb.el.style.visibility = o < 0.004 ? "hidden" : "visible"
        orb.wO = o
      }
      const a = Math.round(tAlpha * 1000) / 1000
      if (a !== orb.wA) {
        orb.el.style.setProperty("--a", String(a))
        orb.wA = a
      }
      const h = Math.round(tHalo * 1000) / 1000
      if (h !== orb.wH) {
        orb.el.style.setProperty("--ha", String(h))
        orb.wH = h
      }

      // 6) Máscara tipográfica: a MESMA esfera, desenhada dentro das letras.
      // Em dispositivos modestos (ou se o navegador acusar quadros lentos) a
      // máscara — a parte mais cara — é repintada a cada 2 quadros (30fps).
      const paintNow = !(quality === "low" || lowPowerDevice) || (frameNo & 1) === 0
      if (wordGeo && heroVisible && paintNow) paintWord(wordGeo, orb.x, orb.y, orb.r, intro, scrollY)

      interactionOrbs.push({ id, x: orb.x, y: orb.y, r: orb.r })
    }
    // ── Encerramento: discos → separação → ícones. Cada etapa tem alvo em
    //    função da rolagem e é suavizada com inércia (fluidez e reversão). ──
    if (finalEl) {
      const tSph = smoothstep(0.45, 0.55, mergeP)
      const tQ = smoothstep(0.58, 0.82, mergeP)
      const tM = smoothstep(0.8, 0.97, mergeP)
      if (snap) {
        fin.sph = tSph
        fin.q = tQ
        fin.m = tM
      } else {
        fin.sph = smoothDamp(fin.sph, tSph, fin.vs, 0.12, dt)
        fin.q = smoothDamp(fin.q, tQ, fin.vq, 0.45, dt)
        fin.m = smoothDamp(fin.m, tM, fin.vm, 0.5, dt)
      }
      const put = (name: string, v: number, key: "ws" | "wq" | "wm") => {
        const r = Math.round(clamp(v) * 1000) / 1000
        if (r !== fin[key]) {
          finalEl.style.setProperty(name, String(r))
          fin[key] = r
        }
      }
      const on = fin.sph > 0.004
      if (on !== finalOn) {
        finalOn = on
        finalEl.dataset.on = String(on)
      }
      put("--f-sph", fin.sph, "ws")
      put("--q", fin.q, "wq")
      put("--m", fin.m, "wm")
    }

    // ── Reações dos elementos (≈30Hz; 15Hz em dispositivos modestos) ──
    interactionClock += dt
    const step = quality === "low" || lowPowerDevice ? 1 / 15 : 1 / 30
    if (interactionClock >= step) {
      const activity = smoothstep(0.55, 0.95, w) * (1 - smoothstep(0.2, 0.5, mergeP))
      lastLit = interactions.update(interactionOrbs, scrollY, vh, activity, interactionClock)
      interactionClock = 0
    }
    const litActive = lastLit

    // ── Dormir quando nada muda: sem rolagem, esferas e etapas assentadas,
    //    Hero fora de vista e nenhum elemento aceso. A rolagem acorda o loop. ──
    const scrolled = scrollY !== lastScroll
    lastScroll = scrollY
    const heroAnimating = heroVisible && (readyAt < 0 || w < 0.999)
    const settled =
      !scrolled &&
      moved < 0.04 &&
      !heroAnimating &&
      !litActive &&
      Math.abs(fin.sph - clamp(smoothstep(0.45, 0.55, mergeP))) < 0.002 &&
      Math.abs(fin.q - smoothstep(0.58, 0.82, mergeP)) < 0.002 &&
      Math.abs(fin.m - smoothstep(0.8, 0.97, mergeP)) < 0.002 &&
      !dirty
    idleFrames = settled ? idleFrames + 1 : 0
    if (idleFrames > 20 && !snap) {
      cancelAnimationFrame(raf)
      raf = 0
      idleFrames = 0
    }
    snap = false
  }

  // ───────────────────────── Modo movimento reduzido ───────────────────────
  // Sem loop: esferas estáticas dentro das letras; sem camada flutuante;
  // a composição final aparece de forma discreta ao entrar na tela.

  function renderStatic() {
    if (!geo) measure()
    const g = geo!
    const fractions: Record<OrbId, number> = { purple: 0.58, white: 0.36 }
    for (const id of ORB_IDS) {
      const wg = g.words[id]
      if (!wg) continue
      for (const L of wg.letters) L.sig = ""
      paintWord(
        wg,
        wg.left - window.scrollX + wg.width * fractions[id],
        wg.top - window.scrollY + wg.height / 2,
        HERO.radiusEm * wg.font,
        1,
        window.scrollY,
      )
    }
  }

  // ───────────────────────── Observadores e ciclo de vida ──────────────────

  const wake = () => {
    if (reducedMotion || disposed || raf || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  const markDirty = () => {
    dirty = true
    wake()
    if (reducedMotion) {
      measure()
      dirty = false
      renderStatic()
    }
  }

  const resizeObserver = new ResizeObserver(markDirty)
  resizeObserver.observe(document.body)
  heroEl?.querySelectorAll("[data-orb-word]").forEach((el) => resizeObserver.observe(el))
  let lastWidth = doc.clientWidth
  const onResize = () => {
    if (doc.clientWidth !== lastWidth) {
      lastWidth = doc.clientWidth
      markDirty()
    }
  }
  const onFonts = () => markDirty()
  window.addEventListener("resize", onResize)
  // Único listener de rolagem do sistema: só acorda o loop (sem cálculo).
  window.addEventListener("scroll", wake, { passive: true })
  window.addEventListener("load", onFonts)
  document.fonts?.addEventListener?.("loadingdone", onFonts)

  const finalObserver =
    finalEl && "IntersectionObserver" in window
      ? new IntersectionObserver(
          ([entry]) => {
            finalEl.dataset.active = String(entry.isIntersecting)
            if (reducedMotion) {
              const v = entry.isIntersecting ? "1" : "0"
              for (const n of ["--f-sph", "--q", "--m"]) finalEl.style.setProperty(n, v)
            }
          },
          { threshold: reducedMotion ? 0.35 : 0 },
        )
      : null
  if (finalEl) finalObserver?.observe(finalEl)

  const onVisibility = () => {
    if (reducedMotion) return
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
    } else {
      wake()
    }
  }
  document.addEventListener("visibilitychange", onVisibility)

  if (reducedMotion) {
    measure()
    dirty = false
    renderStatic()
  } else {
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  return {
    destroy() {
      disposed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      finalObserver?.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", wake)
      window.removeEventListener("load", onFonts)
      document.fonts?.removeEventListener?.("loadingdone", onFonts)
      document.removeEventListener("visibilitychange", onVisibility)
      interactions.dispose()
      heroEl?.querySelectorAll<HTMLElement>(".name-letter").forEach((l) => {
        for (const v of ["--ox", "--oy", "--or", "--gi"]) l.style.removeProperty(v)
      })
      for (const n of ["--f-sph", "--q", "--m"]) finalEl?.style.removeProperty(n)
    },
  }
}
