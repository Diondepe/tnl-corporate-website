
/* =========================================
   SCROLL REVEAL — VERSION 1.1
========================================= */

@media (prefers-reduced-motion: no-preference) {

  @supports (animation-timeline: view()) {
    /* Reserved for future scroll-linked effects */
  }

  .pillars article,
  .focus-grid > div,
  .partner-card {
    animation: editorial-reveal 0.7s ease both;
    animation-play-state: paused;
  }

  .pillars article.is-visible,
  .focus-grid > div.is-visible,
  .partner-card.is-visible {
    animation-play-state: running;
  }

  @keyframes editorial-reveal {
    from {
      opacity: 0;
      translate: 0 15px;
    }

    to {
      opacity: 1;
      translate: 0 0;
    }
  }

}
