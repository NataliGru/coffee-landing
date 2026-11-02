import { MAX_QUANTITY, MIN_QUANTITY } from "./constants";
import { normalizeQuantity } from "./utils";

type OrderSummaryParams = {
  basePrice: number;
  priceModifier: number;
  requestedQuantity: number;
  quantityInCart: number;
};

export type OrderSummary = {
  availableQuantity: number;
  isAtLimit: boolean;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export const calculateOrderSummary = ({
  basePrice,
  priceModifier,
  requestedQuantity,
  quantityInCart,
}: OrderSummaryParams): OrderSummary => {
  const availableQuantity = Math.max(0, MAX_QUANTITY - quantityInCart);

  const isAtLimit = availableQuantity === 0;

  const quantity = isAtLimit
    ? MIN_QUANTITY
    : Math.min(normalizeQuantity(requestedQuantity), availableQuantity);

  const unitPrice = basePrice + priceModifier;

  return {
    availableQuantity,
    isAtLimit,
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
};
