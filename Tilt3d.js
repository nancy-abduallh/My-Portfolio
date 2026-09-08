/* ══════════════════════════════════════════════════════════════
   tilt3d.js — subtle 3D pointer-tilt for project & skill cards.
   Only runs for fine-pointer (mouse/trackpad) devices and only
   when the user hasn't asked for reduced motion.
   ══════════════════════════════════════════════════════════════ */
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return;

    const MAX_TILT = 7;      // degrees
    const LIFT = -7;         // px, matches the existing hover translateY
    const SCALE = 1.015;

    function attachTilt(el) {
        let rect = null;
        let raf = null;

        function onEnter() {
            rect = el.getBoundingClientRect();
        }

        function onMove(e) {
            if (!rect) rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;   // 0..1
            const y = (e.clientY - rect.top) / rect.height;   // 0..1
            const rotateY = (x - 0.5) * 2 * MAX_TILT;
            const rotateX = (0.5 - y) * 2 * MAX_TILT;

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.transform =
                    `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${LIFT}px) scale(${SCALE})`;
            });
        }

        function onLeave() {
            rect = null;
            if (raf) cancelAnimationFrame(raf);
            el.style.transform = '';
        }

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    }

    function init() {
        document.querySelectorAll('.project-card, .skill-card').forEach(attachTilt);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();