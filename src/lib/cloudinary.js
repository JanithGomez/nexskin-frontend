// src/lib/cloudinary.js
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpi74yx6m';

function buildUrl(publicId, { width, crop, quality, format }) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_${quality},f_${format},c_${crop},w_${width}/${publicId}`;
}

// Generic (safe default)
export function cldUrl(publicId, options = {}) {
  if (!publicId) return null;

  return buildUrl(publicId, {
    width: options.width ?? 720,
    crop: options.crop ?? 'scale',
    quality: options.quality ?? 'auto',
    format: options.format ?? 'auto',
  });
}

/* ======================
 | Optimized Presets
 ====================== */

// ✅ Product cards (grid + list)
export function cldCard(publicId) {
  if (!publicId) return null;

  return buildUrl(publicId, {
    width: 480,
    crop: 'scale',
    quality: 'auto:eco',
    format: 'auto',
  });
}

// ✅ Hover image (same as card)
export function cldHover(publicId) {
  return cldCard(publicId);
}

// ✅ Thumbnails (PDP thumbs)
export function cldThumb(publicId) {
  if (!publicId) return null;

  return buildUrl(publicId, {
    width: 200,
    crop: 'scale',
    quality: 'auto:eco',
    format: 'auto',
  });
}

// ✅ Main PDP image (good quality)
export function cldMain(publicId) {
  if (!publicId) return null;

  return buildUrl(publicId, {
    width: 770,
    crop: 'scale',
    quality: 'auto',
    format: 'auto',
  });
}

// ✅ Zoom / Lightbox (sharp)
export function cldZoom(publicId) {
  if (!publicId) return null;

  return buildUrl(publicId, {
    width: 1400,
    crop: 'scale',
    quality: 'auto',
    format: 'auto',
  });
}

export function productPlaceholder() {
  return '/images/placeholder.png';
}
