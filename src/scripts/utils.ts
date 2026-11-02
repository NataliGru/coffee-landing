import { MAX_QUANTITY, MIN_QUANTITY } from "./constants";

export const normalizeQuantity = (value: number) => {
  if (!Number.isFinite(value)) return MIN_QUANTITY;

  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value));
};
