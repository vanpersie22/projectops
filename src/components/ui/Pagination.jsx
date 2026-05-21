import React from "react";
import { PageBtn } from "../ui/index.jsx";

function getPaginRange(current, total) {
  const range = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      range.push(i);
    } else if (i === current - 2 || i === current + 2) {
      range.push("…");
    }
  }
  return range.filter((v, i, arr) => !(v === "…" && arr[i - 1] === "…"));
}

export default function Pagination({ page, totalPages, total, pageSize, onPage }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, total);

  return (
    <div className="pagination">
      <span className="pagination__info">
        {from}–{to} of {total}
      </span>
      <nav className="pagination__btns" aria-label="Pagination">
        <PageBtn
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ‹
        </PageBtn>

        {getPaginRange(page, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`ell-${i}`} className="pagination__ellipsis" aria-hidden="true">…</span>
          ) : (
            <PageBtn
              key={p}
              active={p === page}
              onClick={() => onPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </PageBtn>
          )
        )}

        <PageBtn
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          ›
        </PageBtn>
      </nav>
    </div>
  );
}
