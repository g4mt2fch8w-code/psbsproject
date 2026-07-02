import { Link, useRouterState } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Sparkles, Leaf, Menu, X, Search, ChevronLeft, ChevronRight, RotateCw, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Wildlife", to: "/wildlife" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "News", to: "/news" as const },
  { label: "Volunteer", to: "/volunteer" as const },
  { label: "Donate", to: "/donate" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggle, isDark } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const bg = useTransform(
    scrollY,
    [0, 160],
    ["color-mix(in oklab, var(--ink) 0%, transparent)", "var(--nav-bg-scroll)"],
  );
  const blur = useTransform(scrollY, [0, 160], ["blur(0px)", "blur(16px)"]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0, 0.06]);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: bg,
          backdropFilter: blur,
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(255,255,255,${v})`,
          ),
        }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 md:px-12">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 dark:border-emerald/30 bg-black/5 dark:bg-canopy/60">
              <Leaf className="h-5 w-5 text-emerald" />
              <span
                className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100"
                style={{ boxShadow: "var(--shadow-emerald)" }}
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-wide text-fog">
                PSBS
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Bhandara · India
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`story-link text-sm tracking-wide transition hover:text-fog ${
                  pathname === l.to ? "text-gold" : "text-fog/75"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/volunteer"
              className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink transition sm:inline-flex"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <Sparkles className="h-4 w-4" />
              Join Mission
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 dark:border-white/10 text-fog lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100%,320px)] flex-col border-l border-black/10 dark:border-white/[0.08] bg-ink/95 p-6 backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-fog">Navigate</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/10 dark:border-white/10 text-fog"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-lg transition hover:bg-black/5 dark:hover:bg-white/[0.05] ${
                        pathname === l.to ? "text-gold" : "text-fog/85"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/volunteer"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Sparkles className="h-4 w-4" />
                Join Mission
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE ONLY: Bottom Controls Dock */}
      <div className="md:hidden fixed inset-x-0 bottom-4 z-[60] flex items-center justify-center w-full pointer-events-none px-4">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 200, delay: 0.1 }}
          className="pointer-events-auto flex items-center justify-between w-full max-w-[320px] rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/[0.03] backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-1 text-fog"
        >
          {/* Back */}
          <button onClick={() => window.history.back()} className="grid h-10 w-10 place-items-center rounded-full hover:text-gold hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Next */}
          <button onClick={() => window.history.forward()} className="grid h-10 w-10 place-items-center rounded-full hover:text-gold hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Refresh */}
          <button onClick={() => window.location.reload()} className="grid h-10 w-10 place-items-center rounded-full hover:text-gold hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            <RotateCw className="h-4.5 w-4.5" />
          </button>
          
          {/* Divider */}
          <div className="h-6 w-[1px] bg-black/10 dark:bg-white/20 mx-0.5" />

          {/* Search */}
          <button onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full hover:text-emerald hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            <Search className="h-4.5 w-4.5" />
          </button>
          
          {/* Theme */}
          <button onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full hover:text-emerald hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        </motion.div>
      </div>
    </>
  );
}
