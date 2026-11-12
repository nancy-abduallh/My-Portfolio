/* ══════════════════════════════════════════════════════════════
   Hero3d.js — Jeton-inspired 3D floating helical discs (Three.js)
   · Helical coral-red cylindrical discs with smooth bevel & lighting
   · Warm ambient + directional lighting mirroring Jeton app hero
   · Interactive mouse parallax lean toward cursor
   · Graceful degradation for reduced motion / small screens
   ══════════════════════════════════════════════════════════════ */
(function () {
    function tryInit() {
        const mount = document.getElementById('hero3d');
        if (!mount) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof THREE === 'undefined') {
            setTimeout(tryInit, 60);
            return;
        }
        init(mount);
    }

    function init(mount) {
        // Prevent duplicate canvas
        if (mount.querySelector('canvas')) return;

        let width = mount.clientWidth || window.innerWidth;
        let height = mount.clientHeight || window.innerHeight;
        if (!width || !height) {
            setTimeout(() => init(mount), 80);
            return;
        }

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        } catch (e) {
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
        camera.position.set(0, 0, 7.8);

        /* ── LIGHTING (Warm Jeton Sunset Palette) ─────────────────── */
        const ambientLight = new THREE.AmbientLight(0xfff5f0, 1.7);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
        keyLight.position.set(5.5, 7.5, 6);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xffb8a8, 1.25);
        rimLight.position.set(-6, -3, 3);
        scene.add(rimLight);

        const warmPoint = new THREE.PointLight(0xf73b20, 1.4, 25);
        warmPoint.position.set(0, 3, 4);
        scene.add(warmPoint);

        /* ── 3D HELICAL DISCS GROUP (Iconic Jeton Visual) ────────── */
        const discGroup = new THREE.Group();
        scene.add(discGroup);

        // Helical disc definition: [x, y, z, rx, ry, rz, radius, height, color]
        const discConfigs = [
            { x: 1.1,  y: 1.7,  z: -0.5, rx: 0.90, ry: 0.32, rz: -0.42, r: 1.75, h: 0.16, c: 0xf95a43 }, // top right
            { x: 0.4,  y: 0.65, z: -0.1, rx: 0.92, ry: 0.36, rz: -0.39, r: 1.92, h: 0.18, c: 0xf73b20 }, // upper mid
            { x: -0.35, y: -0.45, z: 0.25, rx: 0.94, ry: 0.40, rz: -0.36, r: 2.10, h: 0.20, c: 0xeb3017 }, // center
            { x: -1.05, y: -1.55, z: 0.65, rx: 0.96, ry: 0.44, rz: -0.33, r: 2.25, h: 0.22, c: 0xff6f59 }  // bottom left
        ];

        const discs = [];
        discConfigs.forEach(cfg => {
            const geo = new THREE.CylinderGeometry(cfg.r, cfg.r, cfg.h, 64);
            const mat = new THREE.MeshStandardMaterial({
                color: cfg.c,
                roughness: 0.32,
                metalness: 0.12
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(cfg.x, cfg.y, cfg.z);
            mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);
            mesh.userData = {
                baseX: cfg.x,
                baseY: cfg.y,
                baseZ: cfg.z,
                baseRZ: cfg.rz,
                speed: 0.7 + Math.random() * 0.4,
                phase: Math.random() * Math.PI * 2
            };
            discGroup.add(mesh);
            discs.push(mesh);
        });

        /* ── SUBTLE ORBITAL RINGS & FLOATING PARTICLES ───────────── */
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(3.1, 0.012, 16, 140),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 })
        );
        ring.rotation.x = Math.PI / 2.2;
        ring.rotation.y = 0.32;
        scene.add(ring);

        const particleCount = 120;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.6 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.65 })
        );
        scene.add(particles);

        /* ── MOUSE PARALLAX TARGETS ───────────────────────────────── */
        let targetRX = 0, targetRY = 0;
        let currentRX = 0, currentRY = 0;

        function handlePointerMove(e) {
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : width / 2);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : height / 2);
            targetRY = ((clientX / window.innerWidth) - 0.5) * 0.42;
            targetRX = ((clientY / window.innerHeight) - 0.5) * 0.28;
        }
        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('touchmove', handlePointerMove, { passive: true });

        let paused = document.hidden;
        const clock = new THREE.Clock();

        function onResize() {
            width = mount.clientWidth || window.innerWidth;
            height = mount.clientHeight || window.innerHeight;
            if (!width || !height) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

        function animate() {
            if (!paused) {
                const t = clock.getElapsedTime();

                // Gentle harmonic oscillation per disc
                discs.forEach((disc, idx) => {
                    const u = disc.userData;
                    disc.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.08;
                    disc.rotation.z = u.baseRZ + Math.sin(t * (u.speed * 0.8) + u.phase) * 0.05;
                    disc.rotation.x = 0.92 + Math.cos(t * 0.6 + idx) * 0.03;
                });

                ring.rotation.z = t * 0.06;
                particles.rotation.y = t * 0.03;

                // Smooth damped parallax follow
                currentRX += (targetRX - currentRX) * 0.06;
                currentRY += (targetRY - currentRY) * 0.06;
                discGroup.rotation.x = currentRX;
                discGroup.rotation.y = currentRY;

                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', () => { paused = document.hidden; });

        animate();
        requestAnimationFrame(() => mount.classList.add('ready'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();
