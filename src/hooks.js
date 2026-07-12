import { useEffect, useRef, useState } from "react";

/** Adds .in class when the element scrolls into view (one-shot). */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Cycles through phrases with a typewriter effect. */
export function useTypewriter(phrases, speed = 65, pause = 1800) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0, chars = 0, deleting = false, timer;
    const tick = () => {
      const phrase = phrases[i % phrases.length];
      chars += deleting ? -1 : 1;
      setText(phrase.slice(0, chars));
      let delay = deleting ? speed / 2 : speed;
      if (!deleting && chars === phrase.length) {
        delay = pause;
        deleting = true;
      } else if (deleting && chars === 0) {
        deleting = false;
        i++;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [phrases, speed, pause]);
  return text;
}

/** 3D tilt on hover for cards. Attach handlers to the element. */
export function useTilt(max = 9) {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return { ref, onMouseMove, onMouseLeave };
}

/** Animates a progress bar width when visible. */
export function useCountUpBar() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = el.dataset.level + "%";
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
