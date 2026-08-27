import { useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay,
      ease: [0.16, 1, 0.3, 1] 
    },
  }),
};

export default function Projects() {
  useEffect(() => {
    const stage = document.getElementById("carousel-stage");
    const dotsWrap = document.getElementById("carousel-dots");
    const prevBtn = document.getElementById("carousel-prevBtn");
    const nextBtn = document.getElementById("carousel-nextBtn");

    if (!stage || !dotsWrap || !prevBtn || !nextBtn) return;

    // Clear stage and dots to prevent duplicate rendering during hot reloads
    stage.innerHTML = "";
    dotsWrap.innerHTML = "";

    const N = projects.length;
    let activeIndex = 0;
    let exitingIndex = null;
    let exitTimer = null;

    function forwardOffset(i, active, n) {
      return (i - active + n) % n;
    }

    const scaleStep = 0.12; // Inactive cards shrink by 12% per step
    const maxVisible = 2;   // Main active + 2 stacked on the right visible

    function getSpacing() {
      const isMobile = window.innerWidth < 768;
      // 48% spacing for desktop, 97% for mobile
      const spacingFactor = isMobile ? 0.97 : 0.48;
      return stage.clientWidth * spacingFactor;
    }

    // Persist real DOM element per project so transitions animate positions smoothly
    const cardEls = projects.map((p, i) => {
      const card = document.createElement("div");
      card.className = "carousel-card border-gradient-hover group";
      
      const techBadges = p.tech.map(t => `
        <span class="carousel-tech-badge">
          ${t}
        </span>
      `).join('');

      const highlightEl = p.highlight 
        ? `<div class="carousel-highlight">⚡ ${p.highlight}</div>`
        : '';

      const demoBtn = p.demo 
        ? `<a href="${p.demo}" target="_blank" class="carousel-btn primary group/demo relative overflow-hidden">
             <span class="relative z-10">Live Demo</span>
             <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/demo:translate-x-full transition-transform duration-1000 ease-out"></span>
           </a>`
        : `<span class="carousel-btn disabled-btn">Coming Soon</span>`;

      // Set HTML content — both hero (active) and thumb (secondary) layouts embedded
      card.innerHTML = `
        <div class="carousel-card-inner">

          <!-- HERO layout: shown only on active card -->
          <div class="carousel-hero">
            <img src="${p.image}" alt="${p.title}" class="carousel-hero-img" onerror="this.style.display='none';" />
            <div class="carousel-hero-overlay">
              <h3 class="hero-title">${p.title}</h3>
              <p class="hero-desc">${p.description}</p>
            </div>
          </div>

          <!-- THUMB layout: shown only on secondary cards -->
          <div class="carousel-thumb">
            <img src="${p.image}" alt="${p.title}" class="carousel-thumb-img" onerror="this.style.display='none'; this.nextSibling.style.display='flex';" />
            <div class="carousel-img-fallback">🖥️</div>
          </div>
          <h3 class="carousel-secondary-title">${p.title}</h3>

          <!-- Content block: shown only on active card -->
          <div class="carousel-content">
            ${highlightEl}
            <div class="carousel-tech-badges">
              ${techBadges}
            </div>
            <div class="carousel-extra">
              <a href="${p.github}" target="_blank" class="carousel-btn group/github relative overflow-hidden">
                <span class="relative z-10">GitHub</span>
                <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/github:translate-x-full transition-transform duration-1000 ease-out"></span>
              </a>
              ${demoBtn}
            </div>
          </div>

        </div>
      `;

      // Spotlight Glow elements
      const hoverGlow = document.createElement("div");
      hoverGlow.className = "carousel-spotlight";
      card.appendChild(hoverGlow);

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hoverGlow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, var(--accent-glow), transparent 80%)`;
      });

      card.addEventListener("click", () => {
        if (i !== activeIndex) goTo(i);
      });
      stage.appendChild(card);
      return card;
    });

    function render(direction = 1) {
      const spacing = getSpacing();
      projects.forEach((p, i) => {
        const card = cardEls[i];
        if (!card) return;

        if (i === exitingIndex) {
          // Fly out in the correct direction:
          // next (direction=1)  → slide LEFT off-stage
          // prev (direction=-1) → slide RIGHT off-stage
          const exitX = direction === 1 ? "-65%" : "105%";
          card.style.transform = `translateY(-50%) translateX(${exitX}) scale(0.5)`;
          card.style.opacity = "0";
          card.style.zIndex = "50";
          card.style.pointerEvents = "none";
          // Keep is-active during exit so content doesn't flash on the new card
          // It gets cleaned up after the timer
          return;
        }

        const offset = forwardOffset(i, activeIndex, N);
        const visible = offset <= maxVisible;
        const scale = Math.max(1 - offset * scaleStep, 0.4);

        const isMobile = window.innerWidth < 768;
        const cardWidthFactor = isMobile ? 0.94 : 0.44;
        const cardWidth = stage.clientWidth * cardWidthFactor;
        const x = offset * spacing - ((offset * (offset - 1)) / 2) * scaleStep * cardWidth;

        const opacity = visible ? 1 - offset * 0.22 : 0;
        const z = 100 - offset;

        card.style.transform = `translateY(-50%) translateX(${x}px) scale(${scale})`;
        card.style.opacity = Math.max(opacity, 0);
        card.style.zIndex = z;
        card.style.pointerEvents = visible ? "auto" : "none";
        card.classList.toggle("is-active", offset === 0);
      });
      renderDots();
    }

    function renderDots() {
      dotsWrap.innerHTML = "";
      projects.forEach((p, i) => {
        const d = document.createElement("div");
        d.className = "carousel-dot" + (i === activeIndex ? " active" : "");
        d.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(d);
      });
    }

    function goTo(index) {
      const newIndex = ((index % N) + N) % N;
      if (newIndex === activeIndex) return;

      // Determine direction: 1 = forward (next), -1 = backward (prev)
      // Handle wrap-around correctly
      let direction = 1;
      const diff = newIndex - activeIndex;
      if (diff === 1 || diff === -(N - 1)) {
        direction = 1;   // going forward
      } else {
        direction = -1;  // going backward
      }

      const justExited = activeIndex;
      exitingIndex = justExited;

      // Immediately remove is-active from the exiting card so the
      // new active card takes over content display without overlap
      if (cardEls[justExited]) {
        cardEls[justExited].classList.remove("is-active");
      }

      activeIndex = newIndex;
      render(direction);

      clearTimeout(exitTimer);
      exitTimer = setTimeout(() => {
        exitingIndex = null;

        // Snap exited card back to its queue position without animation
        const card = cardEls[justExited];
        if (card) {
          card.style.transition = "none";
          card.offsetHeight; // force reflow
        }

        render(direction);

        setTimeout(() => {
          if (card) card.style.transition = "";
        }, 50);
      }, 500);
    }

    const onPrev = () => goTo(activeIndex - 1);
    const onNext = () => goTo(activeIndex + 1);
    const onResize = () => render();

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const onTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance < 0) {
          goTo(activeIndex + 1);
        } else {
          goTo(activeIndex - 1);
        }
      }
    };

    prevBtn.addEventListener("click", onPrev);
    nextBtn.addEventListener("click", onNext);
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial draw
    render();

    // Cleanup listeners and timers on unmount
    return () => {
      prevBtn.removeEventListener("click", onPrev);
      nextBtn.removeEventListener("click", onNext);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <section id="projects" className="py-32 relative z-10 bg-transparent overflow-hidden">
      {/* Scoped CSS styling to replicate premium portfolio design system */}
      <style>{`
        /* ─── STAGE ─────────────────────────────────────── */
        #projects .stage-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          width: 100%;
        }
        #projects .carousel-stage {
          position: relative;
          flex: 1;
          height: 500px;
          overflow: hidden;
        }

        /* ─── BASE CARD ─────────────────────────────────── */
        #projects .carousel-card {
          position: absolute;
          top: 50%;
          left: 0;
          width: 44%;
          height: 480px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-default);
          border-radius: 20px;
          padding: 0;
          display: flex;
          flex-direction: column;
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s ease, border-color 0.4s, box-shadow 0.4s;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 0 0 0 transparent;
        }
        .dark #projects .carousel-card {
          box-shadow: 0 4px 32px rgba(0,0,0,0.35), 0 0 0 0 transparent;
        }

        /* Active card: accent border glow */
        #projects .carousel-card.is-active {
          border-color: var(--border-hover);
          box-shadow:
            0 0 0 1px var(--border-hover),
            0 0 30px -8px var(--accent-glow);
        }
        .dark #projects .carousel-card.is-active {
          box-shadow:
            0 0 0 1px var(--border-hover),
            0 0 40px -8px var(--accent-glow);
        }

        /* Non-active: subtle dim on hover */
        #projects .carousel-card:not(.is-active):hover {
          border-color: var(--border-hover);
        }

        /* Padding so non-active image is inset from card edges */
        #projects .carousel-card:not(.is-active) .carousel-card-inner {
          padding: 10px 10px 12px;
        }

        #projects .carousel-card-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 767px) {
          #projects .carousel-card { width: 94%; }
        }

        /* ─── KEYFRAME ANIMATIONS ───────────────────────── */
        @keyframes heroImgIn {
          from { transform: scale(1.18); opacity: 0; }
          to   { transform: scale(1.08); opacity: 1; }
        }
        @keyframes heroOverlayIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── ACTIVE CARD: HERO IMAGE ───────────────────── */
        #projects .carousel-hero {
          display: none;
          position: relative;
          height: 220px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }
        #projects .carousel-card.is-active .carousel-hero {
          display: block;
        }
        #projects .carousel-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.3) blur(4px) saturate(1.2);
          transform: scale(1.08);
          /* Animate in when card becomes active */
          animation: heroImgIn 0.7s cubic-bezier(.16,1,.3,1) forwards;
        }
        #projects .carousel-card.is-active:hover .carousel-hero-img {
          transform: scale(1.12);
          filter: brightness(0.35) blur(3px) saturate(1.4);
          transition: transform 0.8s cubic-bezier(.16,1,.3,1), filter 0.5s;
          animation: none; /* let hover transition take over */
        }
        #projects .carousel-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 22px 18px;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.45) 45%,
            transparent 100%
          );
          animation: heroOverlayIn 0.55s cubic-bezier(.16,1,.3,1) 0.1s both;
        }
        #projects .hero-title {
          margin: 0 0 5px 0 !important;
          font-size: 1.3rem !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-shadow: 0 2px 16px rgba(0,0,0,0.9) !important;
        }
        #projects .hero-desc {
          margin: 0 !important;
          font-size: 0.76rem !important;
          color: rgba(255,255,255,0.82) !important;
          line-height: 1.55;
          display: -webkit-box !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 8px rgba(0,0,0,0.7);
        }

        /* ─── ACTIVE CARD: CONTENT PANEL ───────────────── */
        #projects .carousel-content {
          display: none;
          flex-direction: column;
          flex: 1;
          padding: 16px 20px 18px;
          overflow: hidden;
          min-height: 0;
          gap: 10px;
        }
        #projects .carousel-card.is-active .carousel-content {
          display: flex;
        }

        /* Highlight — animates in first */
        #projects .carousel-highlight {
          display: none;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-glow);
          border: 1px solid var(--border-accent);
          border-radius: 8px;
          padding: 7px 11px;
          line-height: 1.5;
          flex-shrink: 0;
        }
        #projects .carousel-card.is-active .carousel-highlight {
          display: block;
          animation: fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1) 0.15s both;
        }

        /* Tech badges — animates in second */
        #projects .carousel-tech-badges {
          display: none;
          flex-wrap: wrap;
          gap: 5px;
          flex-shrink: 0;
        }
        #projects .carousel-card.is-active .carousel-tech-badges {
          display: flex;
          animation: fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1) 0.25s both;
        }
        #projects .carousel-tech-badge {
          text-transform: uppercase;
          font-size: 8.5px;
          font-family: "JetBrains Mono", monospace;
          letter-spacing: 0.06em;
          padding: 3px 7px;
          border-radius: 4px;
          background: var(--surface);
          color: var(--foreground-subtle);
          border: 1px solid var(--border-default);
        }

        /* Buttons — animates in last */
        #projects .carousel-extra {
          display: none;
          gap: 10px;
          margin-top: auto;
          flex-shrink: 0;
        }
        #projects .carousel-card.is-active .carousel-extra {
          display: flex;
          animation: fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1) 0.35s both;
        }

        #projects .carousel-btn {
          flex: 1;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 0.73rem;
          font-weight: 650;
          border: 1px solid var(--border-accent);
          background: rgba(255, 255, 255, 0.02);
          color: var(--accent);
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.01em;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        #projects .carousel-btn:hover {
          background: var(--accent-glow);
          border-color: var(--border-hover);
          color: var(--accent);
          transform: translateY(-1px);
        }
        #projects .carousel-btn.primary {
          background: bg-gradient-to-r;
          background-image: linear-gradient(to right, var(--accent), var(--accent-bright));
          color: #fff;
          border: 1px solid transparent;
          box-shadow: 0 0 0 1px var(--border-accent), 0 4px 12px var(--accent-glow), inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
        }
        #projects .carousel-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 0 1px var(--accent), 0 6px 16px var(--accent-glow), inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
        }
        #projects .carousel-btn.disabled-btn {
          opacity: 0.35;
          cursor: not-allowed;
          background: var(--bg-elevated);
          border-color: var(--border-default);
          color: var(--foreground-muted);
          box-shadow: none;
        }


        /* ─── SECONDARY CARD: THUMB LAYOUT ─────────────── */
        #projects .carousel-thumb {
          height: 80%;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-default);
          flex-shrink: 0;
          margin-bottom: 14px;
        }
        #projects .carousel-card.is-active .carousel-thumb {
          display: none;
        }
        #projects .carousel-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.16,1,.3,1), filter 0.4s ease;
          filter: brightness(0.9) saturate(0.9);
        }
        #projects .carousel-card:not(.is-active):hover .carousel-thumb-img {
          transform: scale(1.04);
          filter: brightness(1) saturate(1.05);
        }
        #projects .carousel-img-fallback {
          display: none;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: var(--border-color);
          font-size: 2.5rem;
        }
        /* Project name below image */
        #projects .carousel-secondary-title {
          display: block;
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 2px;
        }
        #projects .carousel-card.is-active .carousel-secondary-title {
          display: none;
        }

        /* ─── ARROWS ────────────────────────────────────── */
        #projects .carousel-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
          background: var(--bg-elevated);
          color: var(--foreground-muted);
          font-size: 1.15rem;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        #projects .carousel-arrow:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          box-shadow: 0 4px 16px var(--accent-glow);
          transform: scale(1.08);
        }
        @media (max-width: 767px) {
          #projects .carousel-arrow { display: none; }
        }

        /* ─── DOTS ──────────────────────────────────────── */
        #projects .carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 28px;
        }
        #projects .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--border-default);
          cursor: pointer;
          transition: background-color 0.3s, width 0.3s, transform 0.3s;
        }
        #projects .carousel-dot.active {
          background: var(--accent);
          width: 22px;
        }

        /* ─── SPOTLIGHT GLOW ────────────────────────────── */
        #projects .carousel-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s;
          z-index: 1;
          border-radius: inherit;
        }
        #projects .carousel-card:hover .carousel-spotlight {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="flex flex-col items-center mb-20"
        >
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 dark:border-accent/30 bg-accent/5 px-4 py-1.5 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent font-semibold">
              Work
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 bg-clip-text text-transparent">
            My{" "}
            <span className="bg-gradient-to-r from-accent via-accent-bright to-accent bg-clip-text text-transparent animate-shimmer">
              Projects
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <p className="mt-4 text-foreground-muted text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed text-center">
            Some of the applications I have built while learning and solving real-world problems.
          </p>
        </motion.div>

        {/* Carousel stage wrap */}
        <div className="stage-wrap">
          <button className="carousel-arrow" id="carousel-prevBtn">‹</button>
          <div className="carousel-stage" id="carousel-stage"></div>
          <button className="carousel-arrow" id="carousel-nextBtn">›</button>
        </div>

        {/* Dots indicators */}
        <div className="carousel-dots" id="carousel-dots"></div>
      </div>
    </section>
  );
}
