import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, type MotionValue } from "motion/react";
import { buildPoints, emptyPoints, mountScene, pointsMaterial, pushPoint, seeded } from "./engine";
import { FOV, TAN, glowTexture, layers, nightPalette, ridgeColors, ridgeMesh, type RidgePalette } from "./landscape";

interface DawnProps {
    progress: MotionValue<number>   // 0 → 1 as the footer scrolls fully into view
    className?: string
}

// First light on the same ridges: warm rims, hazy mauve valleys
const dawnPalette: RidgePalette = {
    farRim: "#b98a86",
    nearRim: "#2a1c2c",
    farBody: "#6a5682",
    nearBody: "#0d0812",
};

// The footer's scene: the Blue Ridge from the hero, as the night ends. Scrolling into the footer
// warms the ridges from moonlight to dawn, raises the sun behind the farthest ridge and fades the stars.
export default function Dawn({ progress, className }: DawnProps) {
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
            const rand = seeded(17);

            // the last stars of the night
            const starMaterial = pointsMaterial(pixelRatio, 420);
            const stars = emptyPoints();
            const skyD = 420;
            const ice = new THREE.Color("#dfe8ff");
            for (let i = 0; i < (narrow ? 90 : 170); i++) {
                const x = (rand() - 0.5) * TAN * skyD * 6;
                const y = rand() * TAN * skyD * 1.1;
                pushPoint(stars, x, y, -skyD, ice, 1 + Math.pow(rand(), 4) * 2, rand(), 0);
            }
            scene.add(buildPoints(stars, starMaterial));

            // the sun, rising behind the farthest ridge
            const sunD = 380;
            const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(0.12), color: "#ffd9a8", transparent: true, depthWrite: false }));
            sun.scale.set(TAN * sunD * 0.9, TAN * sunD * 0.9, 1);
            sun.position.set(0, 0, -sunD);
            scene.add(sun);

            // the ridges carry both palettes; each frame blends between them
            const night = layers.map((_, i) => ridgeColors(nightPalette, i));
            const dawn = layers.map((_, i) => ridgeColors(dawnPalette, i));
            const meshes = layers.map((layer, i) => {
                const mesh = ridgeMesh(layer, i, nightPalette);
                scene.add(mesh);
                return mesh;
            });

            // warm haze lying in the valleys
            const mistTexture = glowTexture(0);
            const mists: { sprite: THREE.Sprite; speed: number; range: number }[] = [];
            layers.slice(1, 5).forEach((layer, i) => {
                const d = layer.d * 0.85;
                const halfH = TAN * d;
                const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                    map: mistTexture,
                    color: "#d9a7b4",
                    transparent: true,
                    opacity: 0.12,
                    depthWrite: false,
                }));
                sprite.position.set((rand() - 0.5) * halfH * 4, -(layer.top + 0.06) * halfH, -d);
                sprite.scale.set(halfH * 2.2, halfH * 0.3, 1);
                scene.add(sprite);
                mists.push({ sprite, speed: halfH * 0.01 * (i % 2 ? 1 : -1), range: halfH * 2.5 });
            });

            let lastP = -1;
            function light(p: number) {
                // ease so most of the colour change happens once the footer is well in view
                const e = p * p * (3 - 2 * p);
                meshes.forEach((mesh, i) => {
                    const attr = mesh.geometry.getAttribute("color") as THREE.BufferAttribute;
                    const out = attr.array as Float32Array;
                    for (let j = 0; j < out.length; j++) out[j] = night[i][j] + (dawn[i][j] - night[i][j]) * e;
                    attr.needsUpdate = true;
                });
                const farTop = -layers[0].top * TAN * sunD;
                sun.position.y = farTop - TAN * sunD * 0.12 + e * TAN * sunD * 0.3;
                (sun.material as THREE.SpriteMaterial).opacity = 0.35 + e * 0.65;
                starMaterial.uniforms.uOpacity.value = 1 - e * 0.85;
                for (const m of mists) (m.sprite.material as THREE.SpriteMaterial).opacity = 0.05 + e * 0.12;
            }

            const look = new THREE.Vector2();
            return {
                update(time, delta) {
                    starMaterial.uniforms.uTime.value = time;
                    // reduced motion shows the finished sunrise
                    const p = reduce ? 1 : Math.min(1, Math.max(0, progress.get()));
                    if (Math.abs(p - lastP) > 0.002) {
                        light(p);
                        lastP = p;
                    }
                    // the camera settles down onto the ridges as the footer arrives
                    look.x += (pointer.x * 3 - look.x) * Math.min(1, delta * 2);
                    look.y += (-pointer.y * 1.2 - look.y) * Math.min(1, delta * 2);
                    camera.position.set(look.x, look.y + (1 - p) * 6, 0);
                    for (const m of mists) {
                        m.sprite.position.x += m.speed * delta;
                        if (m.sprite.position.x > m.range) m.sprite.position.x = -m.range;
                        if (m.sprite.position.x < -m.range) m.sprite.position.x = m.range;
                    }
                },
            };
        });

        return () => {
            window.removeEventListener("pointermove", onMove);
            dispose();
        };
    }, [progress, reduce]);

    return <div ref={ref} className={className} aria-hidden />;
}
