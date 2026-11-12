/* ══════════════════════════════════════════════════════════════
   Tilt3d.js — Enhanced 3D Card Tilt with Dynamic Moving Glare
   · Supports Project, Skill, Experience, Education, Gallery, & Contact cards
   · 3D perspective with layered child depth (translateZ)
   · Fine-pointer devices only; respects prefers-reduced-motion
   ══════════════════════════════════════════════════════════════ */
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return;

    const MAX_TILT = 8;    // degrees of tilt
    const LIFT = -8;       // vertical lift in px
    const SCALE = 1.018;   // subtle zoom on hover

    function attachTilt(el) {
        if (el.dataset.tiltAttached) return;
        el.dataset.tiltAttached = 'true';

        let rect = null;
        let raf = null;

        el.classList.add('tilt-host');

        // Append dynamic glare shine element if not present
        let glare = el.querySelector('.tilt-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            el.appendChild(glare);
        }

        function onEnter() {
            rect = el.getBoundingClientRect();
            el.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
        }

        function onMove(e) {
            if (!rect) rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const clampedX = Math.max(0, Math.min(1, x));
            const clampedY = Math.max(0, Math.min(1, y));

            const rotateY = (clampedX - 0.5) * 2 * MAX_TILT;
            const rotateX = (0.5 - clampedY) * 2 * MAX_TILT;

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.transform =
                    `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${LIFT}px) scale(${SCALE})`;
                glare.style.setProperty('--gx', (clampedX * 100).toFixed(1) + '%');
                glare.style.setProperty('--gy', (clampedY * 100).toFixed(1) + '%');
                glare.style.opacity = '1';
            });
        }

        function onLeave() {
            rect = null;
            if (raf) cancelAnimationFrame(raf);
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
            el.style.transform = '';
            if (glare) glare.style.opacity = '0';
        }

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    }

    function init() {
        const selectors = [
            '.project-card',
            '.skill-card',
            '.edu-card',
            '.cert-item',
            '.timeline-item',
            '.c-method',
            '.detail-item',
            '.gi',
            '.about-profile-card'
        ];
        document.querySelectorAll(selectors.join(', ')).forEach(attachTilt);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }

    // Re-check when dynamic filter updates or DOM changes
    window.addEventListener('filterApplied', () => {
        setTimeout(init, 100);
    });
})();
