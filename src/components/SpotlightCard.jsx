import { useState } from "react";

export default function SpotlightCard({ children, className = "", style = {}, ...props }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      className={`relative overflow-hidden rounded-2xl border border-border-default bg-bg-elevated shadow-md hover:shadow-xl transition-all duration-300 hover:border-border-hover ${className}`}
      {...props}
    >
      {/* Spotlight overlay (soft glow) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, var(--accent-glow), transparent 80%)`,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
