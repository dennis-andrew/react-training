import { useState } from "react";
import FilterRow from "../components/FilterRow";
import type { SortOption, ViewMode } from "../components/FilterRow";
import PageHeader from "../components/PageHeader";
import ProductDetailsOverlay from "../components/ProductDetailsOverlay";
import ProductList from "../components/ProductList";
import { products } from "../data/products";
import type { Product } from "../data/products";
import type { ProductCategory } from "../data/products";
import useDebouncer from "../hooks/useDebouncer";
import "./Shop.css";

const MAX_PRICE = 125000;

const categories: { id: ProductCategory; label: string }[] = [
  { id: "0-6-months", label: "0-6 months" },
  { id: "6-12-months", label: "6-12 months" },
  { id: "2-3-years", label: "2-3 years" },
  { id: "3-4-years", label: "3-4 years" },
];

const Shop = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [maximumPrice, setMaximumPrice] = useState(MAX_PRICE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);

  const debouncedSearchTerm = useDebouncer(searchTerm);
  const debouncedMaximumPrice = useDebouncer(maximumPrice);
  const debouncedCategories = useDebouncer(selectedCategories);
  const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.color.toLowerCase().includes(normalizedSearch);
    const matchesPrice = product.price <= debouncedMaximumPrice;
    const matchesCategory =
      debouncedCategories.length === 0 ||
      debouncedCategories.includes(product.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  let visibleProducts = filteredProducts;

  if (sortBy === "price-low") {
    visibleProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high") {
    visibleProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortBy === "name-asc") {
    visibleProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  if (sortBy === "name-desc") {
    visibleProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  }

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((id) => id !== category)
        : [...currentCategories, category],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMaximumPrice(MAX_PRICE);
    setSelectedCategories([]);
  };

  return (
    <>
      <PageHeader includeLogo={false} subtitle="Shop" title="Shop" />
      <FilterRow
        categories={categories}
        maxPrice={MAX_PRICE}
        onCategoryChange={toggleCategory}
        onClearCategories={() => setSelectedCategories([])}
        onClearFilters={clearFilters}
        onMaximumPriceChange={setMaximumPrice}
        onSearchChange={setSearchTerm}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
        maximumPrice={maximumPrice}
        resultCount={visibleProducts.length}
        searchTerm={searchTerm}
        selectedCategories={selectedCategories}
        sortBy={sortBy}
        totalCount={products.length}
        viewMode={viewMode}
      />
      <main className="shop-products">
        <ProductList
          products={visibleProducts}
          viewMode={viewMode}
          onViewDetails={setSelectedProduct}
        />
      </main>
      {selectedProduct && (
        <ProductDetailsOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Shop;
