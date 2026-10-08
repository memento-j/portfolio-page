import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, type MotionValue } from "motion/react";
import { buildPoints, emptyPoints, mountScene, pointsMaterial, pushPoint, seeded } from "./engine";
import { FOV, TAN, glowTexture } from "./landscape";

interface CloudsProps {
    progress: MotionValue<number>   // 0 → 1 as the hero scrolls away
    horizon: MotionValue<number>    // where the hero's buttons end, as a fraction of its height
    className?: string
}

// Far to near. `below` is how far under the buttons the layer's band sits (fraction of the frame);
// nearer layers are darker, larger, denser and drift faster. `rise` is how far the layer travels up the
// screen over the hero's scroll (fraction of the frame): far layers lag behind the page, near ones
// sweep past it, which is what makes the depth read.
const cloudLayers = [
    { d: 320, below: 0.15, color: "#7e8ac8", opacity: 0.22, count: 9, size: 1.1, drift: 0.006, rise: -0.18 },
    { d: 210, below: 0.22, color: "#6672b0", opacity: 0.3, count: 8, size: 1.25, drift: 0.01, rise: -0.04 },
    { d: 130, below: 0.31, color: "#4b558c", opacity: 0.42, count: 7, size: 1.4, drift: 0.016, rise: 0.16 },
    { d: 80, below: 0.42, color: "#262b50", opacity: 0.75, count: 6, size: 1.6, drift: 0.024, rise: 0.42 },
];

// One soft cloud drawn on a canvas: overlapping puffs, a rounded top and a flatter base,
// lit from above so the top reads as moonlit and the underside falls into shadow.
function cloudTexture(seed: number) {
    const w = 512;
    const h = 224;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const rand = seeded(seed);
    for (let i = 0; i < 46; i++) {
        const t = rand();
        const x = w * (0.12 + t * 0.76);
        const arch = Math.sin(t * Math.PI);                      // taller in the middle
        const y = h * (0.62 - arch * (0.18 + rand() * 0.16));
        const r = h * (0.12 + rand() * 0.16) * (0.7 + arch * 0.5);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255,255,255,0.55)");
        g.addColorStop(0.55, "rgba(255,255,255,0.28)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    // moonlit top, shadowed underside
    ctx.globalCompositeOperation = "source-atop";
    const shade = ctx.createLinearGradient(0, 0, 0, h);
    shade.addColorStop(0, "rgba(255,255,255,1)");
    shade.addColorStop(0.55, "rgba(200,205,225,1)");
    shade.addColorStop(1, "rgba(90,95,130,1)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, w, h);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

// The hero's night sky: stars, the moon, and layers of moonlit cloud drifting below the buttons.
// Scrolling glides the camera forward and up, so near clouds move more than far ones; the mouse sways it.
export default function Clouds({ progress, horizon, className }: CloudsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion() ?? false;

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const pointer = { x: 0, y: 0 };
        function onMove(e: PointerEvent) {
            if (e.pointerType !== "mouse") return;
            pointer.x = e.clientX / window.innerWidth - 0.5;
            pointer.y = e.clientY / window.innerHeight - 0.5;
        }
        if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

        const dispose = mountScene(container, FOV, reduce, ({ scene, camera, pixelRatio, narrow }) => {
            const rand = seeded(5);

            // stars, far behind everything
            const starMaterial = pointsMaterial(pixelRatio, 420);
            const stars = emptyPoints();
            const skyD = 420;
            const ice = new THREE.Color("#dfe8ff");
            for (let i = 0; i < (narrow ? 320 : 620); i++) {
                const x = (rand() - 0.5) * TAN * skyD * 6;
                const y = (rand() * 2.2 - 1.1) * TAN * skyD;
                pushPoint(stars, x, y, -skyD, ice, 1.5 + Math.pow(rand(), 3) * 3.6, rand(), 0);
            }
            scene.add(buildPoints(stars, starMaterial));

            const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(0.16), color: "#eef2ff", transparent: true, depthWrite: false }));
            const moonD = 400;
            moon.scale.set(TAN * moonD * 0.42, TAN * moonD * 0.42, 1);
            scene.add(moon);

            // a few cloud shapes, shared by every layer
            const textures = [3, 11, 19, 27].map(cloudTexture);

            const clouds = cloudLayers.flatMap((layer, li) => {
                const halfH = TAN * layer.d;
                const span = halfH * 2.2 * 1.8;   // wider than the widest screen, so drifting clouds wrap off-screen
                return Array.from({ length: narrow ? Math.ceil(layer.count * 0.7) : layer.count }, (_, k) => {
                    const material = new THREE.SpriteMaterial({
                        map: textures[(k + li) % textures.length],
                        color: layer.color,
                        transparent: true,
                        opacity: 0,
                        depthWrite: false,
                    });
                    const sprite = new THREE.Sprite(material);
                    const width = halfH * layer.size * (0.75 + rand() * 0.6);
                    sprite.scale.set(width, width * 0.44, 1);
                    sprite.position.set(-span / 2 + (k + rand() * 0.8) * (span / layer.count), 0, -layer.d - rand() * 6);
                    scene.add(sprite);
                    return { sprite, layer, li, halfH, span, jitter: (rand() - 0.5) * 0.08, base: layer.opacity * (0.8 + rand() * 0.3) };
                });
            });

            let moonBaseY = 0;
            function placeMoon() {
                // high in the top-right corner, clear of the title on any screen shape
                const wide = camera.aspect > 1;
                moonBaseY = TAN * moonD * (wide ? 0.72 : 0.86);
                moon.position.set(TAN * moonD * camera.aspect * (wide ? 0.8 : 0.62), moonBaseY, -moonD);
            }

            const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
            const look = new THREE.Vector2();
            return {
                resize: placeMoon,
                update(time, delta) {
                    starMaterial.uniforms.uTime.value = time;
                    const p = progress.get();
                    const h = horizon.get();

                    for (const c of clouds) {
                        // Entrance: far layers settle first, each nearer layer a little later, rising and fading in.
                        // Reduced motion renders the settled sky.
                        const t = reduce ? 1 : ease((time - 0.15 - c.li * 0.18) / 1.4);
                        // the band sits just below the buttons, each nearer layer a little lower
                        const frac = Math.min(0.98, h + c.layer.below + c.jitter);
                        c.sprite.position.y = (1 - 2 * frac + 2 * c.layer.rise * p) * c.halfH - (1 - t) * c.halfH * 0.18;
                        (c.sprite.material as THREE.SpriteMaterial).opacity = c.base * t;
                        if (!reduce) {
                            c.sprite.position.x += c.layer.drift * c.halfH * delta;
                            if (c.sprite.position.x > c.span / 2) c.sprite.position.x -= c.span;
                        }
                    }
                    (moon.material as THREE.SpriteMaterial).opacity = reduce ? 1 : ease((time - 0.6) / 1.2);

                    // glide forward through the clouds as the hero scrolls away, so the near ones swell past;
                    // the mouse sways the camera, which shifts near clouds much more than far ones
                    look.x += (pointer.x * 7 - look.x) * Math.min(1, delta * 2);
                    look.y += (-pointer.y * 2.5 - look.y) * Math.min(1, delta * 2);
                    camera.position.set(look.x, look.y + p * 4, -p * 34);
                    moon.position.y = moonBaseY + camera.position.y;
                },
            };
        });

        return () => {
            window.removeEventListener("pointermove", onMove);
            dispose();
        };
    }, [progress, horizon, reduce]);

    return <div ref={ref} className={className} aria-hidden />;
}
