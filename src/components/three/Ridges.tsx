import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion, type MotionValue } from "motion/react";
import { buildPoints, emptyPoints, mountScene, pointsMaterial, pushPoint, seeded } from "./engine";
import { FOV, TAN, glowTexture, layers, nightPalette, ridgeMesh } from "./landscape";

interface RidgesProps {
    progress: MotionValue<number>   // 0 → 1 as the hero scrolls away
    horizon: MotionValue<number>    // where the hero's buttons end, as a fraction of its height
    className?: string
}

// The Blue Ridge at night: layered ridgelines under a moon, with mist drifting between them.
// Scrolling glides the camera forward and up, so near ridges move more than far ones.
export default function Ridges({ progress, horizon, className }: RidgesProps) {
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

            // sky: a sprinkle of faint stars and the moon, far behind everything
            const starMaterial = pointsMaterial(pixelRatio, 420);
            const stars = emptyPoints();
            const skyD = 420;
            const ice = new THREE.Color("#dfe8ff");
            for (let i = 0; i < (narrow ? 140 : 260); i++) {
                const x = (rand() - 0.5) * TAN * skyD * 6;
                const y = rand() * TAN * skyD * 1.1 - TAN * skyD * 0.05;
                pushPoint(stars, x, y, -skyD, ice, 1 + Math.pow(rand(), 4) * 2.4, rand(), 0);
            }
            scene.add(buildPoints(stars, starMaterial));

            const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(0.16), color: "#eef2ff", transparent: true, depthWrite: false }));
            const moonD = 400;
            moon.scale.set(TAN * moonD * 0.42, TAN * moonD * 0.42, 1);
            scene.add(moon);

            // the ridges, each rising into place on load (see the entrance in update).
            // The hero shows only the four nearer ridges (the footer keeps all six). Each keeps its index so
            // its shape and colour match the footer's version of the same ridge.
            const FIRST = 2;
            const heroLayers = layers.slice(FIRST);
            const ridges = heroLayers.map((layer, j) => {
                const i = FIRST + j;
                const mesh = ridgeMesh(layer, i, nightPalette);
                scene.add(mesh);
                // drop it far enough that even its highest peak starts below the bottom edge (with room for the tilt)
                // the nearest, darkest ridge sits a little lower in the hero than in the footer
                const rest = i === layers.length - 1 ? -TAN * layer.d * 0.14 : 0;
                return { mesh, rest, drop: TAN * layer.d * (1.3 - layer.top + layer.amp), index: i };
            });

            // mist drifting just above each nearer ridge
            const mistTexture = glowTexture(0);
            const mists: { base: number; sprite: THREE.Sprite; speed: number; range: number }[] = [];
            layers.slice(FIRST, 5).forEach((layer, i) => {
                for (let m = 0; m < 2; m++) {
                    const d = layer.d * 0.85;
                    const halfH = TAN * d;
                    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                        map: mistTexture,
                        color: "#8fa0d6",
                        transparent: true,
                        opacity: 0.1 + rand() * 0.08,
                        depthWrite: false,
                    }));
                    sprite.position.set((rand() - 0.5) * halfH * 4, -(layer.top + 0.06) * halfH, -d);
                    sprite.scale.set(halfH * (1.6 + rand()), halfH * 0.32, 1);
                    scene.add(sprite);
                    mists.push({ base: sprite.material.opacity, sprite, speed: (0.6 + rand()) * halfH * 0.012 * (i % 2 ? 1 : -1), range: halfH * 2.5 });
                }
            });

            // a few fireflies in the nearest valley
            const flyMaterial = pointsMaterial(pixelRatio, 300);
            const flies = emptyPoints();
            const flyColor = new THREE.Color("#d8f1ff");
            const flyBase: number[] = [];
            for (let i = 0; i < (narrow ? 14 : 26); i++) {
                const d = 40 + rand() * 30;
                const halfH = TAN * d;
                const x = (rand() - 0.5) * halfH * 3.2;
                const y = -halfH * (0.55 + rand() * 0.3);
                pushPoint(flies, x, y, -d, flyColor, 0.35 + rand() * 0.35, rand(), 0);
                flyBase.push(x, y);
            }
            const fireflies = buildPoints(flies, flyMaterial);
            scene.add(fireflies);
            const flyPositions = fireflies.geometry.getAttribute("position") as THREE.BufferAttribute;

            let moonBaseY = 0;
            function placeMoon() {
                // high in the top-right corner, clear of the title on any screen shape
                const wide = camera.aspect > 1;
                moonBaseY = TAN * moonD * (wide ? 0.72 : 0.86);
                moon.position.set(TAN * moonD * camera.aspect * (wide ? 0.8 : 0.62), moonBaseY, -moonD);
            }

            const look = new THREE.Vector2();
            return {
                resize: placeMoon,
                update(time, delta) {
                    // Entrance: every ridge starts fully below the screen and they rise in three pairs (near,
                    // middle, far), so the range builds up from the bottom and nothing shows before its turn;
                    // moon, mist and fireflies ease in last.
                    // Reduced motion renders the settled landscape.
                    const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
                    const near = layers.length - 1;
                    for (const r of ridges) {
                        const group = Math.floor((near - r.index) / 2);   // 0 = nearest pair, 2 = farthest pair
                        const t = reduce ? 1 : ease((time - 0.1 - group * 0.22) / 1.0);
                        r.mesh.position.y = r.rest - r.drop * (1 - t);
                    }
                    const glow = reduce ? 1 : ease((time - 0.9) / 1.1);
                    (moon.material as THREE.SpriteMaterial).opacity = glow;
                    flyMaterial.uniforms.uOpacity.value = glow;
                    for (const m of mists) (m.sprite.material as THREE.SpriteMaterial).opacity = m.base * glow;

                    starMaterial.uniforms.uTime.value = time;
                    flyMaterial.uniforms.uTime.value = time;
                    const p = progress.get();

                    // glide forward and rise slightly as the hero scrolls away
                    look.x += (pointer.x * 3 - look.x) * Math.min(1, delta * 2);
                    look.y += (-pointer.y * 1.2 - look.y) * Math.min(1, delta * 2);
                    camera.position.set(look.x, look.y + p * 7, -p * 22);
                    // aim the camera so the highest peaks (about 61.5% down with no tilt) sit just below the buttons
                    const target = horizon.get() + 0.035;
                    // the topmost hero ridge peaks about (1 + top - amp) / 2 down the frame with no tilt
                    const peak = (1 + heroLayers[0].top - heroLayers[0].amp) / 2;
                    camera.rotation.x = Math.min(0.2, Math.max(-0.1, (target - peak) * 2 * TAN));
                    // the moon moves with the tilt so it stays in the same corner of the screen
                    moon.position.y = moonBaseY + camera.position.y + Math.tan(camera.rotation.x) * (moonD + camera.position.z);

                    for (const m of mists) {
                        m.sprite.position.x += m.speed * delta;
                        if (m.sprite.position.x > m.range) m.sprite.position.x = -m.range;
                        if (m.sprite.position.x < -m.range) m.sprite.position.x = m.range;
                    }
                    for (let i = 0; i < flyPositions.count; i++) {
                        flyPositions.setX(i, flyBase[i * 2] + Math.sin(time * 0.4 + i * 1.7) * 1.2);
                        flyPositions.setY(i, flyBase[i * 2 + 1] + Math.sin(time * 0.6 + i * 2.3) * 0.6);
                    }
                    flyPositions.needsUpdate = true;
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
