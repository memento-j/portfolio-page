import * as THREE from "three";

// One soft, glowing round point, used for the stars and fireflies.
// `shade` = 1 lights the point by its direction from the centre (a lit side and a dark side),
// `twinkle` sets how fast each point's brightness breathes.
const vertexShader = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  attribute float twinkle;
  attribute float shade;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  uniform vec3 uLight;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = size * uPixelRatio * uSizeScale / -mv.z;

    float breathe = 0.78 + 0.22 * sin(uTime * (0.5 + twinkle * 1.6) + twinkle * 37.0);
    vec3 worldNormal = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    float lit = mix(1.0, 0.08 + 0.92 * smoothstep(-0.25, 0.7, dot(worldNormal, uLight)), shade);

    vColor = color * lit;
    vAlpha = breathe * mix(1.0, 0.25 + 0.75 * lit, shade);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha * uOpacity);
  }
`;

export interface PointData {
    positions: number[]
    colors: number[]
    sizes: number[]
    twinkles: number[]
    shades: number[]
}

export function emptyPoints(): PointData {
    return { positions: [], colors: [], sizes: [], twinkles: [], shades: [] };
}

export function pushPoint(d: PointData, x: number, y: number, z: number, color: THREE.Color, size: number, twinkle: number, shade: number) {
    d.positions.push(x, y, z);
    d.colors.push(color.r, color.g, color.b);
    d.sizes.push(size);
    d.twinkles.push(twinkle);
    d.shades.push(shade);
}

export function buildPoints(d: PointData, material: THREE.ShaderMaterial) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(d.positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(d.colors, 3));
    g.setAttribute("size", new THREE.Float32BufferAttribute(d.sizes, 1));
    g.setAttribute("twinkle", new THREE.Float32BufferAttribute(d.twinkles, 1));
    g.setAttribute("shade", new THREE.Float32BufferAttribute(d.shades, 1));
    return new THREE.Points(g, material);
}

export function pointsMaterial(pixelRatio: number, sizeScale = 300) {
    return new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: pixelRatio },
            uSizeScale: { value: sizeScale },
            uOpacity: { value: 1 },
            uLight: { value: new THREE.Vector3(-0.6, 0.45, 0.65).normalize() },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
}

// Deterministic random, so the scene looks the same on every visit
export function seeded(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return s / 2147483647;
    };
}

export interface SceneContext {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    pixelRatio: number
    narrow: boolean
}

export interface SceneController {
    update: (time: number, delta: number) => void
    resize?: (width: number, height: number) => void
}

// Mounts a three.js scene into a container: sizing, an offscreen pause, a single still frame for
// reduced motion, and full cleanup. Returns a disposer. If WebGL isn't available, nothing mounts
// and the container's own background shows instead.
export function mountScene(
    container: HTMLElement,
    fov: number,
    reduce: boolean,
    build: (ctx: SceneContext) => SceneController,
) {
    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
        return () => {};
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 4000);
    const controller = build({ scene, camera, pixelRatio, narrow: container.clientWidth < 720 });

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = false;

    function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        controller.resize?.(w, h);
        if (reduce) {
            controller.update(0, 0);
            renderer.render(scene, camera);
        }
    }

    function loop() {
        raf = requestAnimationFrame(loop);
        const delta = Math.min(clock.getDelta(), 0.05);
        controller.update(clock.elapsedTime, delta);
        renderer.render(scene, camera);
    }

    function setVisible(next: boolean) {
        if (reduce || next === visible) return;
        visible = next;
        if (visible) {
            clock.getDelta();
            raf = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(raf);
        }
    }

    const resizer = new ResizeObserver(resize);
    resizer.observe(container);
    const watcher = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    watcher.observe(container);
    resize();

    return () => {
        cancelAnimationFrame(raf);
        resizer.disconnect();
        watcher.disconnect();
        scene.traverse((obj) => {
            if (obj instanceof THREE.Points || obj instanceof THREE.Mesh || obj instanceof THREE.Sprite) {
                obj.geometry.dispose();
                const material = obj.material as THREE.Material & { map?: THREE.Texture | null };
                material.map?.dispose();
                material.dispose();
            }
        });
        renderer.dispose();
        renderer.domElement.remove();
    };
}
