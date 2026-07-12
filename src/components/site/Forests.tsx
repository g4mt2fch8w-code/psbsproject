import { Reveal } from "@/components/effects/Reveal";
import canopy from "@/assets/canopy.jpg";
import vidarbhaMap from "@/assets/vidarbha_map.png";
import { useState } from "react";

const initialReserves = [
  { name: "Tadoba-Andhari Tiger Reserve", area: "~ 1700 km²", x: 34.9, y: 81.4 },
  { name: "Lakhandur Forest", area: "Unknown", x: 49.1, y: 52.4 },
  { name: "Wadsa Forest", area: "Unknown", x: 59.3, y: 64.1 },
  { name: "Sillari & Chorbahuli", area: "250 + 65 km²", x: 29.8, y: 10.5 },
  { name: "Mogarkasa Conservation Reserve", area: "103.92 km²", x: 34.8, y: 10.5 },
  { name: "Koka WLS", area: "92.34 km²", x: 54.6, y: 26.6 },
  { name: "Navegaon-Nagzira Tiger Reserve", area: "653.67 km²", x: 64.1, y: 34.4 },
  { name: "Bramhapuri Forest Division", area: "1200 km²", x: 45.4, y: 65.2 },
  { name: "Umred Karhandla Wildlife Sanctuary", area: "195.68 km²", x: 34.5, y: 49.1 },
  { name: "Gosikhurd Wetlands", area: "189 km² (SURROUNDING AREA)", x: 41.9, y: 45.2 },
  { name: "Bhandara Territorial Forest", area: "1,343 km²", x: 39.4, y: 32.3 },
];

export function Forests() {
  const [mapImage, setMapImage] = useState(vidarbhaMap);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setMapImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="forests" className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 opacity-20">
        <img
          src={canopy}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Living Geography
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            The forests we{" "}
            <em className="text-gold-gradient not-italic">walk</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-fog/55">
            Six landscapes across Vidarbha — each one a story, a refuge, a
            future.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Map */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.06] bg-canopy/40 backdrop-blur">
              <div className="absolute inset-0 bg-[#0F3B1D]/20">
                <img src={mapImage} alt="Vidarbha Map" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                {initialReserves.map((r) => (
                  <div 
                    key={r.name} 
                    className="absolute w-2.5 h-2.5 bg-gold rounded-full transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-[2] shadow-[0_0_8px_rgba(201,161,59,0.8)]"
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink/90 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest text-fog opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 border border-white/10 backdrop-blur shadow-xl z-10">
                      {r.name}
                    </div>
                  </div>
                ))}
              </div>
              <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.3em] text-fog/40">
                Vidarbha · Maharashtra (Interactive Map)
              </span>
            </div>
          </Reveal>

          {/* List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {initialReserves.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.06}>
                  <li className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 py-6 transition hover:pl-3">
                    <span className="font-display text-2xl text-fog md:text-3xl">
                      {r.name}
                    </span>
                    <span className="text-sm tracking-wide text-gold/80 sm:whitespace-nowrap">
                      {r.area}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
