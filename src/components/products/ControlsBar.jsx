import React from "react";
import { useProductsStore } from "../../stores/productsStore.js";

export default function ControlsBar({ total }) {
  const search      = useProductsStore((s) => s.search);
  const category    = useProductsStore((s) => s.category);
  const brand       = useProductsStore((s) => s.brand);
  const sort        = useProductsStore((s) => s.sort);
  const setSearch   = useProductsStore((s) => s.setSearch);
  const setCategory = useProductsStore((s) => s.setCategory);
  const setBrand    = useProductsStore((s) => s.setBrand);
  const setSort     = useProductsStore((s) => s.setSort);
  const getCategories = useProductsStore((s) => s.getCategories);
  const getBrands     = useProductsStore((s) => s.getBrands);

  const categories = getCategories();
  const brands     = getBrands();
  const hasFilters = search || category || brand || sort !== "newest";

  return (
    <div className="controls-bar" role="search" aria-label="Product filters">
      <div className="controls-bar__search-wrap">
        <span className="controls-bar__search-icon" aria-hidden="true">⌕</span>
        <input
          id="product-search"
          type="search"
          className="controls-bar__search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products by name, brand or category"
        />
      </div>

      <select
        className="controls-bar__select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <select
        className="controls-bar__select"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        aria-label="Filter by brand"
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <select
        className="controls-bar__select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label="Sort products"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="rating-desc">Top Rated</option>
      </select>

      <span className="controls-bar__count" aria-live="polite" aria-atomic="true">
        {total} result{total !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
