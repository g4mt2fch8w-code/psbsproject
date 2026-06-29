# PSBS Website — Setup Guide

## ✅ Bun is Already Installed

Bun is already installed on your machine (`~/.bun` detected). If for any reason it's missing, install it with:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then restart your terminal or run:

```bash
source ~/.zshrc
```

---

## 🚀 Running the Development Server

```bash
cd /path/to/this-project
bun install
bun dev
```

The site will be available at **http://localhost:3000**

---

## 📦 Building for Production

```bash
bun run build
bun run preview
```

---

## 🌙 Light / Dark Mode

- A **Sun/Moon toggle button** is in the top-right of the navbar.
- Default: **Dark mode**.
- Your preference is saved in `localStorage` and persists across sessions.

---

## 🗺️ Available Pages

| URL          | Page                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `/`          | Home (Hero, Mission, Timeline, Impact, Wildlife, Forests, Charts, Testimonials, Journal, Partners, Join) |
| `/about`     | About PSBS — Story, Vision, Values, Team                                                                 |
| `/wildlife`  | Wildlife — Species Encyclopedia, Monitoring                                                              |
| `/forests`   | Forests — 6 Landscapes of Vidarbha                                                                       |
| `/projects`  | Conservation Projects + Progress                                                                         |
| `/news`      | News & Field Journal                                                                                     |
| `/gallery`   | Photo Gallery + Lightbox                                                                                 |
| `/volunteer` | Volunteer Hub + Registration Form                                                                        |
| `/donate`    | Donate + Transparency Report                                                                             |
| `/contact`   | Contact Form + Info                                                                                      |

### Legacy redirects (auto-redirect to new paths):

- `/wildlife-t` → `/wildlife`
- `/news-t` → `/news`
- `/volunteer-t` → `/volunteer`
- `/project-t` → `/projects`

---

## 🛠️ Tech Stack

- **Framework**: TanStack Start (React SSR)
- **Styling**: Tailwind CSS v4 with custom PSBS design tokens
- **Animation**: Framer Motion + GSAP + Lenis smooth scroll
- **3D**: React Three Fiber (hero particle field)
- **Icons**: Lucide React
- **Package manager**: Bun

---

## 📁 Key Files

```
src/
  hooks/useTheme.ts         — Light/dark mode logic
  styles.css                — Design tokens + light/dark palettes
  routes/
    __root.tsx              — Root layout + theme flash prevention
    index.tsx               — Home page
    about.tsx               — About page
    wildlife.tsx            — Wildlife page
    forests.tsx             — Forests page
    projects.tsx            — Projects page
    news.tsx                — News page
    gallery.tsx             — Gallery page
    volunteer.tsx           — Volunteer page
    donate.tsx              — Donate page
    contact.tsx             — Contact page
  components/
    site/
      Nav.tsx               — Navigation with theme toggle + mobile menu
      Timeline.tsx          — PSBS milestone timeline
      Testimonials.tsx      — Volunteer/community quotes
      Partners.tsx          — Partner logos marquee
    effects/
      CursorGlow.tsx        — Gold cursor glow
      Fireflies.tsx         — Canvas firefly particles
      ForestScene.tsx       — 3D particle field
      Reveal.tsx            — Scroll reveal animation
      SmoothScroll.tsx      — Lenis smooth scroll
```
