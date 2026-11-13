/* ══════════════════════════════════════════════════════════════
   Hero3d.js — Jeton-style "coin stack" hero  (Three.js r128)

   · A stack of giant, thin, bevelled coral discs ("jetons") that
     slowly fans open and closed in a loop
   · Soft real-time shadows between discs (the dark crescents)
   · Satin clear-coat material lit by a procedural studio
     environment, so the thin rims catch pink highlights
   · Tone-on-tone coral fog, mouse + scroll parallax, intro sweep
   · Pauses off-screen / hidden tab, honours reduced-motion,
     lighter on phones, CSS fallback if WebGL is unavailable
   ══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var mount = document.getElementById('hero3d');
    if (!mount) return;

    var hero = document.getElementById('hero');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobile = window.matchMedia('(max-width: 760px)').matches;

    function fallback() { mount.classList.add('is-fallback'); }

    function start(tries) {
        if (typeof THREE === 'undefined') {
            if ((tries || 0) > 120) return fallback();
            return setTimeout(function () { start((tries || 0) + 1); }, 50);
        }
        try { init(); } catch (err) { console.warn('[Hero3d] falling back:', err); fallback(); }
    }

    function init() {
        if (mount.querySelector('canvas')) return;

        /* palette sampled from the Jeton hero video */
        var CORAL      = 0xdc2f26;
        var CORAL_DEEP = 0xb8261e;
        var FOG        = 0xe9473f;

        /* ── renderer ─────────────────────────────────────────── */
        var renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = !isMobile;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        var scene = new THREE.Scene();
        scene.fog = new THREE.Fog(FOG, 16, 32);

        var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
        camera.position.set(0, 0, 15);

        /* ── procedural studio environment (for glossy rims) ──── */
        (function () {
            var env = new THREE.Scene();
            env.add(new THREE.Mesh(
                new THREE.SphereGeometry(30, 32, 16),
                new THREE.MeshBasicMaterial({ color: 0xa8332c, side: THREE.BackSide })
            ));
            function softbox(w, h, x, y, z, power, tint) {
                var m = new THREE.Mesh(
                    new THREE.PlaneGeometry(w, h),
                    new THREE.MeshBasicMaterial({ color: new THREE.Color(tint).multiplyScalar(power), side: THREE.DoubleSide })
                );
                m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
            }
            softbox(18, 7, -10, 14, 8, 3.0, 0xfff1ee);   // key  (top-left)
            softbox(5, 18, 15, 2, -3, 2.2, 0xffb4aa);    // rim  (right)
            softbox(14, 5, 0, -13, 6, 1.2, 0xff8f84);    // bounce (below)
            softbox(8, 8, 2, 4, -16, 1.0, 0xffd0c8);     // back fill
            var pmrem = new THREE.PMREMGenerator(renderer);
            scene.environment = pmrem.fromScene(env, 0.04).texture;
            pmrem.dispose();
            env.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        })();

        /* ── lights ───────────────────────────────────────────── */
        scene.add(new THREE.HemisphereLight(0xffcfc8, 0xa8211a, 0.55));

        var key = new THREE.DirectionalLight(0xfff1ee, 0.95);
        key.position.set(-7, 9, 8);
        key.castShadow = !isMobile;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.left = -11; key.shadow.camera.right = 11;
        key.shadow.camera.top = 11;   key.shadow.camera.bottom = -11;
        key.shadow.camera.near = 1;   key.shadow.camera.far = 40;
        key.shadow.radius = 8;
        key.shadow.bias = -0.0004;
        key.shadow.normalBias = 0.03;
        scene.add(key);

        var rim = new THREE.DirectionalLight(0xff9d92, 0.8);
        rim.position.set(9, 2, -5);
        scene.add(rim);

        /* ── disc geometry: flat face + rounded bevel (lathe) ─── */
        function makeDiscGeometry(radius, thickness, bevel, segments) {
            var h = thickness / 2, pts = [], i, a;
            pts.push(new THREE.Vector2(0, h));
            pts.push(new THREE.Vector2(radius - bevel, h));
            for (i = 1; i <= 8; i++) {
                a = (i / 8) * Math.PI / 2;
                pts.push(new THREE.Vector2(radius - bevel + Math.sin(a) * bevel, h - bevel + Math.cos(a) * bevel));
            }
            pts.push(new THREE.Vector2(radius, -h + bevel));
            for (i = 1; i <= 8; i++) {
                a = (i / 8) * Math.PI / 2;
                pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, -h + bevel - Math.sin(a) * bevel));
            }
            pts.push(new THREE.Vector2(radius - bevel, -h));
            pts.push(new THREE.Vector2(0, -h));
            return new THREE.LatheGeometry(pts, segments);
        }

        var COUNT  = isMobile ? 8 : 11;
        var RADIUS = 3.6;
        var geo = makeDiscGeometry(RADIUS, 0.12, 0.055, isMobile ? 72 : 128);
        geo.rotateX(Math.PI / 2);                    // disc faces point along +Z

        var stack = new THREE.Group();
        scene.add(stack);

        var discs = [];
        for (var i = 0; i < COUNT; i++) {
            var k = i / (COUNT - 1);
            var mat = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(CORAL).lerp(new THREE.Color(CORAL_DEEP), (1 - k) * 0.35),
                roughness: 0.5,
                metalness: 0.0,
                clearcoat: 0.35,
                clearcoatRoughness: 0.4,
                envMapIntensity: 0.62
            });
            var m = new THREE.Mesh(geo, mat);
            m.castShadow = true;
            m.receiveShadow = true;
            m.userData = { i: i };
            stack.add(m);
            discs.push(m);
        }

        /* orientation: discs are seen at a steep angle, like pages fanned open */
        var BASE = { x: 0.25, y: -1.18, z: 0.55 };
        stack.rotation.set(BASE.x, BASE.y, BASE.z);
        stack.position.set(1.0, 0.3, 0);

        /* ── interaction state ────────────────────────────────── */
        var mouseX = 0, mouseY = 0, camX = 0, camY = 0;
        var scrollP = 0, scrollSmooth = 0;
        var visible = true, running = false, raf = 0;
        var clock = new THREE.Clock();
        var introStart = null, INTRO = 2.4;

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

        function ease(x) { return 1 - Math.pow(1 - x, 3); }

        function pose(t, intro) {
            var spread = 1 - intro;
            var breathe = 0.5 + 0.5 * Math.sin(t * 0.34);      // slow open / close loop
            var fan = 0.03 + breathe * 0.05 + spread * 0.25;
            var gap = 0.95 + breathe * 0.45 + spread * 0.8;
            for (var n = 0; n < discs.length; n++) {
                var d = discs[n], idx = d.userData.i, c = idx - (COUNT - 1) / 2;
                d.position.set(
                    Math.sin(t * 0.21 + idx * 0.5) * 0.12,
                    Math.cos(t * 0.17 + idx * 0.4) * 0.12,
                    c * gap
                );
                d.rotation.set(
                    Math.sin(t * 0.26 + idx * 0.33) * 0.05,
                    c * fan,
                    Math.cos(t * 0.22 + idx * 0.29) * 0.04
                );
            }
        }

        function renderFrame(t) {
            var intro = reduceMotion ? 1 : (introStart === null ? 0 : ease(Math.min(1, (t - introStart) / INTRO)));
            pose(t, intro);

            camX += (mouseX * 1.1 - camX) * 0.045;
            camY += (-mouseY * 0.7 - camY) * 0.045;
            scrollSmooth += (scrollP - scrollSmooth) * 0.08;

            camera.position.x = camX;
            camera.position.y = camY;
            camera.lookAt(0, 0, 0);

            stack.rotation.x = BASE.x + Math.sin(t * 0.13) * 0.06 + scrollSmooth * 0.35;
            stack.rotation.y = BASE.y + Math.cos(t * 0.11) * 0.08 + scrollSmooth * 0.6 - mouseX * 0.05;
            stack.rotation.z = BASE.z + Math.sin(t * 0.09) * 0.05;
            stack.position.y = 0.3 + scrollSmooth * 2.4;

            renderer.render(scene, camera);
        }

        function resize() {
            var w = mount.clientWidth || window.innerWidth;
            var h = mount.clientHeight || window.innerHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.position.z = w / h < 0.8 ? 19 : 15;          // pull back on portrait phones
            camera.updateProjectionMatrix();
            if (!running) renderFrame(window.__heroT || 3.2);
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

        if (reduceMotion) { renderFrame(3.2); } else { play(); }
        requestAnimationFrame(function () { mount.classList.add('ready'); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { start(0); });
    } else {
        start(0);
    }
})();
