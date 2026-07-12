import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Leaf, Sun, Moon, Menu, X, Sparkles, Search, Home, ArrowRight, FileText, HelpCircle, ChevronLeft, ChevronRight, RotateCw, User } from "lucide-react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import psbsLogo from "@/assets/psbs_logo.png";

// Added "Home" page link at the beginning as requested
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Wildlife", href: "/wildlife" },
  { label: "Forests", href: "/forests" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Volunteer", href: "/volunteer" },
];

const homeLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Impact", href: "#impact" },
  { label: "Journal", href: "#journal" },
  { label: "Join", href: "#join" },
];

// Rich client-side search index for instant Google/YouTube style search effectiveness
interface SearchItem {
  title: string;
  category: "Pages" | "Wildlife" | "Projects" | "News";
  description: string;
  href: string;
}

const searchIndex: SearchItem[] = [
  // Pages
  { title: "Home Page", category: "Pages", description: "Main landing page, mission timeline, impact counters, forests map, and volunteer signups.", href: "/" },
  { title: "About Us", category: "Pages", description: "Our history, founders, values, partners, and team members.", href: "/about" },
  { title: "Wildlife Encyclopedia", category: "Pages", description: "Bengal Tiger, Great Indian Hornbill, Leopard, and other reserve inhabitants.", href: "/wildlife" },
  { title: "Forests & Geography", category: "Pages", description: "Maps and divisional profiles of Vidarbha's reserves.", href: "/forests" },
  { title: "Conservation Projects", category: "Pages", description: "Ongoing work: corridor restoration, community patrols, and wetland advocacy.", href: "/projects" },
  { title: "Field Journal & News", category: "Pages", description: "Latest news, animal sightings, and community updates.", href: "/news" },
  { title: "Photo & Video Gallery", category: "Pages", description: "Visual archives of field surveys, camera traps, and forest landscapes.", href: "/gallery" },
  { title: "Volunteer Portal", category: "Pages", description: "How to register, benefits of joining, activities, and FAQs.", href: "/volunteer" },
  { title: "Donate & Support", category: "Pages", description: "Support PSBS through secure options, custom tiers, and bank transfers.", href: "/donate" },
  { title: "Contact Us", category: "Pages", description: "Get in touch for volunteering, research collaborations, or support.", href: "/contact" },

  // Wildlife
  { title: "Bengal Tiger (Panthera tigris)", category: "Wildlife", description: "Endangered apex predator. 38+ individuals documented in corridors.", href: "/wildlife" },
  { title: "Great Indian Hornbill (Buceros bicornis)", category: "Wildlife", description: "Vulnerable canopy regenerator. 210+ individuals in Koka Sanctuary.", href: "/wildlife" },
  { title: "Indian Leopard (Panthera pardus)", category: "Wildlife", description: "Vulnerable adaptable carnivore. 22 individuals documented.", href: "/wildlife" },
  { title: "Spotted Deer / Chital (Axis axis)", category: "Wildlife", description: "Key prey species. 4,200+ individuals documented in censuses.", href: "/wildlife" },
  { title: "Sloth Bear (Melursus ursinus)", category: "Wildlife", description: "Vulnerable insectivore found across Bhandara forests.", href: "/wildlife" },
  { title: "Dhole / Wild Dog (Cuon alpinus)", category: "Wildlife", description: "Endangered pack hunter recently re-sighted.", href: "/wildlife" },
  { title: "Gosikhurd Wetlands Otter", category: "Wildlife", description: "Smooth-coated Otters documented in dam buffer zones.", href: "/wildlife" },

  // Projects
  { title: "Corridor Restoration Initiative", category: "Projects", description: "Replanting Navegaon-Nagzira corridor (47k trees planted).", href: "/projects" },
  { title: "Koka Hornbill Project", category: "Projects", description: "Monitoring 34 active nesting sites and installing nest boxes.", href: "/projects" },
  { title: "Gosikhurd Wetland Declaration", category: "Projects", description: "Lobbying for protected status of 189 km² area.", href: "/projects" },
  { title: "Village Conservation Patrol", category: "Projects", description: "Community-led de facto forest wardens in 132 villages.", href: "/projects" },
  { title: "School Forest Program", category: "Projects", description: "8,000 students tending native school forests.", href: "/projects" },

  // News
  { title: "Tracking Tigress N-7", category: "News", description: "Tigress N-7 returns with three cubs in Nagzira corridor.", href: "/news" },
  { title: "Mendha Village School Tree Planting", category: "News", description: "87 school children plant and adopt 1,200 saplings.", href: "/news" },
  { title: "Hornbill Nesting Success", category: "News", description: "Koka sanctuary records 14% rise in active hornbill nests.", href: "/news" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const { theme, toggle, isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouterState();
  const navigate = useNavigate();
  const isHome = router.location.pathname === "/";
  const searchInputRef = useRef<HTMLInputElement>(null);

  // iOS-inspired high-fidelity translucency that reacts to scroll
  const bg = useTransform(
    scrollY,
    [0, 120],
    [
      isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
      isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.75)",
    ]
  );

  const blur = useTransform(
    scrollY,
    [0, 120],
    ["blur(16px)", "blur(28px)"]
  );

  const shadow = useTransform(
    scrollY,
    [0, 120],
    [
      "0 4px 20px -2px rgba(0,0,0,0.05)",
      isDark ? "0 16px 40px -4px rgba(0,0,0,0.45)" : "0 16px 40px -4px rgba(0,0,0,0.08)",
    ]
  );

  const paddingY = useTransform(
    scrollY,
    [0, 120],
    ["16px", "10px"]
  );

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.onChange((v) => setIsScrolled(v > 50));
  }, [scrollY]);

  const overLightBg = !isDark && (isScrolled || !isHome);
  const borderClass = overLightBg ? "border-black/20" : "border-white/20 dark:border-white/10";
  const bgClass = overLightBg ? "bg-black/10" : "bg-white/10 dark:bg-white/[0.03]";
  const hoverBgClass = overLightBg ? "hover:bg-black/20" : "hover:bg-white/20 dark:hover:bg-white/10";

  const textColorAtTop = isHome ? "rgba(255, 255, 255, 0.95)" : (isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 30, 30, 0.95)");
  const textColorScrolled = isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 30, 30, 0.95)";

  const textColor = useTransform(
    scrollY,
    [0, 120],
    [textColorAtTop, textColorScrolled]
  );

  // Handle hotkeys (Cmd+K or Ctrl+K or '/' to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  // Filter search results
  const filteredResults = searchQuery.trim()
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleResultClick = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (href.startsWith("#")) {
      if (isHome) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate({ to: ("/" + href) as any });
      }
    } else {
      navigate({ to: href as any });
    }
  };

  return (
    <>
      {/* Master Unified Top Row (Desktop: Separate Buttons, Mobile: Unified Nav) */}
      <div className="fixed inset-x-0 top-3 md:top-5 z-[60] flex items-center justify-between md:justify-center px-2 md:px-2 w-full pointer-events-none gap-1 md:gap-2">
        
        {/* DESKTOP ONLY: 1st, 2nd, 3rd (Back, Next, Refresh) */}
        <div className="hidden md:flex items-center gap-2 shrink-0 pointer-events-auto">
          {/* Group Back & Next closer together */}
          <div className="flex items-center gap-1">
            {/* 1. Back */}
            <motion.button
              style={{ color: textColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() => window.history.back()}
              className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-gold ${hoverBgClass} transition-colors`}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            {/* 2. Next */}
            <motion.button
              style={{ color: textColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() => window.history.forward()}
              className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-gold ${hoverBgClass} transition-colors`}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
          
          {/* 3. Refresh */}
          <motion.button
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            onClick={() => window.location.reload()}
            className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-gold ${hoverBgClass} transition-colors`}
          >
            <RotateCw className="h-4.5 w-4.5" />
          </motion.button>
        </div>

        {/* 4. The Main Navbar (Logo + Links) */}
        <motion.header
          style={{
            backgroundColor: bg,
            backdropFilter: blur,
            boxShadow: shadow,
          }}
          className={`pointer-events-auto rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 flex items-center justify-between md:justify-center px-3 py-1.5 md:py-1.5 md:px-3 gap-3 transition-colors duration-500 w-full md:w-auto shrink-0`}
        >
          {/* Logo / Brand */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="relative grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-full border border-emerald/30 bg-white/5 transition group-hover:border-emerald/60 p-0.5 overflow-hidden">
              <img src={psbsLogo} alt="PSBS Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
              <span
                className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100"
                style={{ boxShadow: "var(--shadow-emerald)" }}
              />
            </span>
            <motion.span style={{ color: textColor }} className="leading-tight">
              <span className="block font-display text-base md:text-lg tracking-wide">
                PSBS
              </span>
              <span className="block text-[7px] md:text-[8px] uppercase tracking-[0.22em] opacity-60">
                Bhandara · India
              </span>
            </motion.span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-2 xl:gap-4 lg:flex pl-2 overflow-hidden">
            {pageLinks.map((l) => (
              <motion.div key={l.label} style={{ color: textColor }}>
                <Link
                  to={l.href as any}
                  className="relative text-[11px] lg:text-[12px] xl:text-[13px] tracking-wide opacity-80 transition hover:opacity-100 [&.active]:text-gold group flex items-center gap-1 xl:gap-1.5 whitespace-nowrap"
                >
                  {l.label === "Home" && <Home className="h-3 w-3 xl:h-3.5 xl:w-3.5 opacity-60" />}
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            {isHome &&
              homeLinks.map((l) => (
                <motion.div key={l.label} style={{ color: textColor }}>
                  <a
                    href={l.href}
                    className="relative text-[11px] lg:text-[12px] xl:text-[13px] tracking-wide opacity-60 transition hover:opacity-90 group whitespace-nowrap"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold/60 transition-all duration-300 group-hover:w-full" />
                  </a>
                </motion.div>
              ))}
          </nav>

          {/* MOBILE ONLY: Donate and Menu Button inside Navbar */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-black transition-all shadow-[0_0_15px_rgba(201,161,59,0.5)] border border-white/20"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FDB931 50%, #FFD700 100%)",
                backgroundSize: "200% auto",
                animation: "shimmer 6s linear infinite",
              }}
            >
              <Sparkles className="h-3 w-3" />
              Donate
            </Link>
            
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-md shadow-inner text-fog hover:text-gold ${hoverBgClass} transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {menuOpen ? (
                <X className="h-5 w-5 relative z-10" />
              ) : (
                <Menu className="h-5 w-5 relative z-10" />
              )}
            </button>
          </div>
        </motion.header>

        {/* DESKTOP ONLY: 5th, 6th, 7th (Search, Theme, Donate) */}
        <div className="hidden md:flex items-center gap-2 shrink-0 pointer-events-auto">
          {/* 5. Search */}
          <motion.button
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            onClick={() => setSearchOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-emerald transition-colors`}
          >
            <Search className="h-4.5 w-4.5" />
          </motion.button>

          {/* 6. Theme */}
          <motion.button
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            onClick={toggle}
            className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-gold ${hoverBgClass} transition-colors`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </motion.button>

          {/* Account Login */}
          <motion.div
            style={{ color: textColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 17 } }}
          >
            <Link
              to="/login"
              className={`grid h-10 w-10 place-items-center rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:text-emerald ${hoverBgClass} transition-colors`}
              aria-label="Account Login"
            >
              <User className="h-4.5 w-4.5" />
            </Link>
          </motion.div>

          {/* 7. Donate */}
          <Link
            to="/donate"
            className="flex items-center gap-1.5 rounded-full px-5 py-2.5 md:px-6 md:py-2.5 text-[13px] md:text-sm font-semibold text-black transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(201,161,59,0.4)] hover:shadow-[0_0_30px_rgba(201,161,59,0.7)] border border-white/20"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FDB931 50%, #FFD700 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 8s linear infinite",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Donate
          </Link>
        </div>
      </div>

      {/* MOBILE ONLY: Bottom Controls Dock */}
      <div className="md:hidden fixed inset-x-0 bottom-4 z-[60] flex items-center justify-center w-full pointer-events-none px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[320px] rounded-full border ${borderClass} ${bgClass} backdrop-blur-[64px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-1 transition-colors duration-500`}
        >
          {/* Back */}
          <motion.button style={{ color: textColor }} onClick={() => window.history.back()} className={`grid h-10 w-10 place-items-center rounded-full hover:text-gold ${hoverBgClass} transition-colors active:scale-90`}>
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          {/* Next */}
          <motion.button style={{ color: textColor }} onClick={() => window.history.forward()} className={`grid h-10 w-10 place-items-center rounded-full hover:text-gold ${hoverBgClass} transition-colors active:scale-90`}>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
          
          {/* Refresh */}
          <motion.button style={{ color: textColor }} onClick={() => window.location.reload()} className={`grid h-10 w-10 place-items-center rounded-full hover:text-gold ${hoverBgClass} transition-colors active:scale-90`}>
            <RotateCw className="h-4.5 w-4.5" />
          </motion.button>
          
          {/* Divider */}
          <div className={`h-6 w-[1px] mx-0.5 ${overLightBg ? 'bg-black/10' : 'bg-white/20'}`} />

          {/* Search */}
          <motion.button style={{ color: textColor }} onClick={() => setSearchOpen(true)} className={`grid h-10 w-10 place-items-center rounded-full hover:text-emerald ${hoverBgClass} transition-colors active:scale-90`}>
            <Search className="h-4.5 w-4.5" />
          </motion.button>
          
          {/* Theme */}
          <motion.button style={{ color: textColor }} onClick={toggle} className={`grid h-10 w-10 place-items-center rounded-full hover:text-emerald ${hoverBgClass} transition-colors active:scale-90`}>
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </motion.button>
          
          {/* User Login */}
          <Link to="/login" aria-label="Account Login">
            <motion.div style={{ color: textColor }} className={`grid h-10 w-10 place-items-center rounded-full hover:text-emerald ${hoverBgClass} transition-colors active:scale-90`}>
              <User className="h-4.5 w-4.5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* ── Search Modal Engine (Google/YouTube Inspired overlay) ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/90 dark:bg-ink/90 light:bg-canopy/90 backdrop-blur-2xl flex justify-center items-start pt-24 px-4 overflow-y-auto"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-2xl bg-canopy dark:bg-canopy light:bg-ink/80 border border-white/10 rounded-3xl p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-5 right-5 text-fog/40 hover:text-fog transition duration-300"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Input box */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Search className="h-5 w-5 text-gold" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forests, species, news and initiatives..."
                  className="w-full bg-transparent border-none outline-none text-fog text-lg placeholder:text-fog/30"
                />
              </div>

              {/* Suggestions / Results */}
              <div className="mt-6 max-h-96 overflow-y-auto custom-scrollbar">
                {searchQuery.trim() === "" ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-fog/40 font-medium mb-3">
                      Suggested Quick Pages
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {pageLinks.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => handleResultClick(p.href)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.02] text-left text-sm text-fog/80 hover:border-gold/30 hover:bg-gold/5 transition duration-300"
                        >
                          {p.label === "Home" ? <Home className="h-4 w-4 text-gold/80" /> : <FileText className="h-4 w-4 text-emerald" />}
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-gold/80 font-medium mb-1">
                      Search Results ({filteredResults.length})
                    </p>
                    <div className="space-y-2">
                      {filteredResults.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleResultClick(item.href)}
                          className="w-full flex items-start gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-gold/35 hover:bg-gold/5 text-left transition duration-300 group"
                        >
                          <div className="pt-0.5">
                            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border border-gold/30 text-gold/90 bg-gold/5">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-display text-lg text-fog group-hover:text-gold transition duration-300">
                              {item.title}
                            </h4>
                            <p className="text-xs text-fog/50 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="self-center text-fog/30 group-hover:text-gold transition duration-300">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <HelpCircle className="h-10 w-10 text-fog/30 mx-auto" />
                    <p className="text-sm text-fog/60">
                      No matching records found for "{searchQuery}"
                    </p>
                    <p className="text-xs text-fog/40 max-w-xs mx-auto leading-relaxed">
                      Try searching broader terms like "tiger", "planting", "horn", or check out suggested pages above.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-45 w-80 bg-canopy/95 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col pt-24 pb-8 px-8 shadow-2xl"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-fog/60 hover:text-fog transition-colors active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="text-[9px] uppercase tracking-[0.4em] text-gold/70 mb-4">
                Pages
              </div>
              <nav className="flex flex-col gap-1">
                {pageLinks.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      to={l.href as any}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-display text-2xl text-fog/85 transition hover:text-gold [&.active]:text-gold flex items-center gap-2"
                    >
                      {l.label === "Home" && <Home className="h-5 w-5 text-gold/60" />}
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {isHome && (
              <div className="mb-8">
                <div className="text-[9px] uppercase tracking-[0.4em] text-fog/40 mb-3">
                  On this page
                </div>
                {homeLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-fog/60 transition hover:text-fog"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3">
              <Link
                to="/donate"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-ink"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-full border border-white/15 py-3.5 text-sm text-fog/80 hover:border-gold/30"
              >
                Volunteer
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-ink/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>


    </>
  );
}
