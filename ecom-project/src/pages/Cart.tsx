import { useState } from "react";
import PageHeader from "../components/PageHeader";
import type { CartItem } from "../data/cartItems";
import type { Product } from "../data/products";
import localStorageService from "../services/localStorageService";
import formatPrice from "../utils";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>(
    localStorageService.getCartItems,
  );
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const cartTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const confirmDelete = () => {
    if (!productToDelete) {
      return;
    }

    setItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) => item.product.id !== productToDelete.id,
      );

      localStorageService.saveCartItems(updatedItems);
      return updatedItems;
    });
    setProductToDelete(null);
  };

  return (
    <>
      <PageHeader subtitle="Cart" title="Cart" />
      <main className="cart-page">
        <section className="cart-page__items" aria-label="Cart items">
          <div className="cart-page__table-head">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <div className="cart-item__product">
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
              </div>
              <p className="cart-item__price">{formatPrice(product.price)}</p>
              <p className="cart-item__quantity">{quantity}</p>
              <p className="cart-item__subtotal">
                {formatPrice(product.price * quantity)}
              </p>
              <button
                className="cart-item__remove"
                type="button"
                aria-label={`Remove ${product.name}`}
                onClick={() => setProductToDelete(product)}
              >
                <TrashIcon />
              </button>
            </article>
          ))}

          {items.length === 0 && (
            <p className="cart-page__empty">Your cart is empty.</p>
          )}
        </section>

        <aside className="cart-totals" aria-label="Cart totals">
          <h2>Cart Totals</h2>
          <div className="cart-totals__row">
            <span>Subtotal</span>
            <p>{formatPrice(cartTotal)}</p>
          </div>
          <div className="cart-totals__row cart-totals__row--total">
            <span>Total</span>
            <p>{formatPrice(cartTotal)}</p>
          </div>
          <button type="button">Check Out</button>
        </aside>
      </main>

      {productToDelete && (
        <div className="cart-confirm" role="dialog" aria-modal="true">
          <div className="cart-confirm__panel">
            <h2>Remove item?</h2>
            <p>
              Are you sure you want to remove {productToDelete.name} from your
              cart?
            </p>
            <div className="cart-confirm__actions">
              <button type="button" onClick={() => setProductToDelete(null)}>
                Cancel
              </button>
              <button type="button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M8 9v9M12 9v9M16 9v9M5 6h14M10 4h4M7 6l1 15h8l1-15"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

export default Cart;
