"use client";

import { useEffect, useState } from "react";
import { submitReview } from "@/src/lib/api";

// export default function ReviewModal({ productId }) {

export default function ReviewModal() {
  const productId =
    typeof window !== "undefined" ? window.__REVIEW_PRODUCT_ID__ : null;

  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [comment, setComment] = useState("");

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const [mediaFiles, setMediaFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // ✅ reset form when modal closes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = document.getElementById("review_modal");
    if (!el) return;

    const handler = () => {
      setRating(5);
      setReviewTitle("");
      setComment("");
      setIsAnonymous(false);
      setGuestName("");
      setGuestEmail("");
      setMediaFiles([]);
      setMsg("");
      setErr("");
      setLoading(false);
    };

    el.addEventListener("hidden.bs.modal", handler);
    return () => el.removeEventListener("hidden.bs.modal", handler);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!productId) {
      setErr("Product not found.");
      return;
    }

    if (!isAnonymous && !guestName.trim()) {
      setErr("Name is required unless posting as anonymous.");
      return;
    }

    setLoading(true);
    try {
      await submitReview(productId, {
        rating,
        review_title: reviewTitle,
        comment,
        is_anonymous: isAnonymous,
        guest_name: isAnonymous ? "" : guestName,
        guest_email: isAnonymous ? "" : guestEmail,
        media: mediaFiles, // your submitReview must support FormData if files exist
      });

      setMsg(
        "Thanks! Your review was submitted and will appear after admin approval."
      );
      // keep form filled or clear immediately (your choice):
      // clearing here is ok, but also we reset on modal close anyway
      setRating(5);
      setReviewTitle("");
      setComment("");
      setIsAnonymous(false);
      setGuestName("");
      setGuestEmail("");
      setMediaFiles([]);
    } catch (e2) {
      setErr(e2?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="modal fade modalDemo tf-product-modal"
      id="review_modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* ✅ header like other modals */}
          <div className="header">
            <div className="demo-title">Write a review</div>

            {/* ✅ close icon like FindSize */}
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
              aria-label="Close"
              role="button"
              tabIndex={0}
            />
          </div>

          {/* ✅ body */}
          <div
            className="tf-rte"
            style={{
              padding: 18,
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            <form onSubmit={onSubmit}>
              {/* Rating */}
              <div className="mb_12">
                <label className="mb_6 d-block">Rating</label>
                <select
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  disabled={loading}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>

              {/* Review Title */}
              <div className="mb_12">
                <label className="mb_6 d-block">Review title</label>
                <input
                  className="form-control"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  disabled={loading}
                  placeholder="Short summary (optional)"
                />
              </div>

              {/* Comment */}
              <div className="mb_12">
                <label className="mb_6 d-block">Comment</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={loading}
                  placeholder="Write your review..."
                />
              </div>

              {/* Media */}
              <div className="mb_12">
                <label className="mb_6 d-block">Media (optional)</label>
                <input
                  className="form-control"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  disabled={loading}
                  onChange={(e) =>
                    setMediaFiles(Array.from(e.target.files || []))
                  }
                />
                <div
                  className="text-paragraph"
                  style={{ fontSize: 12, marginTop: 6 }}
                >
                  Up to 5 files. Images or videos.
                </div>

                {/* Preview selected */}
                {mediaFiles?.length ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    {mediaFiles.slice(0, 6).map((f, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 10,
                          padding: 8,
                          fontSize: 12,
                        }}
                      >
                        {f.name}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Anonymous toggle */}
              <div
                className="mb_12"
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <input
                  type="checkbox"
                  id="is_anonymous_modal"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="is_anonymous_modal" style={{ marginBottom: 0 }}>
                  Post as anonymous
                </label>
              </div>

              {/* Name & email */}
              {!isAnonymous ? (
                <>
                  <div className="mb_12">
                    <label className="mb_6 d-block">Name</label>
                    <input
                      className="form-control"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      disabled={loading}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb_12">
                    <label className="mb_6 d-block">Email (optional)</label>
                    <input
                      className="form-control"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      disabled={loading}
                      placeholder="you@example.com"
                    />
                  </div>
                </>
              ) : (
                <div
                  className="text-paragraph"
                  style={{ fontSize: 12, marginBottom: 12 }}
                >
                  Your name will not be shown publicly.
                </div>
              )}

              {/* Messages */}
              {err ? (
                <div className="mb_12" style={{ color: "#b91c1c" }}>
                  {err}
                </div>
              ) : null}
              {msg ? (
                <div className="mb_12" style={{ color: "#166534" }}>
                  {msg}
                </div>
              ) : null}

              {/* Buttons like theme */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="tf-btn btn-out-line w-50"
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="tf-btn btn-fill w-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit review"}
                </button>
              </div>

              <div
                className="text-paragraph"
                style={{ fontSize: 12, marginTop: 10 }}
              >
                Reviews appear only after admin approval.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
