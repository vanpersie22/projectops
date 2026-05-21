import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts.js";
import { useProductsStore } from "../stores/productsStore.js";
import { Skeleton, ErrorState } from "../components/ui/index.jsx";
import ProductTable from "../components/products/ProductTable.jsx";
import AddProductForm from "../components/products/AddProductForm.jsx";
import BrandChart from "../components/charts/BrandChart.jsx";

export default function ProductsPage() {
  const { status, error, retry } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const products = useProductsStore((s) => s.products);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Product Catalogue</h1>
          <p className="page-header__sub">Browse, filter and search all products</p>
        </div>
        {status === "ready" && (
          <button
            className="btn-primary"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            aria-controls="add-product-form"
          >
            {showForm ? "✕ Cancel" : "+ Add Product"}
          </button>
        )}
      </div>

      {/* Add product form (stretch) */}
      {showForm && (
        <div id="add-product-form" className="card" style={{ marginBottom: 24 }}>
          <AddProductForm
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Brand chart (stretch) */}
      {status === "ready" && products.length > 0 && <BrandChart />}

      {status === "loading" && <Skeleton />}
      {status === "error"   && <ErrorState message={error} onRetry={retry} />}
      {status === "ready"   && <ProductTable />}
    </div>
  );
}
