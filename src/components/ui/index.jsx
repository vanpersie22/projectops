import React from "react";

// Badge
export function Badge({ children, color = "blue" }) {
  return <span className={`badge badge--${color}`}>{children}</span>;
}

// StatusBadge
export function StatusBadge({ status }) {
  if (status === "In Stock")  return <Badge color="green">In Stock</Badge>;
  if (status === "Low Stock") return <Badge color="yellow">Low Stock</Badge>;
  return <Badge color="red">Out of Stock</Badge>;
}

// Stars (rating)
export function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i <= Math.round(rating) ? "stars__star--filled" : "stars__star--empty"}
        >
          ★
        </span>
      ))}
      <span className="stars__score">{rating.toFixed(1)}</span>
    </span>
  );
}

// Skeleton (loading state)
export function Skeleton({ rows = 10 }) {
  return (
    <div className="skeleton-list" aria-busy="true" aria-label="Loading products">
      {Array(rows).fill(0).map((_, i) => (
        <div key={i} className="skeleton-row" />
      ))}
    </div>
  );
}

// ErrorState
export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">⚠</div>
      <div className="error-state__title">Failed to load products</div>
      <div className="error-state__sub">{message || "Check your connection and try again"}</div>
      <button className="btn-primary" onClick={onRetry}>Retry</button>
    </div>
  );
}

// EmptyState
export function EmptyState({ onReset }) {
  return (
    <tr>
      <td colSpan={6}>
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">◎</div>
          <div className="empty-state__title">No products found</div>
          <div className="empty-state__sub">Try adjusting your search or filters</div>
          {onReset && (
            <button className="btn-ghost" onClick={onReset}>Clear filters</button>
          )}
        </div>
      </td>
    </tr>
  );
}

// PageBtn
export function PageBtn({ children, active, onClick, disabled, "aria-label": ariaLabel, "aria-current": ariaCurrent }) {
  return (
    <button
      className={`page-btn${active ? " page-btn--active" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
}
