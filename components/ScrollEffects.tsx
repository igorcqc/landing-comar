"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";
import { trackMetaEvent } from "@/lib/meta";

export default function ScrollEffects() {
  useEffect(() => {
    captureUtmParams();

    const header = document.getElementById("header");
    const onScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealEls = document.querySelectorAll(".reveal");
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    let viewContentFired = false;
    const milestoneEls = ["projetos", "depoimentos"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    let milestoneIo: IntersectionObserver | undefined;
    if (milestoneEls.length && "IntersectionObserver" in window) {
      milestoneIo = new IntersectionObserver(
        (entries) => {
          if (viewContentFired) return;
          const hit = entries.find((entry) => entry.isIntersecting);
          if (hit) {
            viewContentFired = true;
            trackMetaEvent("ViewContent", { content_name: hit.target.id });
            milestoneIo?.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      milestoneEls.forEach((el) => milestoneIo?.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      milestoneIo?.disconnect();
    };
  }, []);

  return null;
}
