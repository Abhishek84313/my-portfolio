import { useEffect, useRef } from "react";

/** Thin gradient bar at the very top showing scroll progress. */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (ref.current) ref.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
