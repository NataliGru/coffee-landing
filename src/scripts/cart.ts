import {
  changeCartItemQuantity,
  clearCart,
  getCartItems,
  removeCartItem,
  subscribeToCart,
} from "./cart-store";
import { renderCart } from "./cart-view";
import { showToast } from "./toast";

export const initCart = () => {
  const itemsContainer =
    document.querySelector<HTMLElement>("[data-cart-items]");

  const cartForm = document.querySelector<HTMLFormElement>(".cart-modal__form");

  subscribeToCart(renderCart);

  itemsContainer?.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const removeButton =
      target.closest<HTMLButtonElement>("[data-cart-remove]");

    if (removeButton?.dataset.cartRemove) {
      removeCartItem(removeButton.dataset.cartRemove);
      return;
    }

    const decreaseButton = target.closest<HTMLButtonElement>(
      "[data-cart-decrease]",
    );

    if (decreaseButton?.dataset.cartDecrease) {
      changeCartItemQuantity(decreaseButton.dataset.cartDecrease, -1);
      return;
    }

    const increaseButton = target.closest<HTMLButtonElement>(
      "[data-cart-increase]",
    );

    if (increaseButton?.dataset.cartIncrease) {
      changeCartItemQuantity(increaseButton.dataset.cartIncrease, 1);
    }
  });

  cartForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const items = getCartItems();

    if (items.length === 0) return;

    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    clearCart();
    document.querySelector<HTMLDialogElement>("#cart-modal")?.close();

    showToast({
      title: "Order confirmed",
      message: `${totalQuantity} ${totalQuantity === 1 ? "drink is" : "drinks are"} being prepared.`,
    });
  });
};
