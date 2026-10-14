export const initOrderModal = () => {
  const orderButtons = document.querySelectorAll<HTMLElement>(
    "[data-order-button]",
  );

  const orderModal = document.querySelector<HTMLDialogElement>("#order-modal");

  const closeOrderModalButton = document.querySelector<HTMLElement>(
    ".order-modal__close",
  );

  const orderModalTitle =
    document.querySelector<HTMLElement>("#order-modal-title");

  const orderModalPrice =
    document.querySelector<HTMLElement>("#order-modal-price");

  const decreaseButton = document.querySelector<HTMLButtonElement>(
    "[data-quantity-decrease]",
  );

  const increaseButton = document.querySelector<HTMLButtonElement>(
    "[data-quantity-increase]",
  );

  const quantityOutput = document.querySelector<HTMLElement>(
    "[data-quantity-output]",
  );

  const totalOutput = document.querySelector<HTMLElement>("#order-modal-total");

  let quantity = 0;
  let currentPrice = 0;

  const updateOrderSummary = () => {
    if (quantityOutput) {
      quantityOutput.textContent = String(quantity);
    }

    if (totalOutput) {
      const total = currentPrice * quantity;
      totalOutput.textContent = `$${total.toFixed(2)}`;
    }

    if (decreaseButton) {
      decreaseButton.disabled = quantity === 1;
    }
  };

  orderButtons.forEach((orderButton) =>
    orderButton.addEventListener("click", () => {
      const product = orderButton.dataset.product;
      const price = Number(orderButton.dataset.price);

      if (!Number.isFinite(price)) {
        return;
      }

      currentPrice = price;
      quantity = 1;

      if (!orderModal || !product || !price) return;

      if (orderModalTitle) {
        orderModalTitle.textContent = `Order ${product}`;
      }

      if (orderModalPrice) {
        orderModalPrice.textContent = `$${price}`;
      }

      updateOrderSummary();
      orderModal?.showModal();
    }),
  );

  decreaseButton?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;

      updateOrderSummary();
    }
  });

  increaseButton?.addEventListener("click", () => {
    quantity += 1;

    updateOrderSummary();
  });

  closeOrderModalButton?.addEventListener("click", () => {
    orderModal?.close();
  });
};
