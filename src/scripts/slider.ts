export const initFeedbackSlider = () => {
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const feedbackSlides =
    document.querySelectorAll<HTMLElement>(".feedback__card");

  const prevButton = document.querySelector<HTMLButtonElement>(
    ".feedback__slider__button--left",
  );

  const nextButton = document.querySelector<HTMLButtonElement>(
    ".feedback__slider__button--right",
  );

  const status = document.querySelector<HTMLElement>("#feedback-status");

  let currentIndex = 0;

  const showSlide = (index: number) => {
    feedbackSlides.forEach((slide, i) => {
      const isActive = i === index;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));

      if (isActive && !reducedMotionQuery) {
        slide.animate(
          [
            { opacity: 0, transform: "translateX(12px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          {
            duration: 350,
            easing: "ease-out",
          },
        );
      }
    });

    if (status) {
      const activeSlide = feedbackSlides[index];
      const customerName = activeSlide
        .querySelector<HTMLElement>(".feedback__card__name")
        ?.textContent?.trim();

      status.textContent = `Feedback ${index + 1} of ${
        feedbackSlides.length
      }${customerName ? `, by ${customerName}` : ""}`;
    }
  };

  prevButton?.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + feedbackSlides.length) % feedbackSlides.length;

    showSlide(currentIndex);
  });

  nextButton?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % feedbackSlides.length;

    showSlide(currentIndex);
  });
};
