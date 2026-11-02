import { MAX_QUANTITY, MIN_QUANTITY } from "./constants";
import type { OrderSummary } from "./order-calculations";

export const createOrderModalView = () => {
  const modal = document.querySelector<HTMLDialogElement>("#order-modal");
  const form = modal?.querySelector<HTMLFormElement>(".order-modal__form");

  if (!modal || !form) return null;

  const orderButtons = document.querySelectorAll<HTMLElement>(
    "[data-order-button]",
  );
  const title = form.querySelector<HTMLElement>("#order-modal-title");

  const priceOutput = form.querySelector<HTMLElement>("#order-modal-price");

  const totalOutput = form.querySelector<HTMLElement>("#order-modal-total");

  const quantityInput = form.querySelector<HTMLInputElement>("#order-quantity");

  const quantityHint = form.querySelector<HTMLElement>("#quantity-hint");

  const decreaseButton = form.querySelector<HTMLButtonElement>(
    "[data-quantity-decrease]",
  );

  const increaseButton = form.querySelector<HTMLButtonElement>(
    "[data-quantity-increase]",
  );

  const submitButton =
    form.querySelector<HTMLButtonElement>("[data-add-to-cart]");

  const limitMessage = form.querySelector<HTMLElement>(
    "[data-order-limit-message]",
  );

  const sizeInputs = form.querySelectorAll<HTMLInputElement>(
    'input[name="coffee-size"]',
  );

  const defaultSize = form.querySelector<HTMLInputElement>(
    'input[name="coffee-size"][value="small"]',
  );

  const getSelectedSize = () => {
    const input = form.querySelector<HTMLInputElement>(
      'input[name="coffee-size"]:checked',
    );

    const priceModifier = Number(input?.dataset.priceModifier);

    return {
      value: input?.value,
      priceModifier: Number.isFinite(priceModifier) ? priceModifier : 0,
    };
  };

  const getQuantity = () => Number(quantityInput?.value);

  const resetSize = () => {
    if (defaultSize) defaultSize.checked = true;
  };

  const renderSummary = (summary: OrderSummary) => {
    if (quantityInput) {
      quantityInput.value = String(summary.quantity);

      quantityInput.max = String(
        Math.max(summary.availableQuantity, MIN_QUANTITY),
      );

      quantityInput.disabled = summary.isAtLimit;
    }

    if (priceOutput) {
      priceOutput.textContent = `$${summary.unitPrice.toFixed(2)}`;
    }

    if (totalOutput) {
      totalOutput.textContent = `$${summary.totalPrice.toFixed(2)}`;
    }

    if (decreaseButton) {
      decreaseButton.disabled =
        summary.isAtLimit || summary.quantity === MIN_QUANTITY;
    }

    if (increaseButton) {
      increaseButton.disabled =
        summary.isAtLimit || summary.quantity >= summary.availableQuantity;
    }

    if (submitButton) {
      submitButton.disabled = summary.isAtLimit;
    }

    if (limitMessage) {
      limitMessage.hidden = !summary.isAtLimit;

      limitMessage.textContent = summary.isAtLimit
        ? "Sorry, you can add no more than 10 drinks of the same type and size. Please choose another size."
        : "";
    }

    if (quantityHint) {
      quantityHint.textContent =
        summary.availableQuantity < MAX_QUANTITY && !summary.isAtLimit
          ? `You can add ${summary.availableQuantity} more of this drink and size.`
          : "Maximum 10 drinks of the same type and size.";
    }
  };

  const setTitle = (productName: string) => {
    if (title) title.textContent = `Order ${productName}`;
  };

  return {
    form,
    orderButtons,
    sizeInputs,
    decreaseButton,
    increaseButton,
    quantityInput,
    getSelectedSize,
    getQuantity,
    resetSize,
    renderSummary,
    setTitle,
    open: () => modal.showModal(),
    close: () => modal.close(),
  };
};
