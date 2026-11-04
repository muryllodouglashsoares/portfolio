#!/usr/bin/env python3
"""
NODE-01 — gerador procedural do robô 3D do portfólio.

Gera `public/models/node-bot.glb` (glTF 2.0 binário) usando apenas numpy:
geometria própria (caixas arredondadas, cilindros, esferas, toros), materiais PBR,
hierarquia de articulações e três clips de animação (Idle, Arrive, Scan).

Uso:  python3 tools/robot/build_robot.py [saida.glb]
"""
import json
import math
import struct
import sys
from pathlib import Path

import numpy as np

# ───────────────────────── geometria ─────────────────────────


class Mesh:
    def __init__(self, pos, nrm, idx):
        self.pos = np.asarray(pos, dtype=np.float64).reshape(-1, 3)
        self.nrm = np.asarray(nrm, dtype=np.float64).reshape(-1, 3)
        self.idx = np.asarray(idx, dtype=np.int64).reshape(-1, 3)

    def xf(self, t=(0, 0, 0), rot=None, scale=(1, 1, 1)):
        s = np.asarray(scale, dtype=np.float64)
        r = np.eye(3) if rot is None else rot
        pos = (self.pos * s) @ r.T + np.asarray(t, dtype=np.float64)
        nrm = (self.nrm / s) @ r.T
        nrm /= np.linalg.norm(nrm, axis=1, keepdims=True) + 1e-12
        return Mesh(pos, nrm, self.idx.copy())


def merge(meshes):
    pos, nrm, idx, off = [], [], [], 0
    for m in meshes:
        pos.append(m.pos)
        nrm.append(m.nrm)
        idx.append(m.idx + off)
        off += len(m.pos)
    return Mesh(np.vstack(pos), np.vstack(nrm), np.vstack(idx))


def fix_winding(m):
    p = m.pos[m.idx]
    face_n = np.cross(p[:, 1] - p[:, 0], p[:, 2] - p[:, 0])
    avg_n = m.nrm[m.idx].sum(axis=1)
    flip = (face_n * avg_n).sum(axis=1) < 0
    m.idx[flip] = m.idx[flip][:, [0, 2, 1]]
    return m


def grid_indices(nu, nv):
    i, j = np.meshgrid(np.arange(nu - 1), np.arange(nv - 1), indexing="ij")
    a = (i * nv + j).ravel()
    b = a + 1
    c = a + nv
    d = c + 1
    return np.concatenate([np.stack([a, b, c], 1), np.stack([b, d, c], 1)])


def rot(axis, deg):
    a = math.radians(deg)
    c, s = math.cos(a), math.sin(a)
    if axis == "x":
        return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])
    if axis == "y":
        return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def rbox(w, h, d, r, seg=None):
    """Caixa com cantos arredondados (normais suaves nos raios, planas no meio)."""
    half = np.array([w, h, d]) / 2
    r = min(r, *half)
    if seg is None:
        seg = 3 if r >= 0.04 else 2 if r >= 0.012 else 1

    def samples(a):
        ph = np.linspace(0, math.pi / 2, seg + 1)
        neg = -(a - r) - r * np.sin(ph[::-1])
        pos = (a - r) + r * np.sin(ph)
        return np.concatenate([neg, pos])

    parts = []
    for n in range(3):
        u, v = [k for k in range(3) if k != n]
        for sgn in (1, -1):
            U, V = np.meshgrid(samples(half[u]), samples(half[v]), indexing="ij")
            p = np.zeros(U.shape + (3,))
            p[..., n] = sgn * half[n]
            p[..., u] = U
            p[..., v] = V
            p = p.reshape(-1, 3)
            inner = np.clip(p, -(half - r), half - r)
            dvec = p - inner
            nrm = dvec / (np.linalg.norm(dvec, axis=1, keepdims=True) + 1e-12)
            pos = inner + r * nrm
            parts.append(Mesh(pos, nrm, grid_indices(U.shape[0], U.shape[1])))
    return fix_winding(merge(parts))


def cyl(rt, rb, h, seg=24, caps=True):
    """Cilindro/cone ao longo de Y, centrado na origem."""
    th = np.linspace(0, 2 * math.pi, seg + 1)
    c, s = np.cos(th), np.sin(th)
    slope = (rb - rt) / h
    side_n = np.stack([c, np.full_like(c, slope), s], 1)
    side_n /= np.linalg.norm(side_n, axis=1, keepdims=True)
    top = np.stack([rt * c, np.full_like(c, h / 2), rt * s], 1)
    bot = np.stack([rb * c, np.full_like(c, -h / 2), rb * s], 1)
    pos = np.vstack([top, bot])
    nrm = np.vstack([side_n, side_n])
    idx = grid_indices(2, seg + 1)
    parts = [fix_winding(Mesh(pos, nrm, idx))]
    if caps:
        for y, rr, ny in ((h / 2, rt, 1), (-h / 2, rb, -1)):
            if rr <= 1e-6:
                continue
            ring = np.stack([rr * c[:-1], np.full(seg, y), rr * s[:-1]], 1)
            ctr = np.array([[0, y, 0]])
            pp = np.vstack([ctr, ring])
            nn = np.tile([0, ny, 0], (seg + 1, 1))
            ii = np.array([[0, 1 + k, 1 + (k + 1) % seg] for k in range(seg)])
            parts.append(fix_winding(Mesh(pp, nn, ii)))
    return merge(parts)


def sphere(r, seg=24, rings=14):
    th = np.linspace(0, 2 * math.pi, seg + 1)
    ph = np.linspace(0, math.pi, rings + 1)
    T, P = np.meshgrid(th, ph, indexing="ij")
    n = np.stack([np.sin(P) * np.cos(T), np.cos(P), np.sin(P) * np.sin(T)], -1).reshape(-1, 3)
    return fix_winding(Mesh(n * r, n, grid_indices(seg + 1, rings + 1)))


def torus(R, r, seg=40, tube=12):
    """Toro no plano XZ, em torno do eixo Y."""
    a = np.linspace(0, 2 * math.pi, seg + 1)
    b = np.linspace(0, 2 * math.pi, tube + 1)
    A, B = np.meshgrid(a, b, indexing="ij")
    cx = np.stack([np.cos(A), np.zeros_like(A), np.sin(A)], -1)
    n = cx * np.cos(B)[..., None] + np.array([0, 1, 0]) * np.sin(B)[..., None]
    p = cx * R + n * r
    return fix_winding(Mesh(p.reshape(-1, 3), n.reshape(-1, 3), grid_indices(seg + 1, tube + 1)))


# ───────────────────────── glTF ─────────────────────────

FLOAT, USHORT, UINT = 5126, 5123, 5125


class GLB:
    def __init__(self):
        self.bin = bytearray()
        self.views, self.accessors = [], []
        self.meshes, self.materials, self.nodes = [], [], []
        self.animations = []
        self._time_cache = {}

    def _view(self, data, target=None):
        self.bin += b"\x00" * ((-len(self.bin)) % 4)
        bv = {"buffer": 0, "byteOffset": len(self.bin), "byteLength": len(data)}
        if target:
            bv["target"] = target
        self.bin += data
        self.views.append(bv)
        return len(self.views) - 1

    def _accessor(self, arr, ctype, typ, target=None, minmax=False):
        dtype = {FLOAT: np.float32, USHORT: np.uint16, UINT: np.uint32}[ctype]
        arr = np.ascontiguousarray(arr, dtype=dtype)
        acc = {
            "bufferView": self._view(arr.tobytes(), target),
            "componentType": ctype,
            "count": int(arr.shape[0]),
            "type": typ,
        }
        if minmax:
            flat = arr.reshape(arr.shape[0], -1)
            acc["min"] = [float(x) for x in flat.min(axis=0)]
            acc["max"] = [float(x) for x in flat.max(axis=0)]
        self.accessors.append(acc)
        return len(self.accessors) - 1

    def material(self, name, color, metallic, rough, emissive=None, strength=None):
        m = {
            "name": name,
            "pbrMetallicRoughness": {
                "baseColorFactor": [*color, 1.0],
                "metallicFactor": metallic,
                "roughnessFactor": rough,
            },
        }
        if emissive:
            m["emissiveFactor"] = list(emissive)
            if strength:
                m["extensions"] = {"KHR_materials_emissive_strength": {"emissiveStrength": strength}}
        self.materials.append(m)
        return len(self.materials) - 1

    def mesh(self, name, parts):
        """parts: lista de (Mesh, material). Une as malhas de mesmo material."""
        by_mat = {}
        for m, mat in parts:
            by_mat.setdefault(mat, []).append(m)
        prims = []
        for mat, ms in by_mat.items():
            m = merge(ms)
            idx = m.idx.reshape(-1)
            ctype = USHORT if len(m.pos) < 65535 else UINT
            prims.append(
                {
                    "attributes": {
                        "POSITION": self._accessor(m.pos, FLOAT, "VEC3", 34962, True),
                        "NORMAL": self._accessor(m.nrm, FLOAT, "VEC3", 34962),
                    },
                    "indices": self._accessor(idx, ctype, "SCALAR", 34963),
                    "material": mat,
                    "mode": 4,
                }
            )
        self.meshes.append({"name": name, "primitives": prims})
        return len(self.meshes) - 1

    def node(self, name, parent=None, t=None, mesh=None):
        n = {"name": name}
        if t is not None:
            n["translation"] = [float(x) for x in t]
        if mesh is not None:
            n["mesh"] = mesh
        self.nodes.append(n)
        i = len(self.nodes) - 1
        if parent is not None:
            self.nodes[parent].setdefault("children", []).append(i)
        return i

    def animation(self, name, channels):
        """channels: (node, 'rotation'|'translation', tempos, valores)"""
        samplers, chans = [], []
        for node, path, times, vals in channels:
            key = tuple(round(float(x), 6) for x in times)
            if key not in self._time_cache:
                self._time_cache[key] = self._accessor(np.array(times), FLOAT, "SCALAR", None, True)
            typ = "VEC4" if path == "rotation" else "VEC3"
            out = self._accessor(np.array(vals), FLOAT, typ)
            samplers.append({"input": self._time_cache[key], "output": out, "interpolation": "LINEAR"})
            chans.append({"sampler": len(samplers) - 1, "target": {"node": node, "path": path}})
        self.animations.append({"name": name, "samplers": samplers, "channels": chans})

    def write(self, path, root):
        doc = {
            "asset": {
                "version": "2.0",
                "generator": "tools/robot/build_robot.py (numpy)",
                "copyright": "NODE-01 — modelo original criado para o portfólio de Muryllo Douglas",
            },
            "extensionsUsed": ["KHR_materials_emissive_strength"],
            "scene": 0,
            "scenes": [{"name": "NODE-01", "nodes": [root]}],
            "nodes": self.nodes,
            "meshes": self.meshes,
            "materials": self.materials,
            "accessors": self.accessors,
            "bufferViews": self.views,
            "animations": self.animations,
            "buffers": [{"byteLength": len(self.bin)}],
        }
        js = json.dumps(doc, separators=(",", ":")).encode()
        js += b" " * ((-len(js)) % 4)
        bn = bytes(self.bin) + b"\x00" * ((-len(self.bin)) % 4)
        total = 12 + 8 + len(js) + 8 + len(bn)
        with open(path, "wb") as f:
            f.write(struct.pack("<4sII", b"glTF", 2, total))
            f.write(struct.pack("<I4s", len(js), b"JSON") + js)
            f.write(struct.pack("<I4s", len(bn), b"BIN\x00") + bn)
        return total


# ───────────────────────── quaternions ─────────────────────────


def qaxis(axis, deg):
    a = math.radians(deg) / 2
    s, c = math.sin(a), math.cos(a)
    return {"x": (s, 0, 0, c), "y": (0, s, 0, c), "z": (0, 0, s, c)}[axis]


def qmul(a, b):
    ax, ay, az, aw = a
    bx, by, bz, bw = b
    return (
        aw * bx + ax * bw + ay * bz - az * by,
        aw * by - ax * bz + ay * bw + az * bx,
        aw * bz + ax * by - ay * bx + az * bw,
        aw * bw - ax * bx - ay * by - az * bz,
    )


def q(*steps):
    """q(('z',5),('x',-10)) → rotação composta, aplicada da direita para a esquerda."""
    out = (0, 0, 0, 1)
    for axis, deg in steps:
        out = qmul(out, qaxis(axis, deg))
    n = math.sqrt(sum(c * c for c in out))
    return tuple(c / n for c in out)


# ───────────────────────── modelo ─────────────────────────


def build(path):
    g = GLB()

    # Materiais (paleta do portfólio: grafite, preto fosco, metal, violeta com moderação)
    GRAPHITE = g.material("Graphite", (0.085, 0.09, 0.11), 0.55, 0.42)
    BLACK = g.material("MatteBlack", (0.025, 0.026, 0.032), 0.25, 0.72)
    METAL = g.material("GunMetal", (0.42, 0.44, 0.5), 1.0, 0.3)
    GLASS = g.material("DarkGlass", (0.008, 0.009, 0.014), 0.0, 0.06)
    VIOLET = g.material("VioletLED", (0.36, 0.2, 0.85), 0.0, 0.4, (0.46, 0.26, 0.92), 1.0)
    BLUE = g.material("LavenderLED", (0.5, 0.38, 0.92), 0.0, 0.4, (0.58, 0.44, 0.98), 1.0)
    TRIM = g.material("VioletTrim", (0.17, 0.11, 0.42), 0.6, 0.4)

    def part(mesh, mat, t=(0, 0, 0), r=None, s=(1, 1, 1)):
        return (mesh.xf(t, r, s), mat)

    root = g.node("NodeBot")
    float_n = g.node("Float", root)

    # ── Tronco ──
    torso_parts = [
        part(rbox(0.40, 0.34, 0.27, 0.07), GRAPHITE, (0, 0.43, 0)),
        part(rbox(0.30, 0.20, 0.03, 0.012), BLACK, (0, 0.45, 0.14)),
        part(cyl(0.032, 0.032, 0.012, 19), VIOLET, (0, 0.47, 0.158), rot("x", 90)),
        part(torus(0.044, 0.008, 24, 6), METAL, (0, 0.47, 0.155), rot("x", 90)),
        part(rbox(0.36, 0.05, 0.22, 0.02), BLACK, (0, 0.605, 0)),
        part(torus(0.135, 0.012, 29, 6), METAL, (0, 0.255, 0)),
        part(cyl(0.13, 0.075, 0.12, 24), GRAPHITE, (0, 0.19, 0)),
        part(cyl(0.04, 0.046, 0.035, 16), METAL, (0, 0.1125, 0)),
        part(cyl(0.05, 0.12, 0.025, 24), METAL, (0, 0.0825, 0)),
        part(cyl(0.15, 0.15, 0.03, 32), GRAPHITE, (0, 0.055, 0)),
        part(cyl(0.153, 0.153, 0.006, 32), VIOLET, (0, 0.047, 0)),
        part(cyl(0.12, 0.10, 0.012, 28), BLACK, (0, 0.034, 0)),
        part(cyl(0.09, 0.09, 0.004, 24), VIOLET, (0, 0.027, 0)),
        part(rbox(0.26, 0.22, 0.09, 0.03), GRAPHITE, (0, 0.44, -0.17)),
        part(cyl(0.045, 0.055, 0.08, 19), METAL, (0, 0.64, 0)),
        part(torus(0.057, 0.006, 20, 6), BLACK, (0, 0.625, 0)),
        part(torus(0.05, 0.006, 20, 6), BLACK, (0, 0.655, 0)),
    ]
    for k, y in enumerate((0.40, 0.378, 0.356)):
        torso_parts.append(part(rbox(0.16, 0.012, 0.01, 0.004), TRIM, (0, y, 0.156)))
    for y in (0.40, 0.44, 0.48):
        torso_parts.append(part(rbox(0.18, 0.012, 0.01, 0.004), TRIM, (0, y, -0.218)))
    torso = g.node("Torso", float_n, mesh=g.mesh("TorsoMesh", torso_parts))

    # ── Cabeça ──
    head = g.node("Head", torso, t=(0, 0.68, 0))
    head_parts = [
        part(rbox(0.36, 0.24, 0.30, 0.075), GRAPHITE, (0, 0.125, 0)),
        part(rbox(0.30, 0.125, 0.03, 0.05), GLASS, (0, 0.125, 0.148)),
        part(rbox(0.15, 0.016, 0.008, 0.006), VIOLET, (0, 0.125, 0.1655)),
        part(rbox(0.20, 0.014, 0.14, 0.006), METAL, (0, 0.2455, -0.01)),
        part(rbox(0.14, 0.05, 0.01, 0.004), BLACK, (0, 0.125, -0.152)),
        part(cyl(0.014, 0.018, 0.02, 14), METAL, (0.09, 0.255, -0.06)),
    ]
    for sx in (1, -1):
        head_parts += [
            part(cyl(0.05, 0.05, 0.055, 19), METAL, (sx * 0.195, 0.125, 0), rot("z", 90)),
            part(cyl(0.016, 0.016, 0.004, 14), VIOLET, (sx * 0.2245, 0.125, 0), rot("z", 90)),
            part(sphere(0.007, 10, 6), BLUE, (sx * 0.12, 0.088, 0.166)),
        ]
    g.nodes[head]["mesh"] = g.mesh("HeadMesh", head_parts)

    ant = g.node("Antenna", head, t=(0.09, 0.262, -0.06))
    g.nodes[ant]["mesh"] = g.mesh(
        "AntennaMesh",
        [part(cyl(0.005, 0.005, 0.10, 14), METAL, (0, 0.05, 0)), part(sphere(0.016, 11, 7), BLUE, (0, 0.105, 0))],
    )

    # ── Braços ──
    arms = {}
    for name, sx in (("L", 1), ("R", -1)):
        sh = g.node(f"Shoulder{name}", torso, t=(sx * 0.262, 0.54, 0))
        g.nodes[sh]["mesh"] = g.mesh(
            f"Shoulder{name}Mesh",
            [
                part(sphere(0.052, 17, 10), METAL),
                part(rbox(0.075, 0.09, 0.12, 0.03), GRAPHITE, (sx * 0.012, 0.012, 0)),
                part(rbox(0.004, 0.04, 0.06, 0.001), TRIM, (sx * 0.0535, 0.012, 0)),
                part(cyl(0.036, 0.032, 0.13, 17), GRAPHITE, (0, -0.09, 0)),
            ],
        )
        el = g.node(f"Elbow{name}", sh, t=(0, -0.165, 0))
        g.nodes[el]["mesh"] = g.mesh(
            f"Elbow{name}Mesh",
            [
                part(sphere(0.042, 14, 8), METAL),
                part(rbox(0.082, 0.15, 0.088, 0.024), GRAPHITE, (0, -0.09, 0.004)),
                part(rbox(0.088, 0.016, 0.094, 0.006), TRIM, (0, -0.062, 0.004)),
                part(cyl(0.03, 0.03, 0.03, 14), METAL, (0, -0.175, 0)),
                part(rbox(0.07, 0.04, 0.06, 0.015), BLACK, (0, -0.205, 0)),
                part(rbox(0.016, 0.055, 0.03, 0.006), METAL, (-0.022, -0.25, 0), rot("z", -6)),
                part(rbox(0.016, 0.055, 0.03, 0.006), METAL, (0.022, -0.25, 0), rot("z", 6)),
            ],
        )
        arms[name] = (sh, el, sx)

    # base pose (bind): braços com leve abdução e cotovelo flexionado
    ABD, ELB = 5.0, -14.0
    g.nodes[torso]["rotation"] = [0, 0, 0, 1]
    for name, (sh, el, sx) in arms.items():
        g.nodes[sh]["rotation"] = list(q(("z", sx * ABD)))
        g.nodes[el]["rotation"] = list(q(("x", ELB)))

    # ───────── animações ─────────
    TAU = 2 * math.pi

    def grid(dur, step):
        return [round(float(t), 4) for t in np.arange(0, dur + 1e-9, step)]

    def smooth(x):
        x = min(max(x, 0.0), 1.0)
        return x * x * (3 - 2 * x)

    def spring(t):  # 0→1 com leve overshoot amortecido
        return 1 - math.exp(-5.5 * t) * math.cos(9.0 * t) if t > 0 else 0.0

    def tracks(fn_by_node, times):
        """fn_by_node: {(node, path): fn(t)}"""
        return [(n, p, times, [fn(t) for t in times]) for (n, p), fn in fn_by_node.items()]

    # Idle — 8 s, laço contínuo e discreto
    T = grid(8.0, 0.25)
    sin = math.sin
    idle = {
        (float_n, "translation"): lambda t: (0, 0.018 * sin(TAU * t / 4), 0),
        (torso, "rotation"): lambda t: q(("y", 2.4 * sin(TAU * t / 8))),
        (head, "rotation"): lambda t: q(("y", 4.0 * sin(TAU * t / 8 - 0.9) + 1.2 * sin(TAU * t / 4 + 0.4)), ("x", 1.8 * sin(TAU * t / 4 + 1.0))),
        (ant, "rotation"): lambda t: q(("z", 7 * sin(TAU * t / 4 + 2.0)), ("x", 3 * sin(TAU * t / 8 + 0.6))),
    }
    for name, (sh, el, sx) in arms.items():
        ph = 0.6 if sx > 0 else 0.6 + math.pi
        idle[(sh, "rotation")] = (lambda sx, ph: lambda t: q(("z", sx * (ABD + 0.9 * sin(TAU * t / 4 + ph))), ("x", 2.2 * sin(TAU * t / 4 + ph))))(sx, ph)
        idle[(el, "rotation")] = (lambda ph: lambda t: q(("x", ELB + 2.4 * sin(TAU * t / 4 + ph + 0.6))))(ph)
    g.animation("Idle", tracks(idle, T))

    # Arrive — 1.4 s, uma vez: sobe, olha para o conteúdo e assenta
    T = grid(1.4, 0.05)
    E = lambda t: spring(t / 1.0)
    arrive = {
        (float_n, "translation"): lambda t: (0, -0.07 * (1 - E(t)), 0),
        (torso, "rotation"): lambda t: q(("y", 14 * (1 - E(t)))),
        (head, "rotation"): lambda t: q(("y", -10 * (1 - E(t))), ("x", 16 * (1 - E(t)))),
        (ant, "rotation"): lambda t: q(("z", 18 * (1 - E(t)) * math.cos(14 * t))),
    }
    for name, (sh, el, sx) in arms.items():
        arrive[(sh, "rotation")] = (lambda sx: lambda t: q(("z", sx * (ABD + 20 * (1 - E(t)))), ("x", -8 * (1 - E(t)))))(sx)
        arrive[(el, "rotation")] = lambda t: q(("x", ELB - 12 * (1 - E(t))))
    g.animation("Arrive", tracks(arrive, T))

    # Scan — 3 s, uma vez: olhada de repouso (cabeça), sem deslocar o corpo
    T = grid(3.0, 0.1)

    def scan_yaw(t):
        keys = [(0.0, 0.0), (0.7, 20.0), (1.4, 20.0), (2.1, -12.0), (3.0, 0.0)]
        for (t0, v0), (t1, v1) in zip(keys, keys[1:]):
            if t0 <= t <= t1:
                return v0 + (v1 - v0) * smooth((t - t0) / (t1 - t0))
        return 0.0

    scan = {
        (head, "rotation"): lambda t: q(("y", scan_yaw(t)), ("x", 2.5 * sin(TAU * t / 3))),
        (torso, "rotation"): lambda t: q(("y", 0.35 * scan_yaw(t))),
        (ant, "rotation"): lambda t: q(("z", 5 * sin(TAU * t / 1.5))),
    }
    g.animation("Scan", tracks(scan, T))

    return g.write(path, root)


if __name__ == "__main__":
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / "public/models/node-bot.glb"
    out.parent.mkdir(parents=True, exist_ok=True)
    size = build(out)
    print(f"{out}  {size/1024:.1f} KB")
