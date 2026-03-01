"use client";

import { useTransitionRouter } from "next-view-transitions";

const TRANSITION_DURATION = 1000;
const TRANSITION_EASING = "cubic-bezier(0.87, 0, 0.13, 1)";

function animatePageTransition() {
  /* outgoing page: fade up and out */
  document.documentElement.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0.2, transform: "translateY(-35%)" },
    ],
    {
      duration: TRANSITION_DURATION,
      easing: TRANSITION_EASING,
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  /* incoming page: clip-reveal from bottom */
  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        transform: "translateY(25%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        transform: "translateY(0%)",
      },
    ],
    {
      duration: TRANSITION_DURATION,
      easing: TRANSITION_EASING,
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

export const useViewTransition = () => {
  const router = useTransitionRouter();

  const navigateWithTransition = (href, options = {}) => {
    const currentPath = window.location.pathname;
    if (currentPath === href) return;

    window.__viewTransitioning = true;

    // Safety timeout: clear flag if transition stalls or is aborted
    const safetyTimer = setTimeout(() => {
      window.__viewTransitioning = false;
    }, 4000);

    router.push(href, {
      onTransitionReady: () => {
        clearTimeout(safetyTimer);
        try {
          animatePageTransition();
        } catch {
          // Silently handle animation failures
        }
      },
      ...options,
    });
  };

  return { navigateWithTransition, router };
};
