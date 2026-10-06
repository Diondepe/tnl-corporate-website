
/* ==================================================
   THE NARRATIVE LENS LTD
   Corporate Website — Version 1.4

   Mobile Navigation
   Active Navigation
   Scroll Reveal
   Cinematic Lens
   Copyright Year
================================================== */

(function () {
  "use strict";

  function init() {

    /* ------------------------------------------
       1. MOBILE NAVIGATION
    ------------------------------------------ */

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

      function closeMenu() {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "\u2630";
      }

      function openMenu() {
        nav.classList.add("open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation");
        menuButton.textContent = "\u2715";
      }

      menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (nav.classList.contains("open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("click", function (event) {
        if (
          nav.classList.contains("open") &&
          !nav.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          closeMenu();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeMenu();
          menuButton.focus();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 700) {
          closeMenu();
        }
      });

      closeMenu();
    }

    /* ------------------------------------------
       2. ACTIVE NAVIGATION
    ------------------------------------------ */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    function updateActiveNav() {
      if (!sections.length || !navLinks.length) return;

      let currentSection = "home";
      const position = window.scrollY + 160;

      sections.forEach(function (section) {
        if (section.offsetTop <= position) {
          currentSection = section.id;
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        currentSection = "contact";
      }

      navLinks.forEach(function (link) {
        const active =
          link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("scroll", updateActiveNav, {
      passive: true
    });

    window.addEventListener("resize", updateActiveNav);

    updateActiveNav();

    /* ------------------------------------------
       3. SCROLL REVEAL
    ------------------------------------------ */

    const revealItems = document.querySelectorAll(
      ".pillars article, .focus-grid > div, .partner-card"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!reducedMotion.matches && "IntersectionObserver" in window) {

      const observer = new IntersectionObserver(
        function (entries, observerInstance) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -20px 0px"
        }
      );

      revealItems.forEach(function (item) {
        observer.observe(item);
      });

    } else {

      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });

    }

    /* ------------------------------------------
       4. CINEMATIC LENS INTERACTION
    ------------------------------------------ */

    const hero = document.querySelector(".cinematic-hero");
    const lens = document.querySelector(".cinematic-lens");

    const desktopPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (
      hero &&
      lens &&
      desktopPointer.matches &&
      !reducedMotion.matches
    ) {

      hero.addEventListener("pointermove", function (event) {
        const bounds = hero.getBoundingClientRect();

        if (!bounds.width || !bounds.height) return;

        const x =
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;

        const y =
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;

        lens.style.transform =
          "translate(calc(-50% + " + x + "px), " +
          "calc(-50% + " + y + "px))";
      });

      hero.addEventListener("pointerleave", function () {
        lens.style.transform = "translate(-50%, -50%)";
      });

    }

    /* ------------------------------------------
       5. COPYRIGHT YEAR
    ------------------------------------------ */

    const year = document.getElementById("year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

  }

  /* ------------------------------------------
     SAFE INITIALISATION
  ------------------------------------------ */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }

})();
