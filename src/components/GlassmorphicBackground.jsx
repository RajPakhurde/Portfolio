export default function GlassmorphicBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* CSS animation definitions */}
      <style>{`
        .glass-orb {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.08),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.5s ease;
        }

        .dark .glass-orb {
          border-color: rgba(255, 255, 255, 0.06);
          box-shadow: 
            0 12px 48px 0 rgba(0, 0, 0, 0.25),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
        }

        /* Float Animations for Orbs */
        @keyframes orb-float-1 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          33% { transform: translate(120px, 80px) rotate(120deg) scale(1.08); }
          66% { transform: translate(-60px, 160px) rotate(240deg) scale(0.94); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(1); }
        }

        @keyframes orb-float-2 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          50% { transform: translate(-140px, 120px) rotate(-180deg) scale(0.92); }
          100% { transform: translate(0px, 0px) rotate(-360deg) scale(1); }
        }

        @keyframes orb-float-3 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          33% { transform: translate(-80px, -140px) rotate(90deg) scale(1.06); }
          66% { transform: translate(140px, -60px) rotate(270deg) scale(0.95); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(1); }
        }

        @keyframes orb-float-4 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          50% { transform: translate(100px, -100px) rotate(180deg) scale(1.1); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(1); }
        }

        .orb-1 {
          width: 320px;
          height: 320px;
          top: -40px;
          left: 10%;
          background: radial-gradient(circle at top left, var(--accent-glow), transparent 70%);
          animation: orb-float-1 26s infinite linear;
        }

        .orb-2 {
          width: 420px;
          height: 420px;
          bottom: 10%;
          right: 5%;
          background: radial-gradient(circle at bottom right, rgba(147, 51, 234, 0.07), transparent 70%);
          animation: orb-float-2 32s infinite linear;
        }

        .orb-3 {
          width: 260px;
          height: 260px;
          top: 35%;
          left: -40px;
          border-radius: 35% 65% 70% 30% / 30% 40% 60% 70%; /* Organic morphing shape */
          background: radial-gradient(circle at center, rgba(6, 182, 212, 0.08), transparent 75%);
          animation: orb-float-3 22s infinite linear;
        }

        .orb-4 {
          width: 360px;
          height: 360px;
          top: 55%;
          right: 25%;
          background: radial-gradient(circle at top right, rgba(236, 72, 153, 0.05), transparent 70%);
          animation: orb-float-4 28s infinite linear;
        }

        .orb-5 {
          width: 200px;
          height: 200px;
          bottom: -20px;
          left: 30%;
          background: radial-gradient(circle at bottom left, var(--accent-glow), transparent 70%);
          animation: orb-float-1 20s infinite linear reverse;
        }
      `}</style>

      {/* Frosted Glass Orbs */}
      <div className="glass-orb orb-1" />
      <div className="glass-orb orb-2" />
      <div className="glass-orb orb-3" />
      <div className="glass-orb orb-4" />
      <div className="glass-orb orb-5" />
    </div>
  );
}
