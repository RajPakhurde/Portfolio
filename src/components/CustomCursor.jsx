import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if device supports pointer hovering (excludes touchscreen/mobiles)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    let hasMoved = false;

    // Define ribbon chain parameters
    const maxPoints = 24;
    const points = [];

    // Initialize chain nodes
    for (let i = 0; i < maxPoints; i++) {
      points.push({ x: 0, y: 0 });
    }

    let isHovering = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // On first move, snap all points to mouse to avoid drawing line from (0,0)
      if (!hasMoved) {
        for (let i = 0; i < maxPoints; i++) {
          points[i].x = mouseX;
          points[i].y = mouseY;
        }
        hasMoved = true;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".carousel-card") ||
        target.closest(".carousel-dot") ||
        target.closest(".carousel-arrow") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button"
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!hasMoved) {
        requestAnimationFrame(draw);
        return;
      }

      // Physics loop: Lead point follows mouse, subsequent points follow previous points
      points[0].x = mouseX;
      points[0].y = mouseY;

      for (let i = 1; i < maxPoints; i++) {
        // Smoothly pull point towards previous point
        // Using high interpolation factor (0.42) for leading points and lower for trailing points for lag
        const lerpFactor = 0.45 - (i / maxPoints) * 0.15;
        points[i].x += (points[i - 1].x - points[i].x) * lerpFactor;
        points[i].y += (points[i - 1].y - points[i].y) * lerpFactor;
      }

      // Fetch current theme values for glowing effect
      const rootStyles = getComputedStyle(document.documentElement);
      const accent = rootStyles.getPropertyValue("--accent").trim() || "#0052FF";
      const accentBright = rootStyles.getPropertyValue("--accent-bright").trim() || "#4D7CFF";

      // Draw the trailing ribbon
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw thin lines with changing opacity and width
      for (let i = maxPoints - 1; i > 0; i--) {
        const ratio = (maxPoints - i) / maxPoints; // 1 at tip, 0 at tail
        
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i - 1].x, points[i - 1].y);

        // Styling for ribbon stroke
        ctx.lineWidth = isHovering ? 6.5 * ratio : 3.8 * ratio;
        ctx.strokeStyle = isHovering ? accentBright : accent;
        ctx.globalAlpha = ratio * 0.85;

        // Shadow/glow effects
        ctx.shadowBlur = isHovering ? 14 : 7;
        ctx.shadowColor = isHovering ? accentBright : accent;

        ctx.stroke();
      }

      // Reset global alpha for next draw
      ctx.globalAlpha = 1.0;

      // Draw a small bright pointer dot at the very tip for responsiveness
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, isHovering ? 2 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isHovering ? "#ffffff" : accentBright;
      ctx.shadowBlur = 4;
      ctx.shadowColor = accentBright;
      ctx.fill();

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    // Hide default cursor
    const style = document.createElement("style");
    style.innerHTML = `
      body, a, button, [role="button"], .carousel-card, .carousel-arrow, .carousel-dot, input, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
    />
  );
}
