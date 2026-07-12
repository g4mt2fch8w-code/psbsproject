import { Reveal } from "@/components/effects/Reveal";
import { Sprout, Eye, Users } from "lucide-react";
import plantingImg from "@/assets/planting.jpg";

const pillars = [
  {
    icon: Sprout,
    title: "Restore",
    body: "Native species reforestation across Vidarbha's degraded landscapes.",
  },
  {
    icon: Eye,
    title: "Protect",
    body: "Wildlife monitoring, rescue and anti-poaching field operations.",
  },
  {
    icon: Users,
    title: "Engage",
    body: "Forest-edge communities, schools and indigenous guardians.",
  },
];

export interface PillarData {
  iconName?: string;
  title: string;
  body: string;
}

export interface MissionProps {
  eyebrow?: string;
  headingPart1?: string;
  headingHighlight1?: string;
  headingPart2?: string;
  headingHighlight2?: string;
  headingPart3?: string;
  paragraphs?: string[];
  pillarsData?: PillarData[];
  imageSrc?: string;
  imageAlt?: string;
  imageOverlaySubtitle?: string;
  imageOverlayTitle?: string;
}

export function Mission({
  eyebrow = "Our Mission",
  headingPart1 = "We don't just ",
  headingHighlight1 = "protect",
  headingPart2 = " nature.\\nWe ",
  headingHighlight2 = "become",
  headingPart3 = " it.",
  paragraphs = [
    "From the central forests of Maharashtra to the tiger corridors of Vidarbha, PSBS works at the intersection of science, community, and reverence. Every sapling planted, every camera-trap installed, every awareness campaign carried into a village school is a single brushstroke on a much larger canvas — a thriving, breathing India.",
    "We were founded in 2022 by forest-edge communities who understood that conservation cannot be imported—it must be grown locally. Today, 132 villages partner with us — not as beneficiaries, but as co-stewards of the landscapes they have known for generations.",
    "Our approach is deliberately slow and local. We do not chase headlines; we chase sapling survival rates, tiger pugmarks in wet clay, and the moment a child names their adopted tree."
  ],
  pillarsData = [
    { title: "Restore", body: "Native species reforestation across Vidarbha's degraded landscapes.", iconName: "Sprout" },
    { title: "Protect", body: "Wildlife monitoring, rescue and anti-poaching field operations.", iconName: "Eye" },
    { title: "Engage", body: "Forest-edge communities, schools and indigenous guardians.", iconName: "Users" }
  ],
  imageSrc = plantingImg,
  imageAlt = "A sapling being planted",
  imageOverlaySubtitle = "A single seed",
  imageOverlayTitle = "becomes the breath of generations."
}: MissionProps) {
  return (
    <section
      id="mission"
      className="relative overflow-hidden bg-ink py-32 md:py-44"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto grid max-w-[1500px] gap-20 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                {eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog whitespace-pre-wrap">
              {headingPart1}
              <em className="text-gold-gradient not-italic">{headingHighlight1}</em>
              {headingPart2}
              <em className="text-gold-gradient not-italic">{headingHighlight2}</em>
              {headingPart3}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            {paragraphs.map((p, idx) => (
              <p key={idx} className={`max-w-2xl text-base leading-relaxed text-fog/65 md:text-lg ${idx > 0 ? 'mt-8' : 'mt-8'}`}>
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {pillarsData.map((p, i) => (
              <Reveal key={p.title} delay={0.3 + i * 0.1}>
                <div className="group glass-card relative h-full rounded-2xl p-6 transition duration-500 hover:-translate-y-1">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{ boxShadow: "var(--shadow-emerald)" }}
                  />
                  {p.iconName === 'Sprout' ? <Sprout className="h-6 w-6 text-gold" /> : 
                   p.iconName === 'Eye' ? <Eye className="h-6 w-6 text-gold" /> :
                   <Users className="h-6 w-6 text-gold" />}
                  <h3 className="mt-5 font-display text-2xl text-fog">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog/55">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.3} y={60}>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                width={1280}
                height={1280}
                className="h-[520px] w-full object-cover transition duration-[1.6s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold/80">
                  {imageOverlaySubtitle}
                </span>
                <p className="mt-2 font-display text-2xl text-fog">
                  {imageOverlayTitle}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
