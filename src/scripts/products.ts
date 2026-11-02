export const PRODUCTS = {
  cappuccino: {
    name: "Cappuccino",
    basePrice: 7.5,
  },
  "chai-latte": {
    name: "Chai Latte",
    basePrice: 8.5,
  },
  macchiato: {
    name: "Macchiato",
    basePrice: 6.5,
  },
  espresso: {
    name: "Espresso",
    basePrice: 5.5,
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;

export const getProduct = (id: string | undefined) => {
  if (!id || !(id in PRODUCTS)) return null;

  return PRODUCTS[id as ProductId];
};

export const initProductMenu = () => {
  document
    .querySelectorAll<HTMLElement>("[data-product-price]")
    .forEach((priceElement) => {
      const product = getProduct(priceElement.dataset.productPrice);

      if (product) {
        priceElement.textContent = `From $${product.basePrice.toFixed(2)}`;
      }
    });
};
