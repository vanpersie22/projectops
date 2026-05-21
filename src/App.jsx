import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}