"use client";

import React from "react";

export default function Pagination({ meta, onPageChange }) {
  const current = meta?.current_page ?? 1;
  const last = meta?.last_page ?? 1;

  if (last <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > last || p === current) return;
    onPageChange(p);
  };

  // Build a compact page list: 1 ... (current-1,current,current+1) ... last
  const pages = [];
  const add = (v) => pages.push(v);

  add(1);
  if (current > 3) add("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(last - 1, current + 1); p++) {
    add(p);
  }
  if (current < last - 2) add("...");
  if (last > 1) add(last);

  return (
    <>
      {/* Prev */}
      <li>
        <a
          className="pagination-link animate-hover-btn"
          onClick={() => go(current - 1)}
          style={{ opacity: current === 1 ? 0.5 : 1, pointerEvents: current === 1 ? "none" : "auto" }}
        >
          <span className="icon icon-arrow-left" />
        </a>
      </li>

      {/* Pages */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <li key={`dots-${idx}`} className="disabled">
            <a className="pagination-link">…</a>
          </li>
        ) : (
          <li key={p} className={current === p ? "active" : ""}>
            <a className="pagination-link animate-hover-btn" onClick={() => go(p)}>
              {p}
            </a>
          </li>
        )
      )}

      {/* Next */}
      <li>
        <a
          className="pagination-link animate-hover-btn"
          onClick={() => go(current + 1)}
          style={{ opacity: current === last ? 0.5 : 1, pointerEvents: current === last ? "none" : "auto" }}
        >
          <span className="icon icon-arrow-right" />
        </a>
      </li>
    </>
  );
}
