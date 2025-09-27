"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const AboutSection = dynamic(() => import("./components/about-section"), { ssr: false });
const AchievementsSection = dynamic(() => import("./components/achievement-section"), { ssr: false });
const DataSightShowcase = dynamic(() => import("./components/datasight-section"), { ssr: false });
import DataSightHero from "./components/hero-section";
import NavigationMenu from "./components/ui/navigation-menu";
import ScrollProgress from "./components/ui/scroll-progress";
import PageLoader from "./components/ui/page-loader";
import { MobilePullToRefresh } from "./components/ui/mobile-interactions";
import MobileCtaBar from "./components/ui/mobile-cta-bar";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";

    // Simulate loading time for assets and initial setup
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(loadingTimer);
    };
  }, []);

  // Update current section using IntersectionObserver for robustness
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-scroll-id]')
    );
    if (targets.length === 0) return;

    let activeId = currentSection;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that is intersecting
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best) {
          const el = best.target as HTMLElement;
          const id = el.dataset.scrollId || el.id || activeId;
          if (id !== activeId) {
            activeId = id;
            setCurrentSection(id);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: [0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => observer.observe(el));

    // Initial tick: ensure the current section reflects what's in view
    // by simulating an observation pass
    const simulate = () => {
      let bestId = activeId;
      let bestRatio = 0;
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const height = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
        const visible = Math.max(0, Math.min(height, rect.height));
        const ratio = rect.height > 0 ? visible / rect.height : 0;
        const id = el.dataset.scrollId || el.id || '';
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      if (bestId && bestId !== activeId) {
        activeId = bestId;
        setCurrentSection(bestId);
      }
    };
    simulate();

    return () => observer.disconnect();
  }, []);

  // Fallback: simple top-based scroll spy (last section whose top is above mid viewport)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let targets: HTMLElement[] = [];
    const query = () => {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>('section[data-scroll-id]')
      );
    };
    const compute = () => {
      if (!targets.length) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const pivot = window.scrollY + vh * 0.5;
      let active = targets[0].dataset.scrollId || targets[0].id || 'hero';
      for (const el of targets) {
        const top = el.offsetTop;
        if (top <= pivot) {
          active = el.dataset.scrollId || el.id || active;
        } else {
          break;
        }
      }
      setCurrentSection(active);
    };
    const onScroll = () => {
      window.requestAnimationFrame(compute);
    };
    query();
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    window.addEventListener('load', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      window.removeEventListener('load', compute);
    };
  }, []);

  // Visual center-based scroll spy using getBoundingClientRect (respects transforms)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-scroll-id]')
    );
    if (!targets.length) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const center = (window.innerHeight || document.documentElement.clientHeight) / 2;
        let bestId = currentSection;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const el of targets) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const dist = Math.abs(sectionCenter - center);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = el.dataset.scrollId || el.id || bestId;
          }
        }
        if (bestId && bestId !== currentSection) setCurrentSection(bestId);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll as any);
    };
  }, [currentSection]);

  // Sync currentSection on explicit nav clicks and hash changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onNavEvent = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id;
      if (id) setCurrentSection(id);
    };
    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (id) setCurrentSection(id);
    };
    window.addEventListener('section:scrollto', onNavEvent as EventListener);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('section:scrollto', onNavEvent as EventListener);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLoader loading={isLoading}>
      <MobilePullToRefresh onRefresh={handleRefresh}>
        <ScrollProgress />
        <NavigationMenu currentSection={currentSection} />
        <MobileCtaBar />

        <main role="main">
          <section data-scroll-id="hero" id="hero" aria-labelledby="hero-title">
            <DataSightHero />
          </section>

          <section data-scroll-id="about" id="about" aria-labelledby="about-title" className="cv-auto">
            <AboutSection />
          </section>

          <section data-scroll-id="achievements" id="achievements" aria-labelledby="achievements-title" className="cv-auto">
            <AchievementsSection />
          </section>

          <section data-scroll-id="solutions" id="solutions" aria-labelledby="solutions-title" className="cv-auto">
            <DataSightShowcase />
          </section>
        </main>
      </MobilePullToRefresh>
    </PageLoader>
  );
}
