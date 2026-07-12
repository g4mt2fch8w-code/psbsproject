import { Reveal } from "@/components/effects/Reveal";
import tiger from "@/assets/tiger.jpg";
import wolf from "@/assets/wolf.jpg";
import deer from "@/assets/deer.jpg";
import leopard from "@/assets/leopard.jpg";
export interface WildlifeSpecies {
  img: string;
  status: string;
  latin: string;
  name: string;
  body: string;
}

export interface WildlifeProps {
  eyebrow?: string;
  headingPart1?: string;
  headingHighlight?: string;
  headingPart2?: string;
  description?: string;
  species?: WildlifeSpecies[];
}

const defaultSpecies: WildlifeSpecies[] = [
  {
    img: tiger,
    status: "Endangered",
    latin: "Panthera tigris tigris",
    name: "Bengal Tiger",
    body: "The soul of Vidarbha. Apex stewards of the forest.",
  },
  {
    img: wolf,
    status: "Endangered",
    latin: "Canis lupus pallipes",
    name: "Indian Wolf",
    body: "Ghost of the scrublands, vital to maintaining the plains.",
  },
  {
    img: deer,
    status: "Least Concern",
    latin: "Axis axis",
    name: "Spotted Deer, Blackbuck, Chousinga",
    body: "The quiet pulse beneath the sal trees.",
  },
  {
    img: leopard,
    status: "Vulnerable",
    latin: "Panthera pardus fusca",
    name: "Leopard",
    body: "Shadows that keep the ecosystem balanced.",
  },
];

function Wildlife3DCard({ s }: { s: any }) {
  return (
    <article
      className="group relative h-[450px] md:h-[520px] overflow-hidden rounded-3xl border border-white/[0.06] bg-ink"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={s.img}
          alt={s.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-gold/90 text-[10px] uppercase font-bold text-ink backdrop-blur shadow-md opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {s.status}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
        <div className="text-[10px] italic tracking-wide text-gold/70">
          {s.latin}
        </div>
        <h3 className="mt-1 font-display text-3xl text-fog transition-transform duration-500 group-hover:-translate-y-1">{s.name}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-fog/70 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
          {s.body}
        </p>
      </div>
    </article>
  );
}

export function Wildlife({
  eyebrow = "The Inhabitants",
  headingPart1 = "Lives we are ",
  headingHighlight = "sworn",
  headingPart2 = " to protect.",
  description = "Hover into each species to learn about who shares these forests with us — and why they need us now.",
  species = defaultSpecies
}: WildlifeProps) {

  return (
    <section id="wildlife" className="relative overflow-hidden py-32 md:py-44 bg-ink">
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog whitespace-pre-wrap">
            {headingPart1}
            <em className="text-gold-gradient not-italic">{headingHighlight}</em>
            {headingPart2}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-fog/55 whitespace-pre-wrap">
            {description}
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <Wildlife3DCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
