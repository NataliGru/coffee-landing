import {
  addCartItem,
  getCartItemQuantity,
  type CoffeeSize,
} from "./cart-store";
import { MIN_QUANTITY } from "./constants";
import { calculateOrderSummary } from "./order-calculations";
import { createOrderModalView } from "./order-modal-view";
import { getProduct } from "./products";
import { showToast } from "./toast";

const isCoffeeSize = (value: string | undefined): value is CoffeeSize => {
  return value === "small" || value === "medium" || value === "large";
};

export const initOrderModal = () => {
  const view = createOrderModalView();

  if (!view) return;

  let currentProduct = "";
  let currentBasePrice = 0;

  const getSummary = (requestedQuantity: number) => {
    const selectedSize = view.getSelectedSize();

    const itemId = `${currentProduct}-${selectedSize.value}`;

    return calculateOrderSummary({
      basePrice: currentBasePrice,
      priceModifier: selectedSize.priceModifier,
      requestedQuantity,
      quantityInCart: currentProduct ? getCartItemQuantity(itemId) : 0,
    });
  };

  const updateSummary = (requestedQuantity: number) => {
    view.renderSummary(getSummary(requestedQuantity));
  };

  view.sizeInputs.forEach((sizeInput) => {
    sizeInput.addEventListener("change", () => {
      updateSummary(view.getQuantity());
    });
  });

  view.orderButtons.forEach((orderButton) => {
    orderButton.addEventListener("click", () => {
      const product = getProduct(orderButton.dataset.productId);

      if (!product) return;

      currentProduct = product.name;
      currentBasePrice = product.basePrice;

      view.setTitle(product.name);
      view.resetSize();

      updateSummary(MIN_QUANTITY);

      view.open();
    });
  });

  view.decreaseButton?.addEventListener("click", () => {
    updateSummary(view.getQuantity() - 1);
  });

  view.increaseButton?.addEventListener("click", () => {
    updateSummary(view.getQuantity() + 1);
  });

  view.quantityInput?.addEventListener("input", () => {
    const quantity = view.getQuantity();

    if (Number.isFinite(quantity)) {
      updateSummary(quantity);
    }
  });

  view.quantityInput?.addEventListener("change", () => {
    updateSummary(view.getQuantity());
  });

  view.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedSize = view.getSelectedSize();

    if (!currentProduct || !isCoffeeSize(selectedSize.value)) return;

    const summary = getSummary(view.getQuantity());

    if (summary.isAtLimit) {
      view.renderSummary(summary);
      return;
    }

    const cartItem = {
      id: `${currentProduct}-${selectedSize.value}`,
      product: currentProduct,
      size: selectedSize.value,
      unitPrice: summary.unitPrice,
      quantity: summary.quantity,
    };

    if (!addCartItem(cartItem)) {
      updateSummary(summary.quantity);
      return;
    }

    view.close();

    showToast({
      title: "Added to cart",
      message: `${cartItem.product}, ${cartItem.size} × ${cartItem.quantity}`,
      action: {
        label: "Open cart",
        modalId: "cart-modal",
      },
    });
  });
};
