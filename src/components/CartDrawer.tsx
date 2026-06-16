"use client";

import {
  cartSubtotal,
  FREE_SHIPPING_FROM,
  type CartItem,
} from "@/lib/cart";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export default function CartDrawer({
  open,
  items,
  onClose,
  onQtyChange,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartSubtotal(items);
  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= FREE_SHIPPING_FROM
        ? 0
        : 89;
  const total = subtotal + shipping;
  const toFreeShipping = FREE_SHIPPING_FROM - subtotal;

  return (
    <>
      <button
        type="button"
        className={`cart-backdrop${open ? " open" : ""}`}
        aria-label="Zavřít košík"
        onClick={onClose}
      />
      <aside
        className={`cart-drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        aria-label="Košík"
      >
        <div className="cart-drawer__head">
          <h2>🛒 Tvůj košík</h2>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Zavřít"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty__emoji">📦</span>
            <p>Košík je zatím prázdný.</p>
            <button type="button" className="btn btn-pink" onClick={onClose}>
              Vybrat box ✦
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {items.map((item) => (
                <li key={item.id} className="cart-line">
                  <span className="cart-line__emoji">{item.emoji}</span>
                  <div className="cart-line__body">
                    <b>{item.name}</b>
                    {item.occasion ? (
                      <span className="cart-line__meta">💌 {item.occasion}</span>
                    ) : null}
                    {item.personName ? (
                      <span className="cart-line__meta">
                        Kartička: {item.personName}
                      </span>
                    ) : null}
                    <span className="cart-line__price">
                      {(item.price * item.qty).toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                  <div className="cart-line__actions">
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() => onQtyChange(item.id, -1)}
                        aria-label="Méně"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => onQtyChange(item.id, 1)}
                        aria-label="Více"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-line__remove"
                      onClick={() => onRemove(item.id)}
                    >
                      Odebrat
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              {subtotal > 0 && subtotal < FREE_SHIPPING_FROM ? (
                <p className="cart-ship-hint">
                  Do dopravy zdarma chybí{" "}
                  <b>{toFreeShipping.toLocaleString("cs-CZ")} Kč</b> 🚚
                </p>
              ) : subtotal >= FREE_SHIPPING_FROM ? (
                <p className="cart-ship-hint cart-ship-hint--free">
                  Doprava zdarma! 🎀
                </p>
              ) : null}
              <div className="cart-summary__row">
                <span>Mezisoučet</span>
                <span>{subtotal.toLocaleString("cs-CZ")} Kč</span>
              </div>
              <div className="cart-summary__row">
                <span>Doprava</span>
                <span>
                  {shipping === 0 && subtotal > 0
                    ? "Zdarma"
                    : `${shipping.toLocaleString("cs-CZ")} Kč`}
                </span>
              </div>
              <div className="cart-summary__total">
                <span>Celkem</span>
                <span>{total.toLocaleString("cs-CZ")} Kč</span>
              </div>
              <button
                type="button"
                className="btn btn-pink cart-checkout"
                onClick={onCheckout}
              >
                Objednat s láskou 💝
              </button>
              <p className="cart-demo-note">
                Demo e-shop — objednávka se jen uloží a zobrazí potvrzení.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
