import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsStore } from "../stores/productsStore.js";
import { useProducts } from "../hooks/useProducts.js";
import { Skeleton, ErrorState } from "../components/ui/index.jsx";
import ProductDetail from "../components/products/ProductDetail.jsx";

export default function ProductDetailPage() {
  const { id }          = useParams();
  const navigate        = useNavigate();
  const { status, error, retry } = useProducts();
  const getProductById  = useProductsStore((s) => s.getProductById);

  const product = getProductById(id);

  // If products are loaded but product not found, redirect
  useEffect(() => {
    if (status === "ready" && !product) {
      navigate("/products", { replace: true });
    }
  }, [status, product, navigate]);

  if (status === "loading") return <Skeleton rows={6} />;
  if (status === "error")   return <ErrorState message={error} onRetry={retry} />;
  if (!product)             return null;

  return <ProductDetail product={product} />;
}
