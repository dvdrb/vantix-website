"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "../utils/smooth-scroll";

export default function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      try {
        history.scrollRestoration = "manual";
      } catch {}
    }

    const headerEl = document.querySelector("header") as HTMLElement | null;
    const offset = headerEl?.offsetHeight || 0;

    // If page loads with a hash, jump instantly to corrected offset (no animation)
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.substring(1));
      const el = document.getElementById(id) || document.querySelector(`[data-scroll-id="${id}"]`);
      if (el) {
        const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo(0, y);
      }
    }

    // Intercept in-page anchor clicks for consistent smooth scrolling
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const id = decodeURIComponent(href.replace(/^#/, ""));
      if (!id) return;

      e.preventDefault();
      const header = document.querySelector("header") as HTMLElement | null;
      smoothScrollTo(id, header?.offsetHeight || 0);
      // Optionally keep URL hash without triggering default jump
      history.replaceState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

