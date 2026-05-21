import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useProductsStore } from "../../stores/productsStore.js";

const REQUIRED = { required: "This field is required" };

export default function AddProductForm({ onSuccess, onCancel }) {
  const addProduct = useProductsStore((s) => s.addProduct);
  const getCategories = useProductsStore((s) => s.getCategories);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      brand: "",
      category: "",
      price: "",
      discountPercentage: "0",
      stock: "",
      description: "",
    },
  });

  const categories = getCategories();

  function onSubmit(data) {
    addProduct(data);
    setSubmitted(true);
    reset();
    setTimeout(() => {
      setSubmitted(false);
      onSuccess?.();
    }, 1500);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon">✓</span>
        <span>Product added successfully!</span>
      </div>
    );
  }

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Add new product">
      <h2 className="add-form__title">Add New Product</h2>

      <div className="form-grid">
        <div className="field">
          <label className="field__label" htmlFor="title">Title *</label>
          <input
            id="title"
            className={`field__input${errors.title ? " field__input--error" : ""}`}
            type="text"
            placeholder="Product title"
            aria-describedby={errors.title ? "title-error" : undefined}
            {...register("title", { ...REQUIRED, minLength: { value: 3, message: "Min 3 characters" } })}
          />
          {errors.title && <span id="title-error" className="field__error" role="alert">{errors.title.message}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="brand">Brand</label>
          <input
            id="brand"
            className="field__input"
            type="text"
            placeholder="Brand name"
            {...register("brand")}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="category">Category *</label>
          <input
            id="category"
            className={`field__input${errors.category ? " field__input--error" : ""}`}
            type="text"
            placeholder="e.g. smartphones"
            list="category-list"
            aria-describedby={errors.category ? "category-error" : undefined}
            {...register("category", REQUIRED)}
          />
          <datalist id="category-list">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
          {errors.category && <span id="category-error" className="field__error" role="alert">{errors.category.message}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="price">Price ($) *</label>
          <input
            id="price"
            className={`field__input${errors.price ? " field__input--error" : ""}`}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            aria-describedby={errors.price ? "price-error" : undefined}
            {...register("price", {
              ...REQUIRED,
              min: { value: 0.01, message: "Price must be > 0" },
            })}
          />
          {errors.price && <span id="price-error" className="field__error" role="alert">{errors.price.message}</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="discountPercentage">Discount (%)</label>
          <input
            id="discountPercentage"
            className="field__input"
            type="number"
            min="0"
            max="100"
            step="0.1"
            {...register("discountPercentage", {
              min: { value: 0, message: "Min 0" },
              max: { value: 100, message: "Max 100" },
            })}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="stock">Stock *</label>
          <input
            id="stock"
            className={`field__input${errors.stock ? " field__input--error" : ""}`}
            type="number"
            min="0"
            placeholder="0"
            aria-describedby={errors.stock ? "stock-error" : undefined}
            {...register("stock", {
              ...REQUIRED,
              min: { value: 0, message: "Stock cannot be negative" },
            })}
          />
          {errors.stock && <span id="stock-error" className="field__error" role="alert">{errors.stock.message}</span>}
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="description">Description *</label>
        <textarea
          id="description"
          className={`field__textarea${errors.description ? " field__input--error" : ""}`}
          placeholder="Describe the product…"
          rows={3}
          aria-describedby={errors.description ? "desc-error" : undefined}
          {...register("description", { ...REQUIRED, minLength: { value: 10, message: "Min 10 characters" } })}
        />
        {errors.description && <span id="desc-error" className="field__error" role="alert">{errors.description.message}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Adding…" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
