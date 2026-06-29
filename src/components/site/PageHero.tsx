import { Reveal } from "@/components/effects/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleEm?: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  titleEm,
  description,
  children,
}: PageHeroProps) {
  return (
    <header className="relative border-b border-white/[0.06] pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="absolute inset-0 bg-gradient-to-b from-canopy/50 to-transparent" />
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-fog">
            {title}
            {titleEm && (
              <>
                {" "}
                <em className="text-gold-gradient not-italic">{titleEm}</em>
              </>
            )}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog/60 md:text-lg">
            {description}
          </p>
        </Reveal>
        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </div>
    </header>
  );
}
