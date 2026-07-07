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

  /* ------------------------------------------------------------------
     HERO PORTRAIT — photo in a compass-bezel frame with a north arrow.
     Drawn as SVG so the ring, ticks, and arrow stay crisp at any size.
     If the photo file is missing, the frame shows a labeled placeholder
     instead of a broken image.
     ------------------------------------------------------------------ */
  const SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs) {
    const el = document.createElementNS(SVG_NS, name);
    for (const key in attrs) el.setAttribute(key, attrs[key]);
    return el;
  }

  function buildPortraitFrame() {
    const mount = document.getElementById("heroPortrait");
    if (!mount) return;

    const CX = 210, CY = 265, R = 150;      /* photo circle */
    const BEZEL = R + 22;                    /* outer ring */

    const svg = svgEl("svg", {
      viewBox: "0 0 420 480",
      role: "img",
      "aria-label": "Portrait of Thomas Quintero, framed in a compass north arrow"
    });

    /* clip for the photo */
    const defs = svgEl("defs", {});
    const clip = svgEl("clipPath", { id: "portraitClip" });
    clip.appendChild(svgEl("circle", { cx: CX, cy: CY, r: R }));
    defs.appendChild(clip);
    svg.appendChild(defs);

    /* placeholder disc behind the photo (visible until the photo loads) */
    svg.appendChild(svgEl("circle", {
      cx: CX, cy: CY, r: R, fill: "#E9E2D2"
    }));
    const placeholderText = svgEl("text", {
      x: CX, y: CY, "text-anchor": "middle", "dominant-baseline": "middle",
      fill: "#5C4F3D", "font-family": "ui-monospace, Menlo, monospace",
      "font-size": "13", "letter-spacing": "2"
    });
    placeholderText.textContent = "PHOTO EN ROUTE";
    svg.appendChild(placeholderText);

    /* the photo itself */
    const photo = svgEl("image", {
      href: "assets/img/portrait.jpg",
      x: CX - R, y: CY - R, width: R * 2, height: R * 2,
      preserveAspectRatio: "xMidYMid slice",
      "clip-path": "url(#portraitClip)"
    });
    photo.addEventListener("error", () => photo.remove());
    svg.appendChild(photo);

    /* bezel ring + degree ticks, like a compass housing */
    svg.appendChild(svgEl("circle", {
      cx: CX, cy: CY, r: BEZEL,
      fill: "none", stroke: "#2E2418", "stroke-width": 2.5
    }));
    svg.appendChild(svgEl("circle", {
      cx: CX, cy: CY, r: R + 6,
      fill: "none", stroke: "#B0532A", "stroke-width": 1.5, opacity: 0.65
    }));
    for (let deg = 0; deg < 360; deg += 15) {
      if (deg === 0) continue;                    /* north gets the arrow */
      const major = deg % 90 === 0;
      const rad = (deg - 90) * Math.PI / 180;
      const inner = BEZEL - (major ? 13 : 7);
      svg.appendChild(svgEl("line", {
        x1: CX + Math.cos(rad) * inner, y1: CY + Math.sin(rad) * inner,
        x2: CX + Math.cos(rad) * BEZEL, y2: CY + Math.sin(rad) * BEZEL,
        stroke: "#2E2418", "stroke-width": major ? 2.5 : 1.25
      }));
    }

    /* surveyor's north arrow: split lance above the bezel, half filled */
    const tipY = CY - BEZEL - 72;
    const baseY = CY - BEZEL + 6;
    svg.appendChild(svgEl("path", {          /* left half — filled */
      d: `M ${CX} ${tipY} L ${CX - 17} ${baseY} L ${CX} ${baseY - 14} Z`,
      fill: "#2E2418"
    }));
    svg.appendChild(svgEl("path", {          /* right half — outline */
      d: `M ${CX} ${tipY} L ${CX + 17} ${baseY} L ${CX} ${baseY - 14} Z`,
      fill: "#F2EDE3", stroke: "#2E2418", "stroke-width": 2
    }));
    const northLabel = svgEl("text", {
      x: CX + 26, y: tipY + 22, fill: "#B0532A",
      "font-family": "ui-monospace, Menlo, monospace",
      "font-size": "20", "font-weight": "700"
    });
    northLabel.textContent = "N";
    svg.appendChild(northLabel);

    mount.appendChild(svg);
  }

  buildPortraitFrame();

  /* ------------------------------------------------------------------
     PROJECT CARDS — rendered from SITE_DATA.projects.
     Videos autoplay muted + looping, but are lazy: nothing is fetched
     until the card nears the viewport, and playback pauses again when
     it scrolls away. Missing media falls back to a styled placeholder.
     ------------------------------------------------------------------ */
  const projectGrid = document.getElementById("projectGrid");
  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mediaFallback(container, title) {
    container.innerHTML = "";
    container.classList.add("media-pending");
    const initial = document.createElement("span");
    initial.className = "media-initial";
    initial.textContent = title.charAt(0);
    const note = document.createElement("span");
    note.className = "media-note";
    note.textContent = "preview en route";
    container.append(initial, note);
  }

  function buildCard(project) {
    const card = document.createElement("article");
    card.className = "pcard";

    /* --- media --- */
    const media = document.createElement("div");
    media.className = "pcard-media";

    if (project.media.type === "video") {
      const video = document.createElement("video");
      video.muted = true;                /* required for mobile autoplay */
      video.loop = true;
      video.playsInline = true;          /* no iOS fullscreen takeover */
      video.preload = "none";            /* nothing loads until lazy-load */
      video.dataset.src = project.media.src;
      if (project.media.poster) video.poster = project.media.poster;
      video.setAttribute("aria-label", project.media.alt);
      video.addEventListener("error", () => mediaFallback(media, project.title));
      media.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = project.media.src;
      img.alt = project.media.alt;
      img.addEventListener("error", () => mediaFallback(media, project.title));
      media.appendChild(img);
    }

    /* --- text --- */
    const body = document.createElement("div");
    body.className = "pcard-body";

    const heading = document.createElement("h3");
    heading.className = "pcard-title";
    heading.textContent = project.title;

    const desc = document.createElement("p");
    desc.className = "pcard-desc";
    desc.textContent = project.description;

    const link = document.createElement("a");
    link.className = "pcard-link";
    if (project.link) {
      link.href = project.link.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = `${project.link.label} <span aria-hidden="true">&nearr;</span>`;
    } else {
      /* internal work: route curiosity to the contact section */
      link.href = "#contact";
      link.innerHTML = `Ask me about this <span aria-hidden="true">&rarr;</span>`;
    }

    body.append(heading, desc, link);
    card.append(media, body);
    return card;
  }

  if (projectGrid && typeof SITE_DATA !== "undefined") {
    SITE_DATA.projects.forEach((project) => {
      projectGrid.appendChild(buildCard(project));
    });

    /* lazy-load + play/pause videos as they enter/leave the viewport */
    const videos = projectGrid.querySelectorAll("video[data-src]");
    if ("IntersectionObserver" in window && videos.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (!video.src) {            /* first approach: attach the file */
              video.src = video.dataset.src;
              video.load();
            }
            /* reduced-motion users keep the poster; no auto playback */
            if (!prefersReducedMotion) {
              video.play().catch(() => { /* autoplay veto — poster remains */ });
            }
          } else if (!video.paused) {
            video.pause();               /* offscreen: stop burning battery */
          }
        });
      }, { rootMargin: "200px 0px" });   /* start fetching just before visible */
      videos.forEach((video) => observer.observe(video));
    }
  }

})();
