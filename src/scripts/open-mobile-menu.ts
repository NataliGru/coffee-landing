export const initOpenMobileMenu = () => {
  const toggleMenuButton =
    document.querySelector<HTMLElement>("[data-nav-toggle]");

  const mobileMenu = document.querySelector<HTMLElement>("#nav-menu");

  const toggleMenu = (isOpen: boolean) => {
    toggleMenuButton?.setAttribute("aria-expanded", String(isOpen));
    toggleMenuButton?.setAttribute(
      "arial-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    mobileMenu?.classList.toggle("is-open", isOpen);
  };

  toggleMenuButton?.addEventListener("click", () => {
    const isOpen = toggleMenuButton.getAttribute("aria-expanded") === "true";
    toggleMenu(!isOpen);
  });

  mobileMenu?.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element && target.closest("a")) {
      toggleMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleMenu(false);
    }
  });
};
