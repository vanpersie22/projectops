import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stars, StatusBadge, Badge } from "../ui/index.jsx";

export default function ProductDetail({ product }) {
  const navigate = useNavigate();
  const [mainImg, setMainImg] = useState(product.images?.[0] || product.thumbnail);

  const discountedPrice = (
    product.price * (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  const logistics = [
    ["SKU",           product.sku],
    ["Shipping",      product.shippingInformation],
    ["Warranty",      product.warrantyInformation],
    ["Return Policy", product.returnPolicy],
    ["Min Order",     product.minimumOrderQuantity ?? 1],
    ["Weight",        product.weight ? `${product.weight}g` : "—"],
    ["Created",       product.meta?.createdAt
      ? new Date(product.meta.createdAt).toLocaleDateString()
      : "—"],
  ];

  return (
    <div>
      <button
        className="back-btn"
        onClick={() => navigate("/products")}
        aria-label="Back to product catalogue"
      >
        ← Back to Products
      </button>

      <div className="detail-grid">
        {/* Left: images + description */}
        <div>
          <div className="detail-img-wrap">
            <img
              src={mainImg}
              alt={product.title}
              className="detail-main-img"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="detail-thumbs" role="list" aria-label="Product images">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} — view ${i + 1}`}
                  className={`detail-thumb${img === mainImg ? " detail-thumb--active" : ""}`}
                  onClick={() => setMainImg(img)}
                  onKeyDown={(e) => e.key === "Enter" && setMainImg(img)}
                  tabIndex={0}
                  role="listitem"
                />
              ))}
            </div>
          )}

          <div className="card" style={{ marginTop: 16 }}>
            <div className="card__label">DESCRIPTION</div>
            <p className="detail-desc">{product.description}</p>
            {product.tags?.length > 0 && (
              <div className="detail-tags" aria-label="Tags">
                {product.tags.map((t) => (
                  <span key={t} className="detail-tag">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: info cards */}
        <div>
          {/* Product header */}
          <div className="card">
            <div className="card__label">PRODUCT</div>
            <h1 className="detail-title">{product.title}</h1>
            {product.brand && (
              <div className="detail-brand">
                {product.brand}
                <span className="detail-brand__sep">·</span>
                <Badge color="blue">{product.category}</Badge>
              </div>
            )}
            <div className="detail-price">${product.price.toFixed(2)}</div>
            {product.discountPercentage > 0 && (
              <div className="detail-discount">
                After {product.discountPercentage}% discount:{" "}
                <strong>${discountedPrice}</strong>
              </div>
            )}
            <StatusBadge status={product.availabilityStatus} />
          </div>

          {/* Stats */}
          <div className="card">
            <div className="card__label">STATS</div>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-item__label">RATING</div>
                <Stars rating={product.rating} />
              </div>
              <div className="stat-item">
                <div className="stat-item__label">STOCK</div>
                <div className="stat-item__val">{product.stock}</div>
              </div>
              <div className="stat-item">
                <div className="stat-item__label">DISCOUNT</div>
                <div className="stat-item__val">{product.discountPercentage}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-item__label">REVIEWS</div>
                <div className="stat-item__val">{product.reviews?.length ?? 0}</div>
              </div>
            </div>
          </div>

          {/* Logistics */}
          <div className="card">
            <div className="card__label">LOGISTICS</div>
            {logistics.map(([label, val]) => (
              <div key={label} className="info-row">
                <span className="info-row__label">{label}</span>
                <span className="info-row__val">{val || "—"}</span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          {product.reviews?.length > 0 && (
            <div className="card">
              <div className="card__label">REVIEWS ({product.reviews.length})</div>
              <div className="reviews-list">
                {product.reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="review-item__header">
                      <span className="review-item__name">{r.reviewerName}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <div className="review-item__date">
                      {new Date(r.date).toLocaleDateString()}
                    </div>
                    <p className="review-item__comment">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
