import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsStore } from "../../stores/productsStore.js";
import { Badge, Stars, StatusBadge, EmptyState } from "../ui/index.jsx";
import Pagination from "../ui/Pagination.jsx";
import ControlsBar from "./ControlsBar.jsx";

export default function ProductTable() {
  // Subscribe to all filter/data slices individually so re-renders are granular
  const products  = useProductsStore((s) => s.products);
  const search    = useProductsStore((s) => s.search);
  const category  = useProductsStore((s) => s.category);
  const brand     = useProductsStore((s) => s.brand);
  const sort      = useProductsStore((s) => s.sort);
  const page      = useProductsStore((s) => s.page);
  const pageSize  = useProductsStore((s) => s.pageSize);
  const setPage   = useProductsStore((s) => s.setPage);
  const resetFilters = useProductsStore((s) => s.resetFilters);
  const getFiltered  = useProductsStore((s) => s.getFiltered);
  const navigate     = useNavigate();

  // Recompute whenever any filter/data dependency changes
  const filtered = useMemo(
    () => getFiltered(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, search, category, brand, sort]
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageItems  = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleSelect(id) {
    navigate(`/products/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <ControlsBar total={filtered.length} />

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="table" role="grid" aria-label="Products catalogue">
            <thead>
              <tr>
                {["Product", "Price", "Category", "Rating", "Stock", "Status"].map((h) => (
                  <th key={h} scope="col">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                pageItems.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelect(p.id)}
                    tabIndex={0}
                    role="row"
                    aria-label={`View details for ${p.title}`}
                    className="table__row--clickable"
                  >
                    <td>
                      <div className="product-cell">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="product-cell__img"
                          loading="lazy"
                          width="40"
                          height="40"
                        />
                        <div>
                          <div className="product-cell__title">{p.title}</div>
                          <div className="product-cell__brand">{p.brand || "—"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="td-price">${p.price.toFixed(2)}</td>
                    <td className="hide-mobile">
                      <Badge color="blue">{p.category}</Badge>
                    </td>
                    <td className="hide-mobile">
                      <Stars rating={p.rating} />
                    </td>
                    <td className="td-stock hide-mobile">{p.stock}</td>
                    <td><StatusBadge status={p.availabilityStatus} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          total={filtered.length}
          pageSize={pageSize}
          onPage={setPage}
        />
      </div>
    </div>
  );
}
