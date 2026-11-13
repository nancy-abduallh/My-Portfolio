/* ══════════════════════════════════════════════════════════════
   Hero3d.js — Jeton-style "coin stack" hero  (Three.js r128)

   What it renders
   · A stack of giant, thin, bevelled coral discs ("jetons") seen
     very close up, fanning open and closed in a slow loop
   · Soft real-time shadows between discs (the dark crescents)
   · Satin clear-coat material lit by a procedural studio
     environment map, so the thin rims catch pink highlights
   · Tone-on-tone coral fog so far discs melt into the background
   · Mouse parallax, scroll parallax, intro sweep-in
   · Pauses off-screen / hidden tab, honours reduced-motion,
     lower quality on phones, CSS fallback if WebGL is missing
   ══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var mount = document.getElementById('hero3d');
    if (!mount) return;

    var heroVideo = document.getElementById('heroVideo');
    if (heroVideo && !mount.classList.contains('force-3d')) {
        // Authentic studio-rendered video takes precedence.
        // Three.js stands by as fallback if video fails to load or play.
        heroVideo.addEventListener('error', function () {
            console.warn('[Hero3d] Hero video error, activating Three.js fallback');
            mount.style.display = 'block';
            start();
        });
        return;
    }

    var hero = document.getElementById('hero');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobile = window.matchMedia('(max-width: 760px)').matches;

    function start(tries) {
        if (typeof THREE === 'undefined') {
            if ((tries || 0) > 120) return fallback();
            return setTimeout(function () { start((tries || 0) + 1); }, 50);
        }
        try { init(); } catch (err) { console.warn('[Hero3d] falling back:', err); fallback(); }
    }

    function fallback() {
        mount.classList.add('is-fallback');
    }

    function init() {
        if (mount.querySelector('canvas')) return;

        /* ── palette sampled from the Jeton hero ─────────────── */
        var CORAL      = 0xd9281f;   // main disc colour
        var CORAL_DEEP = 0x9c1813;   // shadow side
        var FOG        = 0xe9473f;   // background tone for depth fade

        /* ── renderer ────────────────────────────────────────── */
        var renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = !isMobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(FOG, 15, 30);

        var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
        camera.position.set(0, 0, 15);

        /* ── procedural studio environment (for realistic rims) ─ */
        (function buildEnvironment() {
            var env = new THREE.Scene();
            var dome = new THREE.Mesh(
                new THREE.SphereGeometry(30, 32, 16),
                new THREE.MeshBasicMaterial({ color: 0x6e1c17, side: THREE.BackSide })
            );
            env.add(dome);

            function softbox(w, h, x, y, z, power, tint) {
                var m = new THREE.Mesh(
                    new THREE.PlaneGeometry(w, h),
                    new THREE.MeshBasicMaterial({
                        color: new THREE.Color(tint).multiplyScalar(power),
                        side: THREE.DoubleSide
                    })
                );
                m.position.set(x, y, z);
                m.lookAt(0, 0, 0);
                env.add(m);
            }
            softbox(18, 7, -10, 14, 8, 2.4, 0xfff1ee);   // key (top-left)
            softbox(5, 18, 15, 2, -3, 1.8, 0xffb4aa);    // rim (right)
            softbox(14, 5, 0, -13, 6, 0.9, 0xff8f84);    // bounce (below)
            softbox(8, 8, 2, 4, -16, 0.8, 0xffd0c8);     // back fill

            var pmrem = new THREE.PMREMGenerator(renderer);
            scene.environment = pmrem.fromScene(env, 0.04).texture;
            pmrem.dispose();
            env.traverse(function (o) {
                if (o.geometry) o.geometry.dispose();
                if (o.material) o.material.dispose();
            });
        })();

        /* ── lights ──────────────────────────────────────────── */
        scene.add(new THREE.HemisphereLight(0xff8f84, 0x5a0c09, 0.3));

        var key = new THREE.DirectionalLight(0xffe3de, 0.95);
        key.position.set(-7, 9, 8);
        key.castShadow = !isMobile;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.left = -11;
        key.shadow.camera.right = 11;
        key.shadow.camera.top = 11;
        key.shadow.camera.bottom = -11;
        key.shadow.camera.near = 1;
        key.shadow.camera.far = 40;
        key.shadow.radius = 5;
        key.shadow.bias = -0.0004;
        key.shadow.normalBias = 0.03;
        scene.add(key);

        var rim = new THREE.DirectionalLight(0xff8f84, 0.7);
        rim.position.set(9, 2, -5);
        scene.add(rim);

        /* ── disc geometry: flat face + rounded bevel (lathe) ── */
        function makeDiscGeometry(radius, thickness, bevel, segments) {
            var h = thickness / 2, pts = [], i, a;
            pts.push(new THREE.Vector2(0, h));
            pts.push(new THREE.Vector2(radius - bevel, h));
            for (i = 1; i <= 8; i++) {                       // top bevel
                a = (i / 8) * Math.PI / 2;
                pts.push(new THREE.Vector2(radius - bevel + Math.sin(a) * bevel, h - bevel + Math.cos(a) * bevel));
            }
            pts.push(new THREE.Vector2(radius, -h + bevel));
            for (i = 1; i <= 8; i++) {                       // bottom bevel
                a = (i / 8) * Math.PI / 2;
                pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, -h + bevel - Math.sin(a) * bevel));
            }
            pts.push(new THREE.Vector2(radius - bevel, -h));
            pts.push(new THREE.Vector2(0, -h));
            return new THREE.LatheGeometry(pts, segments);
        }

        var BASE_X = 0.52, BASE_Z = -0.62;
        var COUNT = isMobile ? 8 : 11;
        var RADIUS = 5.1;
        var geo = makeDiscGeometry(RADIUS, 0.16, 0.07, isMobile ? 72 : 128);

        var stack = new THREE.Group();
        scene.add(stack);

        var discs = [];
        for (var i = 0; i < COUNT; i++) {
            var k = i / (COUNT - 1);
            var mat = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(CORAL).lerp(new THREE.Color(CORAL_DEEP), (1 - k) * 0.4),
                roughness: 0.62,
                metalness: 0.0,
                clearcoat: 0.22,
                clearcoatRoughness: 0.5,
                envMapIntensity: 0.4
            });
            var m = new THREE.Mesh(geo, mat);
            m.castShadow = true;
            m.receiveShadow = true;
            m.userData = { i: i, k: k };
            stack.add(m);
            discs.push(m);
        }

        /* coins stack along local Y; the whole stack is tilted toward the camera */
        stack.rotation.set(BASE_X, 0.0, BASE_Z);
        stack.position.set(0.9, 0.2, -0.5);

        /* ── interaction state ───────────────────────────────── */
        var mouseX = 0, mouseY = 0, camX = 0, camY = 0;
        var scrollP = 0, scrollSmooth = 0;
        var visible = true, running = false, raf = 0;
        var clock = new THREE.Clock();
        var introStart = null;
        var INTRO = 2.4;

        function onPointer(e) {
            var p = e.touches && e.touches[0] ? e.touches[0] : e;
            mouseX = (p.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (p.clientY / window.innerHeight - 0.5) * 2;
        }
        function onScroll() {
            var h = hero ? hero.offsetHeight : window.innerHeight;
            scrollP = Math.min(1, Math.max(0, window.scrollY / h));
        }
        window.addEventListener('mousemove', onPointer, { passive: true });
        window.addEventListener('touchmove', onPointer, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });

        /* ── sizing ──────────────────────────────────────────── */
        function resize() {
            var w = mount.clientWidth || window.innerWidth;
            var h = mount.clientHeight || window.innerHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.position.z = w / h < 0.8 ? 19 : 15;   // pull back on portrait phones
            camera.updateProjectionMatrix();
            if (!running) renderFrame(window.__heroT || 0);
        }

        /* ── per-frame pose ──────────────────────────────────── */
        function ease(x) { return 1 - Math.pow(1 - x, 3); }

        function pose(t, intro) {
            var spread = 1 - intro;                       // 1 → fully fanned during intro
            var fan = 0.04 + (0.5 + 0.5 * Math.sin(t * 0.65)) * 0.08 + spread * 0.22;
            for (var n = 0; n < discs.length; n++) {
                var d = discs[n], u = d.userData;
                var centre = u.i - (COUNT - 1) / 2;

                /* gap between coins breathes in a fluid, energetic loop */
                var breathe = 0.5 + 0.5 * Math.sin(t * 0.7 + u.i * 0.28);
                var gap = 0.62 + breathe * 0.34 + spread * 0.9;

                /* complete circular orbit path for each disc */
                var orbitAngle = t * 0.6 + u.i * 0.42;
                var orbitR = 0.22;
                d.position.set(
                    Math.sin(orbitAngle) * orbitR,
                    centre * gap,
                    Math.cos(orbitAngle) * orbitR
                );

                /* faster, complete 360-degree rotation loop on disc's own axis */
                var tiltAngle = t * 0.55 + u.i * 0.35;
                d.rotation.set(
                    centre * fan + Math.sin(tiltAngle) * 0.07,
                    t * 0.75 + u.i * 0.25,
                    centre * fan * 0.6 + Math.cos(tiltAngle) * 0.07
                );
            }
        }

        function renderFrame(t) {
            var intro = reduceMotion ? 1 : (introStart === null ? 0 : ease(Math.min(1, (t - introStart) / INTRO)));
            pose(t, intro);

            /* damped parallax */
            camX += (mouseX * 1.1 - camX) * 0.045;
            camY += (-mouseY * 0.7 - camY) * 0.045;
            scrollSmooth += (scrollP - scrollSmooth) * 0.08;

            camera.position.x = camX;
            camera.position.y = camY;
            camera.lookAt(0, 0, 0);

            /* complete 360-degree continuous circle rotation loop (faster & seamless) */
            stack.rotation.y = (t * 0.5) + scrollSmooth * 0.8 - mouseX * 0.06;
            stack.rotation.x = BASE_X + Math.sin(t * 0.38) * 0.07 + scrollSmooth * 0.35 + mouseY * 0.03;
            stack.rotation.z = BASE_Z + Math.cos(t * 0.38) * 0.06;
            stack.position.y = 0.2 + scrollSmooth * 2.4;

            renderer.render(scene, camera);
        }

        function loop() {
            if (!running) return;
            var t = clock.getElapsedTime();
            window.__heroT = t;
            if (introStart === null) introStart = t;
            renderFrame(t);
            raf = requestAnimationFrame(loop);
        }
        function play() {
            if (running || reduceMotion || !visible || document.hidden) return;
            running = true; clock.start(); raf = requestAnimationFrame(loop);
        }
        function pause() { running = false; cancelAnimationFrame(raf); }

        window.addEventListener('resize', resize);
        resize();

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (en) {
                visible = en[0].isIntersecting;
                visible ? play() : pause();
            }, { threshold: 0.02 }).observe(mount);
        }
        document.addEventListener('visibilitychange', function () { document.hidden ? pause() : play(); });

        renderer.domElement.addEventListener('webglcontextlost', function (e) { e.preventDefault(); pause(); fallback(); });

        /* first paint */
        if (reduceMotion) { renderFrame(3.2); } else { play(); }
        requestAnimationFrame(function () { mount.classList.add('ready'); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { start(0); });
    } else {
        start(0);
    }
})();
