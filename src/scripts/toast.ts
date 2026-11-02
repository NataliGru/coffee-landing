const TOAST_DURATION = 5000;

type ToastOptions = {
  title: string;
  message: string;
  action?: {
    label: string;
    modalId: string;
  };
};

let toast: HTMLElement | null = null;
let toastTitle: HTMLElement | null = null;
let toastMessage: HTMLElement | null = null;
let actionButton: HTMLButtonElement | null = null;
let progressBar: HTMLElement | null = null;
let toastTimeout: number | undefined;
let progressAnimation: Animation | undefined;

const hideToast = () => {
  window.clearTimeout(toastTimeout);
  progressAnimation?.cancel();
  toast?.classList.remove("order-toast--visible");
};

export const initToast = () => {
  toast = document.querySelector<HTMLElement>("#order-toast");

  if (!toast) return;

  toastTitle = toast.querySelector<HTMLElement>("[data-toast-title]");
  toastMessage = toast.querySelector<HTMLElement>("[data-toast-message]");
  actionButton = toast.querySelector<HTMLButtonElement>("[data-toast-action]");
  progressBar = toast.querySelector<HTMLElement>("[data-toast-progress]");

  toast
    .querySelector<HTMLButtonElement>("[data-toast-close]")
    ?.addEventListener("click", hideToast);

  actionButton?.addEventListener("click", hideToast);
};

export const showToast = ({ title, message, action }: ToastOptions) => {
  if (!toast || !toastTitle || !toastMessage || !actionButton || !progressBar) {
    return;
  }

  window.clearTimeout(toastTimeout);
  progressAnimation?.cancel();

  toastTitle.textContent = title;
  toastMessage.textContent = message;
  actionButton.hidden = !action;

  if (action) {
    actionButton.textContent = action.label;
    actionButton.dataset.modalOpen = action.modalId;
  } else {
    delete actionButton.dataset.modalOpen;
  }

  toast.classList.add("order-toast--visible");

  progressAnimation = progressBar.animate(
    [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
    {
      duration: TOAST_DURATION,
      easing: "linear",
      fill: "forwards",
    },
  );

  toastTimeout = window.setTimeout(hideToast, TOAST_DURATION);
};
