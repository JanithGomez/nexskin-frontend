export const openReviewModal = (productId) => {
  if (typeof window === "undefined") return;

  // store productId globally (same idea as cart state)
  window.__REVIEW_PRODUCT_ID__ = productId;

  const bootstrap = require("bootstrap");

  // close any open modal
  document.querySelectorAll(".modal.show").forEach((modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  });

  // close any open offcanvas
  document.querySelectorAll(".offcanvas.show").forEach((offcanvas) => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    if (offcanvasInstance) offcanvasInstance.hide();
  });

  const el = document.getElementById("review_modal");
  if (!el) return;

  const modal = new bootstrap.Modal(el, { keyboard: false });
  modal.show();

  el.addEventListener("hidden.bs.modal", () => {
    modal.hide();
  });
};
