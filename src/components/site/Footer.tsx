import { Link } from "@tanstack/react-router";
import { Leaf, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import psbsLogo from "@/assets/psbs_logo.png";

const exploreLinks = [
  { label: "About", to: "/about" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Wildlife", to: "/wildlife" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "News", to: "/news" as const },
];

const engageLinks = [
  { label: "Volunteer", to: "/volunteer" as const },
  { label: "Donate", to: "/donate" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-canopy/40 py-16">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-emerald/30 bg-white/5 overflow-hidden p-1">
              <img src={psbsLogo} alt="PSBS Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
            </span>
            <div>
              <div className="font-display text-xl text-fog">PSBS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Paryavaran Sanrakshan Bahuddeshiya Sanstha
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fog/55">
            A registered Wildlife · Forest · Environment NGO operating from the
            heart of Bhandara, Vidarbha — guarding the central forests of India
            since our first sapling took root in 2022.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Youtube, Mail].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog/70 transition hover:border-gold/50 hover:text-gold"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
              Explore
            </div>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="story-link text-sm text-fog/65 hover:text-fog"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
              Engage
            </div>
            <ul className="mt-5 space-y-3">
              {engageLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="story-link text-sm text-fog/65 hover:text-fog"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
              Contact
            </div>
            <ul className="mt-5 space-y-3 text-sm text-fog/65">
              <li>Bhandara, Maharashtra</li>
              <li>
                <a
                  href="mailto:info@psbsbhandara.org"
                  className="story-link hover:text-fog"
                >
                  info@psbsbhandara.org
                </a>
              </li>
              <li>+91 · · · · · ·</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1500px] flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-6 pt-6 text-xs text-fog/40 md:flex-row md:px-12">
        <div>
          © {new Date().getFullYear()} PSBS Bhandara · Built with reverence for
          the wild.
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-4 bg-gold/30" />
          <span className="tracking-[0.2em]">
            MADE BY <span className="text-gold/80">OMKAR PATIL BHOPLE</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
