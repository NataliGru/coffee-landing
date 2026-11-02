const getDialogById = (id: string | undefined) => {
  if (!id) return null;

  const element = document.getElementById(id);

  return element instanceof HTMLDialogElement ? element : null;
};

const isBackdropClick = (event: MouseEvent, dialog: HTMLDialogElement) => {
  const { top, right, bottom, left } = dialog.getBoundingClientRect();

  return (
    event.clientX < left ||
    event.clientX > right ||
    event.clientY < top ||
    event.clientY > bottom
  );
};

export const initModalControls = () => {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const openButton = target.closest<HTMLElement>("[data-modal-open]");

    if (openButton) {
      const modal = getDialogById(openButton.dataset.modalOpen);

      if (modal && !modal.open) {
        modal.showModal();
      }

      return;
    }

    const closeButton = target.closest<HTMLElement>("[data-modal-close]");

    if (closeButton) {
      closeButton.closest<HTMLDialogElement>("dialog")?.close();
      return;
    }

    if (
      target instanceof HTMLDialogElement &&
      event instanceof MouseEvent &&
      isBackdropClick(event, target)
    ) {
      target.close();
    }
  });
};
