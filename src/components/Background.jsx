import { useEffect, useRef } from "react";

/**
 * Animated particle-network canvas + aurora blobs + grid overlay.
 * Particles drift and connect with lines when close; they react gently to the cursor.
 */
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const COUNT = Math.min(90, Math.floor((w * h) / 16000));
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      hue: Math.random() > 0.5 ? 187 : 265, // cyan / violet
    }));

    const LINK = 130;

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        // gentle cursor repulsion
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0.01) {
          d.vx += (dx / dist) * 0.03;
          d.vy += (dy / dist) * 0.03;
        }
        d.vx = Math.max(-0.6, Math.min(0.6, d.vx));
        d.vy = Math.max(-0.6, Math.min(0.6, d.vy));
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 100%, 70%, 0.65)`;
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(210, 100%, 75%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div className="bg-scene" aria-hidden="true">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="grid-overlay" />
      <canvas ref={canvasRef} className="particles" />
      <div className="noise" />
    </div>
  );
}
