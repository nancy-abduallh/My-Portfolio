/* ══════════════════════════════════════════════════════════════
   Hero3d.js — interactive 3D hero orb (three.js)
   · Dual rotating icosahedra + orbiting particle shell
   · Tilted torus ring for extra depth
   · Mouse parallax — the whole scene leans toward your cursor
   · Graceful degradation: no WebGL / reduced motion / small
     screens → container stays hidden (CSS default).
   ══════════════════════════════════════════════════════════════ */
(function () {
    const mount = document.getElementById('hero3d');
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function init() {
        if (typeof THREE === 'undefined') return;

        let width = mount.clientWidth || 480;
        let height = mount.clientHeight || 480;
        if (!width || !height) return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) { return; }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 7);

        const gold = 0xc9a84c;
        const goldLight = 0xe8cf8a;

        /* Outer wireframe icosahedron */
        const outer = new THREE.Mesh(
            new THREE.IcosahedronGeometry(2.15, 1),
            new THREE.MeshBasicMaterial({ color: gold, wireframe: true, transparent: true, opacity: 0.55 })
        );
        scene.add(outer);

        /* Inner counter-rotating icosahedron */
        const inner = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.35, 1),
            new THREE.MeshBasicMaterial({ color: goldLight, wireframe: true, transparent: true, opacity: 0.25 })
        );
        scene.add(inner);

        /* Tilted torus ring — orbit path */
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.7, 0.015, 8, 120),
            new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.35 })
        );
        ring.rotation.x = Math.PI / 2.4;
        ring.rotation.y = 0.4;
        scene.add(ring);

        /* Orbiting particles */
        const particleCount = 80;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.7 + Math.random() * 0.8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({ color: gold, size: 0.045, transparent: true, opacity: 0.85 })
        );
        scene.add(particles);

        /* Mouse parallax targets */
        let targetRX = 0, targetRY = 0;
        document.addEventListener('mousemove', e => {
            targetRY = (e.clientX / innerWidth - 0.5) * 0.5;
            targetRX = (e.clientY / innerHeight - 0.5) * 0.35;
        }, { passive: true });

        let paused = document.hidden;
        const clock = new THREE.Clock();

        function onResize() {
            width = mount.clientWidth || width;
            height = mount.clientHeight || height;
            if (!width || !height) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

        function animate() {
            if (!paused) {
                const t = clock.getElapsedTime();
                outer.rotation.y = t * 0.18;
                outer.rotation.x = t * 0.09;
                inner.rotation.y = -t * 0.14;
                inner.rotation.x = t * 0.07;
                ring.rotation.z = t * 0.12;
                particles.rotation.y = t * 0.06;

                /* Smooth parallax lean toward cursor */
                scene.rotation.y += (targetRY - scene.rotation.y) * 0.05;
                scene.rotation.x += (targetRX - scene.rotation.x) * 0.05;

                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', () => { paused = document.hidden; });

        animate();
        requestAnimationFrame(() => mount.classList.add('ready'));
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 0); // three.js loads with defer — give it a tick
    } else {
        window.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
    }
})();