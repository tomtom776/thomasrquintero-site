/* ==========================================================================
   Thomas Quintero — portfolio behavior
   Sections render from SITE_DATA (js/data.js); this file never hardcodes
   content. Currently: nav behavior + hero contour art. Project cards,
   timeline, skills, and contact renderers land in later build passes.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     NAV — mobile menu toggle + solid background once scrolled
     ------------------------------------------------------------------ */
  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* close the mobile menu after a link is chosen */
  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  const updateNavState = () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", updateNavState, { passive: true });
  updateNavState();

  /* ------------------------------------------------------------------
     HERO — topographic contour art on <canvas>
     Nested "contour lines" wobbled with layered sine waves, anchored
     off the right edge like the corner of a topo quad. Redrawn on
     resize; static otherwise (no animation loop).
     ------------------------------------------------------------------ */
  const contourCanvas = document.getElementById("heroContours");

  function drawContours() {
    const ctx = contourCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = contourCanvas.clientWidth;
    const h = contourCanvas.clientHeight;

    contourCanvas.width = w * dpr;
    contourCanvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    /* "summit" sits off-canvas to the upper right */
    const cx = w * 1.02;
    const cy = h * 0.18;
    const unit = Math.max(w, h) * 0.075;
    const ringCount = 11;

    for (let ring = ringCount; ring >= 1; ring--) {
      const baseRadius = unit * (ring + 1.2);
      ctx.beginPath();

      for (let a = 0; a <= Math.PI * 2 + 0.02; a += Math.PI / 120) {
        /* layered sines give each ring an organic, non-circular edge */
        const wobble =
          Math.sin(a * 3 + ring * 0.9) * baseRadius * 0.09 +
          Math.sin(a * 5 - ring * 1.7) * baseRadius * 0.05 +
          Math.sin(a * 2 + 1.3) * baseRadius * 0.07;
        const r = baseRadius + wobble;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * 0.9; /* slight flattening */
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      /* faint fills on a couple of rings for depth */
      if (ring === 3) { ctx.fillStyle = "rgba(119, 128, 79, 0.08)"; ctx.fill(); }
      if (ring === 6) { ctx.fillStyle = "rgba(233, 226, 210, 0.55)"; ctx.fill(); }

      /* every 4th ring is an "index contour" — slightly heavier */
      const isIndex = ring % 4 === 0;
      ctx.strokeStyle = isIndex
        ? "rgba(146, 128, 96, 0.42)"
        : "rgba(160, 145, 116, 0.30)";
      ctx.lineWidth = isIndex ? 1.8 : 1.1;
      ctx.stroke();
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawContours, 150);
  });
  drawContours();

})();
