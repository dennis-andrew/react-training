import { useState } from "react";
import type { Product } from "../data/products";
import localStorageService from "../services/localStorageService";
import formatPrice from "../utils";
import "./ProductDetailsOverlay.css";

type ProductDetailsOverlayProps = {
  product: Product;
  onClose: () => void;
};

const ProductDetailsOverlay = ({
  product,
  onClose,
}: ProductDetailsOverlayProps) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    localStorageService.addCartItem(product, quantity);
    onClose();
  };

  return (
    <div className="product-details-overlay__layer">
      <button
        className="product-details-overlay__backdrop"
        type="button"
        aria-label="Close product details"
        onClick={onClose}
      />

      <aside className="product-details-overlay" aria-label="Product details">
        <button
          className="product-details-overlay__close"
          type="button"
          aria-label="Close product details"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <img
          className="product-details-overlay__image"
          src={product.imageUrl}
          alt={product.name}
        />

        <div className="product-details-overlay__content">
          <h2>{product.name}</h2>
          <p className="product-details-overlay__price">
            {formatPrice(product.price)}
          </p>

          <div className="product-details-overlay__rating">
            <span>★★★★★</span>
            <p>5 Customer Review</p>
          </div>

          <p className="product-details-overlay__description">
            {product.description}. A comfortable piece for your home, styled
            with a clean finish and made for everyday use.
          </p>

          <div className="product-details-overlay__meta">
            <p>
              <span>Color</span>
              {product.color}
            </p>
            <p>
              <span>Category</span>
              {product.category}
            </p>
            <p>
              <span>SKU</span>
              SS00{product.id}
            </p>
          </div>

          <div className="product-details-overlay__actions">
            <div className="product-details-overlay__quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity((currentQuantity) =>
                    Math.max(1, currentQuantity - 1),
                  )
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((currentQuantity) => currentQuantity + 1)
                }
              >
                +
              </button>
            </div>
            <button type="button" onClick={addToCart}>
              Add To Cart
            </button>
            <button type="button">Buy Now</button>
          </div>

          <div className="product-details-overlay__policies">
            <section>
              <h3>Shipping Info</h3>
              <p>
                Free standard delivery on orders above Rs. 10,000. Most items
                ship within 3-5 business days, with tracking shared after
                dispatch.
              </p>
            </section>

            <section>
              <h3>Return & Refund Policy</h3>
              <p>
                Return eligible products within 7 days of delivery in unused
                condition. Refunds are processed to the original payment method
                after quality inspection.
              </p>
            </section>
          </div>
        </div>
      </aside>
    </div>
  );
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m6 6 12 12M18 6 6 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

export default ProductDetailsOverlay;
