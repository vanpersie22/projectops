import { create } from "zustand";

const CACHE_TTL = 5 * 60 * 1000;
let _cache = null;
let _fetchedAt = 0;

async function fetchProducts() {
  if (_cache && Date.now() - _fetchedAt < CACHE_TTL) return _cache;
  const res = await fetch("https://dummyjson.com/products?limit=0");
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch products`);
  const data = await res.json();
  _cache = data.products;
  _fetchedAt = Date.now();
  return _cache;
}

export function invalidateCache() {
  _fetchedAt = 0;
}

//store
export const useProductsStore = create((set, get) => ({
  // Data
  products: [],
  status: "idle", // idle 
  error: null,

  // Filters & Sort
  search: "",
  category: "",
  brand: "",
  sort: "newest",

  // Pagination
  page: 1,
  pageSize: 10,

  // Actions ────────────────────────────────────────────────────────
  setSearch:   (search)   => set({ search,   page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setBrand:    (brand)    => set({ brand,    page: 1 }),
  setSort:     (sort)     => set({ sort,     page: 1 }),
  setPage:     (page)     => set({ page }),

  resetFilters: () =>
    set({ search: "", category: "", brand: "", sort: "newest", page: 1 }),

  loadProducts: async () => {
    set({ status: "loading", error: null });
    try {
      const products = await fetchProducts();
      set({ products, status: "ready" });
    } catch (err) {
      set({ status: "error", error: err.message });
    }
  },

  // Derived selectors
  getFiltered: () => {
    const { products, search, category, brand, sort } = get();
    const q = search.toLowerCase();

    const result = products.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchCategory = !category || p.category === category;
      const matchBrand    = !brand    || p.brand    === brand;
      return matchSearch && matchCategory && matchBrand;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "newest":      return new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0);
        case "oldest":      return new Date(a.meta?.createdAt || 0) - new Date(b.meta?.createdAt || 0);
        case "price-asc":   return a.price - b.price;
        case "price-desc":  return b.price - a.price;
        case "rating-desc": return b.rating - a.rating;
        default:            return 0;
      }
    });

    return result;
  },

  getCategories: () => [...new Set(get().products.map((p) => p.category))].sort(),
  getBrands:     () => [...new Set(get().products.map((p) => p.brand).filter(Boolean))].sort(),
  getProductById:(id) => get().products.find((p) => p.id === Number(id)),

}));