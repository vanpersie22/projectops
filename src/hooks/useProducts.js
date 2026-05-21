import { useEffect, useCallback } from "react";
import { useProductsStore } from "../stores/productsStore.js";

/**
 * Loads products on mount and re-fetches on window focus,
 * mirroring React Query's stale-while-revalidate behaviour.
 */
export function useProducts() {
  const loadProducts = useProductsStore((s) => s.loadProducts);
  const status       = useProductsStore((s) => s.status);
  const error        = useProductsStore((s) => s.error);

  const load = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  // Initial fetch
  useEffect(() => {
    load();
  }, [load]);

  // Re-fetch on window focus (mirrors React Query)
  useEffect(() => {
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, [load]);

  return { status, error, retry: load };
}
