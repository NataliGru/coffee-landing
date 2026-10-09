export const initFeedbackSlider = () => {
  const feedbackSlides =
    document.querySelectorAll<HTMLElement>(".feedback__card");

  const prevButton = document.querySelector<HTMLButtonElement>(
    ".feedback__slider__button--left",
  );

  const nextButton = document.querySelector<HTMLButtonElement>(
    ".feedback__slider__button--right",
  );

  let currentIndex = 0;

  const showSlide = (index: number) => {
    feedbackSlides.forEach((slide, i) => {
      const isActive = i === index;

      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);

      if (isActive) {
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
