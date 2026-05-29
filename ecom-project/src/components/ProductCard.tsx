import "./ProductCard.css";
import formatPrice from "../utils";
import type { Product } from "../data/products";

type ProductProps = {
  product: Product;
  onViewDetails: (product: Product) => void;
};

const ProductCard = ({ product, onViewDetails }: ProductProps) => {
  return (
    <article className="product-card" key={product.id}>
      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={product.imageUrl}
          alt={product.name}
        />
        {product.badge && (
          <span
            className={`product-card__badge product-card__badge--${product.badgeTone}`}
          >
            {product.badge}
          </span>
        )}
        <button
          className="product-card__view-button"
          type="button"
          aria-label={`View ${product.name} details`}
          onClick={() => onViewDetails(product)}
        >
          <ArrowTopRightIcon />
        </button>
      </div>

      <div className="product-card__details">
        <h2>{product.name}</h2>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__prices">
          <p>{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

const ArrowTopRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7 17 17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default ProductCard;
