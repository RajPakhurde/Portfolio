import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node & Synapse settings
    const nodeCount = Math.min(65, Math.floor((width * height) / 18000)); // Dynamic node count based on screen size
    const connectionDistance = 115; // Max distance to draw lines between nodes
    const nodes = [];
    const impulses = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Fetch theme colors dynamically
    const rootStyles = getComputedStyle(document.documentElement);
    const accentColor = rootStyles.getPropertyValue("--accent").trim() || "#0052FF";
    const accentBright = rootStyles.getPropertyValue("--accent-bright").trim() || "#4D7CFF";

    // Initialize Nodes
    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 1.2;
        this.charge = 0; // Glow indicator (activated by mouse)
        this.lastFired = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Decaying charge
        if (this.charge > 0) this.charge -= 0.02;
        else this.charge = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + this.charge * 1.8, 0, Math.PI * 2);
        
        // Draw nodes glowing in the accent colors
        const alpha = 0.15 + this.charge * 0.75;
        ctx.fillStyle = this.charge > 0 ? accentBright : accentColor;
        ctx.shadowBlur = this.charge > 0 ? 12 : 0;
        ctx.shadowColor = accentBright;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    // Initialize list of nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    // Synaptic Impulse representation
    class Impulse {
      constructor(fromNode, toNode, strength = 1.0) {
        this.from = fromNode;
        this.to = toNode;
        this.progress = 0;
        this.speed = Math.random() * 0.015 + 0.012; // Speed of impulse travel
        this.strength = strength;
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1.0; // Return true if destination reached
      }

      draw() {
        // Linear interpolation for current position
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 1.8 * this.strength, 0, Math.PI * 2);
        ctx.fillStyle = accentBright;
        ctx.shadowBlur = 8;
        ctx.shadowColor = accentBright;
        ctx.globalAlpha = 0.8 * this.strength;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    // Helper to fire impulses from a node to all neighbors
    const fireNeuron = (node, strength = 1.0) => {
      const now = Date.now();
      if (now - node.lastFired < 450) return; // Rate limit firing per node
      node.lastFired = now;
      node.charge = 1.0;

      // Find nearby neighbors and send impulses
      nodes.forEach((other) => {
        if (node === other) return;
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          impulses.push(new Impulse(node, other, strength));
        }
      });
    };

    // Draw Loop
    const draw = () => {
      // Very faint trail clearing for smooth motion blur
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connections (Synapses)
      for (let i = 0; i < nodeCount; i++) {
        const nodeA = nodes[i];
        nodeA.update();

        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            // Stronger opacity when nodes are close
            const alpha = (1.0 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // 2. Draw & Update Nodes
      nodes.forEach((node) => {
        node.draw();

        // Mouse proximity checks
        if (mouse.x !== null && mouse.y !== null) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius * 0.6) {
            // Excite nodes near the cursor and fire signals
            node.charge = Math.max(node.charge, (1.0 - dist / (mouse.radius * 0.6)) * 0.85);
            if (Math.random() < 0.015) {
              fireNeuron(node, 0.6);
            }
          }
        }
      });

      // 3. Draw & Update Firing Impulses
      for (let i = impulses.length - 1; i >= 0; i--) {
        const impulse = impulses[i];
        const reached = impulse.update();

        if (reached) {
          // Dest target neuron excited
          impulse.to.charge = Math.min(impulse.to.charge + 0.4, 1.0);
          
          // Faint chance to cascade further (decaying strength)
          if (impulse.strength > 0.35 && Math.random() < 0.18) {
            fireNeuron(impulse.to, impulse.strength * 0.6);
          }

          impulses.splice(i, 1);
        } else {
          impulse.draw();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Event Listeners
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onClick = (e) => {
      // Find closest node to click
      let closestNode = null;
      let minDistance = Infinity;

      nodes.forEach((node) => {
        const dist = Math.hypot(node.x - e.clientX, node.y - e.clientY);
        if (dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      });

      // Trigger chain reaction from clicked node
      if (closestNode && minDistance < 180) {
        fireNeuron(closestNode, 1.0);
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClick);
    canvas.addEventListener("mouseleave", onMouseLeave);

    onResize();
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      if (canvas) canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full bg-transparent"
    />
  );
}
