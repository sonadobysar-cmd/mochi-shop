export type CartItem = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  occasion: string;
  personName: string;
  qty: number;
};

export type CartLineInput = {
  name: string;
  emoji: string;
  price: number;
  occasion?: string;
  personName?: string;
};

export const CART_STORAGE_KEY = "mochi-cart-v1";
export const FREE_SHIPPING_FROM = 800;

export function cartItemId(
  name: string,
  occasion: string,
  personName: string,
): string {
  return `${name}::${occasion}::${personName}`;
}

export function addCartLine(
  items: CartItem[],
  input: CartLineInput,
): CartItem[] {
  const occasion = input.occasion?.trim() ?? "";
  const personName = input.personName?.trim() ?? "";
  const id = cartItemId(input.name, occasion, personName);
  const existing = items.find((item) => item.id === id);

  if (existing) {
    return items.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );
  }

  return [
    ...items,
    {
      id,
      name: input.name,
      emoji: input.emoji,
      price: input.price,
      occasion,
      personName,
      qty: 1,
    },
  ];
}

export function updateCartQty(
  items: CartItem[],
  id: string,
  delta: number,
): CartItem[] {
  return items
    .map((item) =>
      item.id === id ? { ...item, qty: item.qty + delta } : item,
    )
    .filter((item) => item.qty > 0);
}

export function removeCartLine(items: CartItem[], id: string): CartItem[] {
  return items.filter((item) => item.id !== id);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
