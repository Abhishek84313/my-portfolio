import { useEffect, useRef } from "react";

/** Soft glow that trails the cursor. Hidden on touch devices via CSS. */
export default function Cursor() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = -100, y = -100, gx = -100, gy = -100, raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
