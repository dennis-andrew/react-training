import { useState } from "react";
import type { ProductCategory } from "../data/products";
import formatPrice from "../utils";
import Select from "./Select";
import "./FilterRow.css";

export type ViewMode = "grid" | "list";
export type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

type CategoryOption = {
  id: ProductCategory;
  label: string;
};

type FilterRowProps = {
  viewMode: ViewMode;
  sortBy: SortOption;
  searchTerm: string;
  maximumPrice: number;
  maxPrice: number;
  resultCount: number;
  totalCount: number;
  categories: CategoryOption[];
  selectedCategories: ProductCategory[];
  onViewModeChange: (viewMode: ViewMode) => void;
  onSortChange: (sortBy: SortOption) => void;
  onSearchChange: (searchTerm: string) => void;
  onMaximumPriceChange: (maximumPrice: number) => void;
  onCategoryChange: (category: ProductCategory) => void;
  onClearCategories: () => void;
  onClearFilters: () => void;
};

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

const FilterRow = ({
  viewMode,
  sortBy,
  searchTerm,
  maximumPrice,
  maxPrice,
  resultCount,
  totalCount,
  categories,
  selectedCategories,
  onViewModeChange,
  onSortChange,
  onSearchChange,
  onMaximumPriceChange,
  onCategoryChange,
  onClearCategories,
  onClearFilters,
}: FilterRowProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const hasFilters =
    searchTerm.trim().length > 0 ||
    maximumPrice < maxPrice ||
    selectedCategories.length > 0;

  const resultsText =
    resultCount === 0
      ? `Showing 0 of ${totalCount} results`
      : `Showing 1-${resultCount} of ${totalCount} results`;

  return (
    <section className="filter-row" aria-label="Product filters and sorting">
      <div className="filter-row__content">
        <div className="filter-row__tools">
          <button
            className="filter-row__filter-button"
            type="button"
            aria-controls="product-filters"
            aria-expanded={isFilterOpen}
            onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
          >
            <FilterIcon />
            Filter
          </button>

          <button
            className={`filter-row__icon-button ${
              viewMode === "grid" ? "filter-row__icon-button--active" : ""
            }`.trim()}
            type="button"
            aria-label="Show grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
          >
            <GridIcon />
          </button>

          <button
            className={`filter-row__icon-button ${
              viewMode === "list" ? "filter-row__icon-button--active" : ""
            }`.trim()}
            type="button"
            aria-label="Show list view"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
          >
            <ListIcon />
          </button>

          <p className="filter-row__results" aria-live="polite">
            {resultsText}
          </p>
        </div>

        <div className="filter-row__options">
          <Select
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            ariaLabel="Sort products"
            className="filter-row__sort-select"
            onChange={(value) => onSortChange(value as SortOption)}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div className="filter-row__panel" id="product-filters">
          <label className="filter-row__search">
            <span>Search name or color</span>
            <input
              type="search"
              value={searchTerm}
              placeholder="e.g. Chair or Beige"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>

          <label className="filter-row__price">
            <span>Price: up to {formatPrice(maximumPrice)}</span>
            <input
              type="range"
              aria-label="Maximum price"
              min="0"
              max={maxPrice}
              step="500"
              value={maximumPrice}
              onChange={(event) =>
                onMaximumPriceChange(Number(event.target.value))
              }
            />
          </label>

          <fieldset className="filter-row__categories">
            <legend>Categories</legend>
            <div className="filter-row__checkboxes">
              <label className="filter-row__checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={onClearCategories}
                />
                <span>All category</span>
              </label>
              {categories.map((category) => (
                <label className="filter-row__checkbox" key={category.id}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {hasFilters && (
            <button
              className="filter-row__clear-button"
              type="button"
              onClick={onClearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  );
};

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 6h16M7 12h10M10 18h4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h16v4H4zM4 11h16v4H4zM4 17h16v3H4z" fill="currentColor" />
  </svg>
);

export default FilterRow;
