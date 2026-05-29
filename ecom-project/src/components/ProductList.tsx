import type { Product } from "../data/products";
import type { ViewMode } from "./FilterRow";
import "./ProductList.css";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  viewMode: ViewMode;
  onViewDetails: (product: Product) => void;
};

const ProductList = ({ products, viewMode, onViewDetails }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <p className="product-list__empty">
        No products match your filters.
      </p>
    );
  }

  return (
    <div className={`product-list product-list--${viewMode}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductList;
