import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";
import tigerImg from "@/assets/tiger.jpg";
import hornbillImg from "@/assets/hornbill.jpg";
import deerImg from "@/assets/deer.jpg";
import leopardImg from "@/assets/leopard.jpg";
import canopyImg from "@/assets/canopy.jpg";
import heroImg from "@/assets/hero-forest.jpg";
import plantingImg from "@/assets/planting.jpg";
import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: "Photo Gallery — Wildlife & Field Work · PSBS" }],
  }),
  component: GalleryPage,
});

interface GalleryItem {
  src: string;
  tag: string;
  caption: string;
  span: number;
}

const images: GalleryItem[] = [
  {
    src: tigerImg,
    tag: "Wildlife",
    caption: "Bengal Tiger, Navegaon Reserve",
    span: 1,
  },
  {
    src: hornbillImg,
    tag: "Wildlife",
    caption: "Indian Hornbill, Koka Sanctuary",
    span: 1,
  },
  {
    src: canopyImg,
    tag: "Forests",
    caption: "Forest canopy, Vidarbha",
    span: 2,
  },
  { src: deerImg, tag: "Wildlife", caption: "Spotted Deer, Nagzira", span: 1 },
  {
    src: leopardImg,
    tag: "Wildlife",
    caption: "Indian Leopard, Bramhapuri",
    span: 1,
  },
  { src: heroImg, tag: "Forests", caption: "Misty forest at sunrise", span: 2 },
  {
    src: plantingImg,
    tag: "Field Work",
    caption: "Tree plantation drive",
    span: 1,
  },
  {
    src: j1,
    tag: "Wildlife",
    caption: "Camera trap capture, Nagzira",
    span: 1,
  },
  { src: j2, tag: "Community", caption: "School plantation, Mendha", span: 1 },
  { src: j3, tag: "Research", caption: "Hornbill census survey", span: 1 },
];

const notes = [
  {
    title: "Every image is a data point.",
    body: "Our field photographers are trained naturalists. Each photograph is geotagged, species-verified, and archived in PSBS's longitudinal biodiversity database.",
  },
  {
    title: "Camera traps never sleep.",
    body: "96 camera trap units run 24/7 across Navegaon, Nagzira, Tadoba and Koka — capturing baseline data on movement, population and corridor health.",
  },
  {
    title: "You can contribute.",
    body: "Amateur naturalists are welcome on our field surveys. Join a season-long bird census or a weekend camera-trap deployment. Register as a volunteer.",
  },
];

function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Field Photography
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-fog leading-none mb-6">
            Seen through the{" "}
            <em className="text-gold-gradient not-italic">lens.</em>
          </h1>
          <p className="max-w-2xl mx-auto text-fog/60 text-lg leading-relaxed">
            Every image here is a field note — a moment of observation from a
            PSBS researcher, volunteer or camera trap. Wildlife does not pose.
            We wait.
          </p>
        </Reveal>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gridAutoRows: "200px",
              gap: "12px",
            }}
          >
            {images.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  gridColumn: `span ${item.span}`,
                  gridRow: `span ${item.span}`,
                }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => setSelectedImg(item)}
              >
                <motion.img
                  src={item.src}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Tag */}
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-gold/80 border border-gold/30 rounded-full px-2 py-0.5 bg-ink/60 backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <p className="text-xs text-fog/80 mt-1 truncate">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Field Notes ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {notes.map((n, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg text-fog mb-3">
                  {n.title}
                </h3>
                <p className="text-sm text-fog/60 leading-relaxed">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.caption}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase tracking-widest text-gold/80 border border-gold/30 rounded-full px-2 py-0.5 bg-ink/60 backdrop-blur-sm">
                  {selectedImg.tag}
                </span>
                <p className="text-xs text-fog/70 mt-1">
                  {selectedImg.caption}
                </p>
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-ink border border-white/20 flex items-center justify-center text-fog hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
    </>
  );
}
