/* ══════════════════════════════════════════════════════════════
   hero3d.js — lightweight animated 3D orb for the hero section
   Built with three.js. Degrades gracefully: if three.js hasn't
   loaded, WebGL is unavailable, or the user prefers reduced
   motion, the container is simply left hidden (CSS default).
   ══════════════════════════════════════════════════════════════ */
(function () {
    const mount = document.getElementById('hero3d');
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    function init() {
        if (typeof THREE === 'undefined') return;

        let width = mount.clientWidth || 480;
        let height = mount.clientHeight || 480;
        if (!width || !height) return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) {
            return; // WebGL not available — fail silently, static circle still shows
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 7);

        const gold = 0xc9a84c;
        const goldLight = 0xe8cf8a;

        // Outer wireframe icosahedron — the "structure"
        const outerGeo = new THREE.IcosahedronGeometry(2.15, 1);
        const outerMat = new THREE.MeshBasicMaterial({ color: gold, wireframe: true, transparent: true, opacity: 0.55 });
        const outer = new THREE.Mesh(outerGeo, outerMat);
        scene.add(outer);

        // Inner solid icosahedron — subtle glassy core
        const innerGeo = new THREE.IcosahedronGeometry(1.35, 1);
        const innerMat = new THREE.MeshBasicMaterial({ color: goldLight, wireframe: true, transparent: true, opacity: 0.25 });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        scene.add(inner);

        // Orbiting particles representing the tech stack
        const particleCount = 60;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.7 + Math.random() * 0.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({ color: gold, size: 0.045, transparent: true, opacity: 0.85 });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        let frameId = null;
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
            if (paused) { frameId = requestAnimationFrame(animate); return; }
            const t = clock.getElapsedTime();
            outer.rotation.y = t * 0.18;
            outer.rotation.x = t * 0.09;
            inner.rotation.y = -t * 0.14;
            inner.rotation.x = t * 0.07;
            particles.rotation.y = t * 0.06;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', () => { paused = document.hidden; });

        animate();
        requestAnimationFrame(() => mount.classList.add('ready'));
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // three.js is loaded with `defer`, so give it a tick to attach to window
        setTimeout(init, 0);
    } else {
        window.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
    }
})();