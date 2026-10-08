export const initRevealAnimations = () => {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );

  elements.forEach((el) => observer.observe(el));
};
