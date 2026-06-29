import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { FloatingOrbs } from "@/components/effects/FloatingOrbs";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";

export function PageLayout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen bg-ink text-foreground">
      <SmoothScroll />
      <CursorGlow />
      <FloatingOrbs />
      <SiteNav />
      <main className={`page-enter relative z-10 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
