(() => {
  const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
  const scrollButtons = Array.from(document.querySelectorAll("[data-scroll]"));
  const searchInput = document.getElementById("moduleSearch");
  const panels = Array.from(document.querySelectorAll(".panel"));
  const sections = Array.from(document.querySelectorAll("[data-section]"));

  function safeQuery(selector) {
    if (!selector) return null;
    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  }

  function normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function setActiveNavBySelector(selector) {
    navButtons.forEach((btn) => {
      const isActive = btn.dataset.scroll === selector;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function updateHash(selector) {
    if (!selector || !history.replaceState) return;
    history.replaceState(null, "", selector);
  }

  function scrollToTarget(selector, shouldUpdateHash = true) {
    const target = safeQuery(selector);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveNavBySelector(selector);

    if (shouldUpdateHash) {
      updateHash(selector);
    }
  }

  function bindScrollButtons() {
    scrollButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        scrollToTarget(btn.dataset.scroll);
      });
    });
  }

  function applySearchFilter(query) {
    const normalizedQuery = normalizeText(query);

    navButtons.forEach((btn) => {
      const searchableText = normalizeText(
        `${btn.dataset.tags || ""} ${btn.textContent || ""}`
      );
      const isVisible =
        normalizedQuery === "" || searchableText.includes(normalizedQuery);

      btn.classList.toggle("hidden", !isVisible);
    });
  }

  function bindSearch() {
    if (!searchInput) return;

    searchInput.setAttribute("aria-label", "Filtrar modulos o conceptos");
    searchInput.setAttribute("autocomplete", "off");

    searchInput.addEventListener("input", (event) => {
      applySearchFilter(event.target.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        searchInput.value = "";
        applySearchFilter("");
        searchInput.blur();
      }
    });
  }

  function revealPanelsOnLoad() {
    panels.forEach((panel, index) => {
      panel.style.opacity = "0";
      panel.style.transform = "translateY(10px)";

      setTimeout(() => {
        panel.style.transition = "opacity .45s ease, transform .45s ease";
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
      }, 35 * index);
    });
  }

  function bindSectionObserver() {
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        setActiveNavBySelector(`#${visibleEntries[0].target.id}`);
      },
      {
        root: null,
        rootMargin: "-18% 0px -60% 0px",
        threshold: [0.02, 0.15, 0.35],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initAria() {
    navButtons.forEach((btn) => {
      btn.setAttribute("aria-current", "false");
    });
  }

  function initDeepLink() {
    const hash = window.location.hash;

    if (!hash) {
      const firstVisibleNav = navButtons.find(
        (btn) => !btn.classList.contains("hidden")
      );
      if (firstVisibleNav) setActiveNavBySelector(firstVisibleNav.dataset.scroll);
      return;
    }

    if (!safeQuery(hash)) return;

    setTimeout(() => {
      scrollToTarget(hash, false);
    }, 120);
  }

  function initKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable);

      if (isTyping) return;

      if (event.key === "/") {
        event.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }

  function initHashChangeSupport() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (!safeQuery(hash)) return;
      scrollToTarget(hash, false);
    });
  }

  function init() {
    initAria();
    bindScrollButtons();
    bindSearch();
    bindSectionObserver();
    initDeepLink();
    initKeyboardShortcuts();
    initHashChangeSupport();
    revealPanelsOnLoad();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
