import { Reveal } from "@/components/effects/Reveal";
import tiger from "@/assets/tiger.jpg";
import hornbill from "@/assets/hornbill.jpg";
import deer from "@/assets/deer.jpg";
import leopard from "@/assets/leopard.jpg";
import { useRef, type MouseEvent } from "react";

const species = [
  {
    img: tiger,
    status: "Endangered",
    count: "38",
    latin: "Panthera tigris tigris",
    name: "Bengal Tiger",
    body: "The soul of Vidarbha. Apex stewards of the forest.",
  },
  {
    img: hornbill,
    status: "Vulnerable",
    count: "210+",
    latin: "Buceros bicornis",
    name: "Indian Hornbill",
    body: "Forest gardeners — sowing tomorrow's canopy.",
  },
  {
    img: deer,
    status: "Least Concern",
    count: "4,200+",
    latin: "Axis axis",
    name: "Spotted Deer",
    body: "The quiet pulse beneath the sal trees.",
  },
  {
    img: leopard,
    status: "Vulnerable",
    count: "22",
    latin: "Panthera pardus fusca",
    name: "Leopard",
    body: "Shadows that keep the ecosystem balanced.",
  },
];

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1100px) rotateY(0) rotateX(0) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      className="transition-transform duration-300 will-change-transform"
    >
      {children}
    </div>
  );
}

export function Wildlife() {
  return (
    <section id="wildlife" className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              The Inhabitants
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            Lives we are{" "}
            <em className="text-gold-gradient not-italic">sworn</em> to protect.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-fog/55">
            Hover into each species to learn about who shares these forests with
            us — and why they need us now.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <Tilt>
                <article className="group relative h-[520px] overflow-hidden rounded-3xl border border-white/[0.06]">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, rgba(201,161,59,0.25), transparent 60%)",
                    }}
                  />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold/90 backdrop-blur">
                    {s.status}
                  </div>
                  <div className="absolute right-5 top-5 text-right">
                    <div className="font-display text-3xl text-fog text-glow">
                      {s.count}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-fog/50">
                      in our reserves
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="text-[10px] italic tracking-wide text-gold/70">
                      {s.latin}
                    </div>
                    <h3 className="mt-1 font-display text-3xl text-fog">
                      {s.name}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-fog/70 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                      {s.body}
                    </p>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
