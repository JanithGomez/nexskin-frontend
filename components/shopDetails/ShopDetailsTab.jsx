"use client";

import { useState } from "react";
import { openReviewModal } from "@/utlis/openReviewModal";

const tabs = [
  { title: "Description", active: true },
  { title: "Review", active: false },
  { title: "Shiping", active: false },
  { title: "Return Polocies", active: false },
];

function initialsFromName(name = "") {
  const s = String(name || "").trim();
  if (!s) return "CU";
  return s.slice(0, 2).toUpperCase();
}

function Stars({ value = 0, size = 16 }) {
  const full = Math.round(Number(value || 0));
  return (
    <div style={{ display: "inline-flex", gap: 4, lineHeight: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            opacity: i < full ? 1 : 0.25,
            color: i < full ? "#FACC15" : "#E5E7EB", // ⭐ yellow + light gray
            transform: "translateY(1px)",
          }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr 40px",
        gap: 10,
        alignItems: "center",
      }}
    >
      <div className="text-paragraph" style={{ fontSize: 13 }}>
        {label}★
      </div>
      <div
        style={{
          height: 8,
          background: "#F3F4F6", // light gray track
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: `${pct}%`, height: "100%", background: "#FACC15" }}
        />
      </div>
      <div
        className="text-paragraph"
        style={{ fontSize: 13, textAlign: "right" }}
      >
        {count}
      </div>
    </div>
  );
}

function ReviewCard({ r }) {
  const name = r?.name || "Customer";
  const initials = initialsFromName(name);
  const created = r?.created_at
    ? new Date(r.created_at).toLocaleDateString()
    : "";

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 16 }}>
      <div
        className="d-flex justify-content-between align-items-start"
        style={{ gap: 12 }}
      >
        <div className="d-flex" style={{ gap: 12 }}>
          {/* initials circle */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              flex: "0 0 38px",
            }}
            title={name}
          >
            {initials}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Stars value={r?.rating} size={14} />
              {created ? (
                <span className="text-paragraph" style={{ fontSize: 12 }}>
                  {created}
                </span>
              ) : null}
            </div>

            {/* Review title */}
            {r?.title ? (
              <div style={{ fontWeight: 600, marginTop: 10 }}>{r.title}</div>
            ) : null}

            {/* comment */}
            {r?.comment ? (
              <div className="text-paragraph" style={{ marginTop: 8 }}>
                {r.comment}
              </div>
            ) : null}

            {/* media thumbs */}
            {Array.isArray(r?.media) && r.media.length ? (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                {r.media.slice(0, 6).map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noreferrer">
                    <img
                      src={url}
                      alt=""
                      style={{
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "1px solid #eee",
                      }}
                    />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
          {Number(r?.rating || 0)} / 5
        </div>
      </div>
    </div>
  );
}

export default function ShopDetailsTab({ product }) {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <section
      className="flat-spacing-17 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-has-border">
              <ul className="widget-menu-tab">
                {tabs.map((elm, i) => (
                  <li
                    key={i}
                    onClick={() => setCurrentTab(i + 1)}
                    className={`item-title ${
                      currentTab === i + 1 ? "active" : ""
                    }`}
                  >
                    <span className="inner">{elm.title}</span>
                  </li>
                ))}
              </ul>

              <div className="widget-content-tab">
                {/* Description */}
                <div
                  className={`widget-content-inner ${
                    currentTab === 1 ? "active" : ""
                  }`}
                >
                  <div>
                    <div
                      className="mb_30"
                      dangerouslySetInnerHTML={{
                        __html: product?.description ?? "",
                      }}
                    />
                    <h3 className="fs-16 fw-5">Benefits</h3>
                    <div
                      className="mb_30"
                      dangerouslySetInnerHTML={{
                        __html: product?.benefits ?? "",
                      }}
                    />
                    <h3 className="fs-16 fw-5">How to Use</h3>
                    <div
                      className="mb_30"
                      dangerouslySetInnerHTML={{
                        __html: product?.how_to_use ?? "",
                      }}
                    />
                  </div>
                </div>

                {/* Reviews */}
                {/* Reviews */}
                <div
                  className={`widget-content-inner ${
                    currentTab === 2 ? "active" : ""
                  }`}
                >
                  {(() => {
                    const reviews = product?.reviews?.items ?? [];
                    const avg = product?.reviews?.avg_rating ?? 0;
                    const total = product?.reviews?.count ?? 0;

                    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                    reviews.forEach((r) => {
                      const n = Math.max(1, Math.min(5, Number(r.rating || 0)));
                      counts[n] += 1;
                    });

                    return (
                      <div className="row" style={{ rowGap: 16 }}>
                        {/* LEFT: Summary + button */}
                        <div className="col-12 col-lg-4">
                          <div
                            style={{
                              border: "1px solid #eee",
                              borderRadius: 14,
                              padding: 18,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: 10,
                              }}
                            >
                              <div style={{ fontSize: 34, fontWeight: 700 }}>
                                {avg}
                              </div>
                              <div className="text-paragraph">/ 5</div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 14,
                              }}
                            >
                              <Stars value={avg} size={16} />
                              <div
                                className="text-paragraph"
                                style={{ fontSize: 13 }}
                              >
                                {total} {total === 1 ? "review" : "reviews"}
                              </div>
                            </div>

                            <div style={{ display: "grid", gap: 8 }}>
                              <RatingBar
                                label={5}
                                count={counts[5]}
                                total={total}
                              />
                              <RatingBar
                                label={4}
                                count={counts[4]}
                                total={total}
                              />
                              <RatingBar
                                label={3}
                                count={counts[3]}
                                total={total}
                              />
                              <RatingBar
                                label={2}
                                count={counts[2]}
                                total={total}
                              />
                              <RatingBar
                                label={1}
                                count={counts[1]}
                                total={total}
                              />
                            </div>

                            {/* ✅ button moved to bottom of chart */}
                            <div style={{ marginTop: 16 }}>
                              <a
                                href="#"
                                className="tf-btn btn-fill w-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openReviewModal(product?.id);
                                }}
                              >
                                Write a review
                              </a>
                            </div>

                            <div
                              className="text-paragraph"
                              style={{ fontSize: 12, marginTop: 10 }}
                            >
                              Reviews appear only after admin approval.
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: Reviews list */}
                        <div className="col-12 col-lg-8">
                          {!reviews.length ? (
                            <div
                              style={{
                                border: "1px solid #eee",
                                borderRadius: 14,
                                padding: 18,
                              }}
                            >
                              <p className="text-paragraph mb-0">
                                No approved reviews yet.
                              </p>
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid #eee",
                                borderRadius: 14,
                                padding: 18,
                              }}
                            >
                              <div
                                style={{
                                  maxHeight: 520, // a bit taller since it’s on the right now
                                  overflow: "auto",
                                  paddingRight: 6,
                                }}
                              >
                                <div style={{ display: "grid", gap: 14 }}>
                                  {reviews.map((r) => (
                                    <ReviewCard key={r.id} r={r} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Shipping / Return keep your current code as is */}
                <div
                  className={`widget-content-inner ${
                    currentTab === 3 ? "active" : ""
                  }`}
                >
                  {/* ...your shipping content... */}
                </div>

                <div
                  className={`widget-content-inner ${
                    currentTab === 4 ? "active" : ""
                  }`}
                >
                  {/* ...your return policies content... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
