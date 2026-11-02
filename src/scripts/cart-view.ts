import trashIconUrl from "../assets/images/trash.svg";
import { MAX_QUANTITY, MIN_QUANTITY } from "./constants";
import type { CartItem } from "./cart-store";

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const formatSize = (size: string) => {
  return size.charAt(0).toUpperCase() + size.slice(1);
};

const updateCartCount = (items: readonly CartItem[]) => {
  const cartCount = document.querySelector<HTMLElement>("[data-cart-count]");

  if (!cartCount) return;

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = String(totalQuantity);

  const cartButton = cartCount.closest<HTMLButtonElement>("button");

  cartButton?.setAttribute(
    "aria-label",
    `Open cart, ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`,
  );
};

export const renderCart = (items: readonly CartItem[]) => {
  const itemsContainer =
    document.querySelector<HTMLElement>("[data-cart-items]");

  const emptyMessage = document.querySelector<HTMLElement>("[data-cart-empty]");

  const summary = document.querySelector<HTMLElement>("[data-cart-summary]");

  const totalOutput =
    document.querySelector<HTMLOutputElement>("[data-cart-total]");

  const submitButton =
    document.querySelector<HTMLButtonElement>("[data-cart-submit]");

  const exploreLink = document.querySelector<HTMLAnchorElement>(
    "[data-cart-explore]",
  );

  if (
    !itemsContainer ||
    !emptyMessage ||
    !summary ||
    !totalOutput ||
    !submitButton ||
    !exploreLink
  ) {
    return;
  }

  const isEmpty = items.length === 0;

  emptyMessage.hidden = !isEmpty;
  summary.hidden = isEmpty;
  submitButton.hidden = isEmpty;
  exploreLink.hidden = !isEmpty;

  itemsContainer.innerHTML = items
    .map((item) => {
      const itemTotal = item.unitPrice * item.quantity;

      return `
        <li class="cart-item">
          <div class="cart-item__info">
            <h3 class="cart-item__title">${item.product}</h3>

            <p class="cart-item__details">
              ${formatSize(item.size)}
              &middot; ${formatPrice(item.unitPrice)} each
            </p>
          </div>

          <div class="cart-item__quantity" aria-label="Quantity">
            <button
              type="button"
              data-cart-decrease="${item.id}"
              aria-label="Decrease ${item.product} quantity"
              ${item.quantity <= MIN_QUANTITY ? "disabled" : ""}
            >
              &minus;
            </button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-cart-increase="${item.id}"
              aria-label="Increase ${item.product} quantity"
              ${item.quantity >= MAX_QUANTITY ? "disabled" : ""}
            >
              +
            </button>
          </div>

          <div class="cart-item__price">
            <span>${formatPrice(item.unitPrice)} each</span>
            <strong>${formatPrice(itemTotal)}</strong>
          </div>

          <button
            type="button"
            class="cart-item__remove"
            data-cart-remove="${item.id}"
            aria-label="Remove ${item.product}, ${item.size}"
          >
            <img src="${trashIconUrl}" width="18" height="18" alt="" />
          </button>
        </li>
      `;
    })
    .join("");

  const cartTotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  totalOutput.textContent = formatPrice(cartTotal);

  updateCartCount(items);
};
