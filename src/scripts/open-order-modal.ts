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

  const sizeInputs = document.querySelectorAll<HTMLInputElement>(
    "input[name=coffee-size]",
  );

  const defaultSize = document.querySelector<HTMLInputElement>(
    'input[name="coffee-size"][value="small"]',
  );

  const getPriceModifier = () => {
    const selectedPrice = document.querySelector<HTMLInputElement>(
      "input[name=coffee-size]:checked",
    );

    const modifier = Number(selectedPrice?.dataset.priceModifier);

    return Number.isFinite(modifier) ? modifier : 0;
  };

  const decreaseButton = document.querySelector<HTMLButtonElement>(
    "[data-quantity-decrease]",
  );

  const increaseButton = document.querySelector<HTMLButtonElement>(
    "[data-quantity-increase]",
  );

  const quantityInput =
    document.querySelector<HTMLInputElement>("#order-quantity");

  const totalOutput = document.querySelector<HTMLElement>("#order-modal-total");

  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 10;

  let currentPrice = 0;

  const normalizeQuantity = (value: number) => {
    if (!Number.isFinite(value)) return MIN_QUANTITY;

    return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
  };

  const updateOrderSummary = (quantity: number) => {
    const normalizedQuantity = normalizeQuantity(quantity);
    const sizeModifier = getPriceModifier();

    const unitPrice = currentPrice + sizeModifier;

    const total = unitPrice * normalizedQuantity;

    if (quantityInput) {
      quantityInput.value = String(normalizedQuantity);
    }

    if (totalOutput) {
      totalOutput.textContent = `$${total.toFixed(2)}`;
    }

    if (orderModalPrice) {
      orderModalPrice.textContent = `$${unitPrice.toFixed(2)}`;
    }

    if (decreaseButton) {
      decreaseButton.disabled = normalizedQuantity === MIN_QUANTITY;
    }

    if (increaseButton) {
      increaseButton.disabled = normalizedQuantity >= MAX_QUANTITY;
    }
  };

  sizeInputs.forEach((sizeInput) => {
    sizeInput.addEventListener("change", () => {
      const quantity = Number(quantityInput?.value);

      updateOrderSummary(quantity);
    });
  });

  orderButtons.forEach((orderButton) =>
    orderButton.addEventListener("click", () => {
      const product = orderButton.dataset.product;
      const price = Number(orderButton.dataset.price);

      if (!Number.isFinite(price)) {
        return;
      }

      currentPrice = price;

      if (!orderModal || !product || !price) return;

      if (orderModalTitle) {
        orderModalTitle.textContent = `Order ${product}`;
      }

      if (defaultSize) {
        defaultSize.checked = true;
      }

      updateOrderSummary(MIN_QUANTITY);
      orderModal?.showModal();
    }),
  );

  decreaseButton?.addEventListener("click", () => {
    const quantity = Number(quantityInput?.value);

    updateOrderSummary(quantity - 1);
  });

  increaseButton?.addEventListener("click", () => {
    const quantity = Number(quantityInput?.value);

    updateOrderSummary(quantity + 1);
  });

  quantityInput?.addEventListener("input", () => {
    const quantity = Number(quantityInput.value);

    if (Number.isFinite(quantity)) {
      updateOrderSummary(quantity);
    }
  });

  quantityInput?.addEventListener("change", () => {
    updateOrderSummary(Number(quantityInput.value));
  });

  closeOrderModalButton?.addEventListener("click", () => {
    orderModal?.close();
  });
};
