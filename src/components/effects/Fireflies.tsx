import { useEffect, useRef } from "react";

/** Canvas-based fireflies + drifting fog particles */
export function Fireflies({ density = 80 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    const flies = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.008,
    }));

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        f.x += f.vx + Math.sin(t * f.speed + f.phase) * 0.4;
        f.y += f.vy + Math.cos(t * f.speed + f.phase) * 0.3;
        if (f.x < 0) f.x = w;
        if (f.x > w) f.x = 0;
        if (f.y < 0) f.y = h;
        if (f.y > h) f.y = 0;
        const flicker = 0.5 + 0.5 * Math.sin(t * 0.04 + f.phase);
        const r = f.r * devicePixelRatio;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 14);
        grad.addColorStop(0, `rgba(240,216,122,${0.9 * flicker})`);
        grad.addColorStop(0.3, `rgba(201,161,59,${0.35 * flicker})`);
        grad.addColorStop(1, "rgba(201,161,59,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r * 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,240,180,${flicker})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
