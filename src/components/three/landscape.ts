import * as THREE from "three";

// Shared pieces of the Blue Ridge scenes (the hero's night and the footer's dawn)

export const FOV = 35;
export const TAN = Math.tan(((FOV / 2) * Math.PI) / 180);   // half-height of the view at distance 1

// Smooth 1D noise, layered, for rolling Blue Ridge silhouettes
function noise(x: number, seed: number) {
    const hash = (n: number) => {
        const s = Math.sin((n + seed * 57.3) * 127.1) * 43758.5453;
        return s - Math.floor(s);
    };
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return hash(i) * (1 - u) + hash(i + 1) * u;
}
function fbm(x: number, seed: number) {
    let v = 0;
    let amp = 0.5;
    let freq = 1;
    for (let o = 0; o < 4; o++) {
        v += amp * noise(x * freq, seed + o * 13);
        freq *= 2.1;
        amp *= 0.5;
    }
    return v / 0.94;   // roughly 0..1
}

// Far to near: distance, how far below the horizon line the ridge sits, peak height, roll frequency
export interface RidgeLayer {
    d: number
    top: number
    amp: number
    freq: number
}

export const layers: RidgeLayer[] = [
    { d: 300, top: 0.33, amp: 0.1, freq: 1.6 },
    { d: 210, top: 0.4, amp: 0.12, freq: 1.9 },
    { d: 150, top: 0.49, amp: 0.13, freq: 2.2 },
    { d: 105, top: 0.59, amp: 0.15, freq: 2.4 },
    { d: 72, top: 0.7, amp: 0.17, freq: 2.6 },
    { d: 48, top: 0.82, amp: 0.2, freq: 2.8 },
];

// The light on the ridges: far ridges take the rim/body colours, near ones fade toward the near colours
export interface RidgePalette {
    farRim: string
    nearRim: string
    farBody: string
    nearBody: string
}

export const nightPalette: RidgePalette = {
    farRim: "#5d6aa3",
    nearRim: "#141831",
    farBody: "#252c58",
    nearBody: "#040309",
};

// Points along each ridge; enough to keep the silhouette detailed across the full width
const RIDGE_SAMPLES = 640;

// Vertex colours for one ridge (three vertices per column: lit edge, just below it, ground)
export function ridgeColors(palette: RidgePalette, index: number, samples = RIDGE_SAMPLES) {
    const t = index / (layers.length - 1);
    const rim = new THREE.Color(palette.farRim).lerp(new THREE.Color(palette.nearRim), t);
    const body = new THREE.Color(palette.farBody).lerp(new THREE.Color(palette.nearBody), t);
    const deep = body.clone().multiplyScalar(0.55);
    const colors = new Float32Array((samples + 1) * 9);
    for (let k = 0; k <= samples; k++) {
        colors.set([rim.r, rim.g, rim.b, body.r, body.g, body.b, deep.r, deep.g, deep.b], k * 9);
    }
    return colors;
}

export function ridgeMesh(layer: RidgeLayer, index: number, palette: RidgePalette, samples = RIDGE_SAMPLES) {
    const { d, top, amp, freq } = layer;
    const halfH = TAN * d;
    const halfW = halfH * 8;   // the short, wide footer shows ~3 view-heights each side; extra covers ultrawide and the mouse sway
    const bottom = -halfH * 1.6;
    const band = halfH * 0.022; // height of the lit rim gradient

    const positions: number[] = [];
    const indices: number[] = [];
    for (let k = 0; k <= samples; k++) {
        const x = -halfW + (k / samples) * halfW * 2;
        const n = fbm((x / halfH) * freq + index * 7.1, index + 3);
        const y = -top * halfH + (n - 0.5) * 2 * amp * halfH;
        positions.push(x, y, -d, x, y - band, -d, x, bottom, -d);
        if (k > 0) {
            const a = (k - 1) * 3;
            const b = k * 3;
            indices.push(a, b, a + 1, b, b + 1, a + 1);         // rim band
            indices.push(a + 1, b + 1, a + 2, b + 1, b + 2, a + 2); // body
        }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(ridgeColors(palette, index, samples), 3));
    geometry.setIndex(indices);
    // double-sided: the strip is wound clockwise as seen from the camera
    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }));
}

// A soft round glow drawn once, used for the moon, the sun and the mist
export function glowTexture(core: number) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    if (core > 0) {
        g.addColorStop(core, "rgba(255,255,255,1)");
        g.addColorStop(core + 0.02, "rgba(255,255,255,0.32)");
        g.addColorStop(core + 0.25, "rgba(255,255,255,0.08)");
    } else {
        g.addColorStop(0.4, "rgba(255,255,255,0.45)");
    }
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}
