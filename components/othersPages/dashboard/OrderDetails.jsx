'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchMyOrder } from '@/src/lib/api';
import { cldCard, productPlaceholder } from '@/src/lib/cloudinary';

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}

function moneyLKR(amount) {
  const n = Number(amount || 0);
  return `LKR ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function upper(s) {
  return String(s || '').toUpperCase();
}

function badgeTypeClass(kind) {
  // your screenshot shows red pills; keep consistent
  // if you want color mapping later, we can add it.
  return 'tf-badge style-1';
}

function niceTimelineTitle(t) {
  const type = t?.type;
  const to = t?.to;

  if (type === 'order_status') return `Order Status → ${upper(to)}`;
  if (type === 'payment_status') return `Payment Status → ${upper(to)}`;
  if (type === 'shipment_status') return `Shipment Status → ${upper(to)}`;
  return `Update → ${upper(to)}`;
}

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const json = await fetchMyOrder(id);
        if (!mounted) return;
        setData(json?.data ?? null);
        setErr('');
      } catch (e) {
        if (!mounted) return;
        setErr(e?.message || 'Failed to load order');
        setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const firstItemImage = useMemo(() => {
    const item = data?.items?.[0];
    if (!item) return productPlaceholder();
    return item.imgPublicId ? cldCard(item.imgPublicId) : productPlaceholder();
  }, [data]);

  if (loading) return <div className="text-2">Loading order...</div>;
  if (err) return <div className="text-2 text-danger">{err}</div>;
  if (!data) return <div className="text-2">Order not found.</div>;

  const shipment = data.shipment;
  const hasTracking = !!(shipment?.tracking_number || shipment?.carrier);

  const shippingAddr = data.shipping;
  const billingAddr = data.billing;

  return (
    <div className="wd-form-order">
      {/* HEADER (like screenshot) */}
      <div className="order-head">
        <figure className="img-product">
          <Image alt="product" src={firstItemImage} width="720" height="1005" />
        </figure>

        <div className="content">
          <div className="d-flex gap-10 flex-wrap">
            <span className={badgeTypeClass('status')}>{upper(data.status)}</span>
            <span className={badgeTypeClass('payment')}>
              {upper(data.payment_status)}
              {data.payment_status === 'paid' ? ' (COD)' : ''}
            </span>
          </div>

          <h6 className="mt-8 fw-5">Order #{data.order_number}</h6>
          <div className="text-2 mt_4">Placed: {formatDate(data.created_at)}</div>
        </div>
      </div>

      {/* SUMMARY GRID */}
      <div className="tf-grid-layout md-col-2 gap-15">
        <div className="item">
          <div className="text-2 text_black-2">Items</div>
          <div className="text-2 mt_4 fw-6">
            {data.items?.reduce((sum, i) => sum + Number(i.quantity || 0), 0) || 0}
          </div>
        </div>

        <div className="item">
          <div className="text-2 text_black-2">Total</div>
          <div className="text-2 mt_4 fw-6">{moneyLKR(data.total_amount)}</div>
        </div>

        <div className="item">
          <div className="text-2 text_black-2">Shipping Address</div>
          <div className="text-2 mt_4 fw-6">
            {shippingAddr ? `${shippingAddr.name}, ${shippingAddr.address_line}, ${shippingAddr.city}` : '-'}
          </div>
        </div>

        <div className="item">
          <div className="text-2 text_black-2">Billing Email</div>
          <div className="text-2 mt_4 fw-6">{billingAddr?.email || '-'}</div>
        </div>
      </div>

      {/* TRACKING BOX (always when tracking exists) */}
      {hasTracking && (
        <div className="mt_20" style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-2 fw-6">
              Tracking <span style={{ color: 'red' }}>•</span>
            </div>
            <div className="text-2">Delivery Attempts: {shipment?.delivery_attempts ?? 0}</div>
          </div>

          <div className="mt_12 text-2">
            <div>
              <strong>Carrier:</strong> {shipment?.carrier || '-'}
            </div>
            <div className="mt_4">
              <strong>Tracking #:</strong> {shipment?.tracking_number || '-'}
            </div>
            <div className="mt_4">
              <strong>Shipment Status:</strong> {shipment?.status ? upper(shipment.status) : '-'}
            </div>
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="widget-tabs style-has-border widget-order-tab mt_20">
        <ul className="widget-menu-tab">
          <li className={`item-title ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
            <span className="inner">Order History</span>
          </li>
          <li className={`item-title ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
            <span className="inner">Item Details</span>
          </li>
          <li className={`item-title ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)}>
            <span className="inner">Receiver</span>
          </li>
        </ul>

        <div className="widget-content-tab">
          {/* TAB 1: Timeline */}
          <div
            className={`widget-content-inner ${tab === 0 ? 'active' : ''}`}
            style={{ display: tab === 0 ? 'block' : 'none' }}>
            <div className="widget-timeline">
              <ul className="timeline">
                {(data.timeline || []).map((t, idx) => (
                  <li key={idx}>
                    <div className={`timeline-badge ${idx === 0 ? 'success' : ''}`} />
                    <div className="timeline-box">
                      <div className="timeline-panel">
                        <div className="text-2 fw-6">{niceTimelineTitle(t)}</div>
                        <span>
                          {formatDate(t.created_at)} • {t.by}
                        </span>
                      </div>

                      {t.note ? (
                        <p className="mt_4">
                          <strong>Note :</strong> {t.note}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}

                {!data.timeline?.length && <div className="text-2">No history yet.</div>}
              </ul>
            </div>
          </div>

          {/* TAB 2: Items */}
          <div
            className={`widget-content-inner ${tab === 1 ? 'active' : ''}`}
            style={{ display: tab === 1 ? 'block' : 'none' }}>
            {(data.items || []).map((it) => {
              const img = it.imgPublicId ? cldCard(it.imgPublicId) : productPlaceholder();
              const href = `/product-detail/${it.product_id}`;

              return (
                <div className="order-head" key={it.id} style={{ marginBottom: 16 }}>
                  <figure className="img-product">
                    <Link href={href}>
                      <Image
                        alt={it.title || 'product'}
                        src={img}
                        width="720"
                        height="1005"
                        style={{ cursor: 'pointer' }}
                      />
                    </Link>
                  </figure>

                  <div className="content">
                    <Link href={href} className="text-2 fw-6" style={{ display: 'inline-block' }}>
                      {it.title}
                    </Link>

                    <div className="mt_4">
                      <span className="fw-6">Price :</span> {moneyLKR(it.price)}
                    </div>
                    <div className="mt_4">
                      <span className="fw-6">Qty :</span> {it.quantity}
                    </div>
                    <div className="mt_4">
                      <span className="fw-6">Line Total :</span> {moneyLKR(it.line_total)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TAB 3: Receiver */}
          <div
            className={`widget-content-inner ${tab === 2 ? 'active' : ''}`}
            style={{ display: tab === 2 ? 'block' : 'none' }}>
            <p className="text-2 text_success">Thank you. Your order has been received.</p>

            <ul className="mt_20">
              <li>
                Order Number : <span className="fw-7">#{data.order_number}</span>
              </li>
              <li>
                Date : <span className="fw-7">{formatDate(data.created_at)}</span>
              </li>
              <li>
                Total : <span className="fw-7">{moneyLKR(data.total_amount)}</span>
              </li>
              <li>
                Payment Method : <span className="fw-7">Cash on Delivery</span>
              </li>
            </ul>

            <div className="mt_20 text-2 fw-6">Shipping</div>
            <div className="text-2 mt_4">
              {shippingAddr ? (
                <>
                  <div>{shippingAddr.name}</div>
                  <div>{shippingAddr.address_line}</div>
                  <div>
                    {shippingAddr.city}
                    {shippingAddr.state ? `, ${shippingAddr.state}` : ''}
                  </div>
                  <div>{shippingAddr.postal_code}</div>
                  <div>{shippingAddr.country}</div>
                  <div className="mt_4">{shippingAddr.phone ? `Phone: ${shippingAddr.phone}` : ''}</div>
                </>
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
