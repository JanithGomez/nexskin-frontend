'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchMyOrders } from '@/src/lib/api';

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}

function moneyLKR(amount) {
  const n = Number(amount || 0);
  return `LKR ${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function statusBadgeClass(status) {
  return 'tf-badge style-1'; // keep theme class
}

function buildPageWindow(current, last, windowSize = 5) {
  // returns an array like: [1, "...", 4,5,6, "...", last]
  if (last <= windowSize + 2) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages = [];
  pages.push(1);

  const half = Math.floor(windowSize / 2);
  let start = Math.max(2, current - half);
  let end = Math.min(last - 1, current + half);

  // adjust if near edges
  if (current <= 1 + half) {
    start = 2;
    end = 1 + windowSize;
  } else if (current >= last - half) {
    start = last - windowSize;
    end = last - 1;
  }

  if (start > 2) pages.push('...');

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < last - 1) pages.push('...');

  pages.push(last);
  return pages;
}

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: null,
    to: null,
  });

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const pages = useMemo(
    () => buildPageWindow(meta.current_page, meta.last_page, 5),
    [meta.current_page, meta.last_page],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const json = await fetchMyOrders(page, perPage);

        if (!mounted) return;

        setRows(json?.data ?? []);
        setMeta(
          json?.meta ?? {
            current_page: page,
            last_page: 1,
            per_page: perPage,
            total: 0,
            from: null,
            to: null,
          },
        );

        setErr('');
      } catch (e) {
        if (!mounted) return;
        setErr(e?.message || 'Failed to load orders');
        setRows([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [page]);

  const canPrev = meta.current_page > 1;
  const canNext = meta.current_page < meta.last_page;

  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        {loading && <div className="text-2">Loading orders...</div>}
        {!loading && err && <div className="text-2 text-danger">{err}</div>}

        {!loading && !err && (
          <>
            <table>
              <thead>
                <tr>
                  <th className="fw-6">Order</th>
                  <th className="fw-6">Date</th>
                  <th className="fw-6">Status</th>
                  <th className="fw-6">Total</th>
                  <th className="fw-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((o) => (
                  <tr className="tf-order-item" key={o.id}>
                    <td>#{o.order_number}</td>
                    <td>{formatDate(o.created_at)}</td>
                    <td>
                      <span className={statusBadgeClass(o.status)}>{String(o.status || '').toUpperCase()}</span>
                    </td>
                    <td>
                      {moneyLKR(o.total_amount)} for {o.items_count} items
                    </td>
                    <td>
                      <Link
                        href={`/my-account-orders-details/${o.id}`}
                        className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center">
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}

                {!rows.length && (
                  <tr>
                    <td colSpan={5} className="text-2">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex align-items-center justify-content-between mt_20" style={{ gap: 12 }}>
              <div className="text-2">
                {meta.total ? (
                  <>
                    Showing <strong>{meta.from}</strong>–<strong>{meta.to}</strong> of <strong>{meta.total}</strong>
                  </>
                ) : (
                  ' '
                )}
              </div>

              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <button
                  type="button"
                  className="tf-btn btn-line rounded-0"
                  disabled={!canPrev}
                  onClick={() => canPrev && setPage((p) => p - 1)}>
                  Prev
                </button>

                {pages.map((p, idx) =>
                  p === '...' ? (
                    <span key={`dots-${idx}`} className="text-2 px-8">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      className={`tf-btn btn-line rounded-0 ${Number(p) === meta.current_page ? 'active' : ''}`}
                      onClick={() => setPage(Number(p))}>
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  className="tf-btn btn-line rounded-0"
                  disabled={!canNext}
                  onClick={() => canNext && setPage((p) => p + 1)}>
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
