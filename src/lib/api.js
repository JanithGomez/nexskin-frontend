const API_BASE_URL = 'http://localhost:8000/api';

/* ================= AUTH ================= */

export async function apiRegister(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Register failed');
  return json; // { user, token }
}

export async function apiLogin(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Login failed');
  return json; // { user, token }
}

export async function apiMe(token) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error('Not authenticated');
  return json; // { user }
}

export async function apiLogout(token) {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error('Logout failed');
  return json;
}

/* ================= NAVBAR ================= */

export async function fetchNavbar() {
  const res = await fetch(`${API_BASE_URL}/navbar`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch navbar data');
  }

  return res.json();
}

/* ================= PRODUCTS ================= */

// export default async function fetchAllProducts(filters = {}) {
//   try {
//     const params = new URLSearchParams();

//     // pagination
//     params.append('page', String(filters.page ?? 1));
//     params.append('per_page', String(filters.per_page ?? 12));

//     // filters
//     if (filters.availability) params.append('availability', filters.availability);
//     if (filters.price_min) params.append('price_min', filters.price_min);
//     if (filters.price_max) params.append('price_max', filters.price_max);

//     if (filters.brand_ids?.length) params.append('brand_ids', filters.brand_ids.join(','));
//     if (filters.product_type_ids?.length) params.append('product_type_ids', filters.product_type_ids.join(','));
//     if (filters.skin_type_ids?.length) params.append('skin_type_ids', filters.skin_type_ids.join(','));
//     if (filters.target_group_ids?.length) params.append('target_group_ids', filters.target_group_ids.join(','));

//     const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) throw new Error('Failed to fetch products');

//     const json = await res.json();

//     // Laravel paginator returns {data, meta, links}
//     return {
//       products: json.data ?? [],
//       meta: json.meta ?? null,
//       links: json.links ?? null,
//     };
//   } catch (err) {
//     console.error('Fetch Error:', err);
//     return { products: [], meta: null, links: null };
//   }
// }

export default async function fetchAllProducts(filters = {}) {
  try {
    const params = new URLSearchParams();

    // pagination
    params.append('page', String(filters.page ?? 1));
    params.append('per_page', String(filters.per_page ?? 12));

    // ✅ category filter (NEW)
    if (filters.category_slug) params.append('category_slug', filters.category_slug);

    // filters
    if (filters.availability) params.append('availability', filters.availability);
    if (filters.price_min) params.append('price_min', filters.price_min);
    if (filters.price_max) params.append('price_max', filters.price_max);

    if (filters.brand_ids?.length) params.append('brand_ids', filters.brand_ids.join(','));
    if (filters.product_type_ids?.length) params.append('product_type_ids', filters.product_type_ids.join(','));
    if (filters.skin_type_ids?.length) params.append('skin_type_ids', filters.skin_type_ids.join(','));
    if (filters.target_group_ids?.length) params.append('target_group_ids', filters.target_group_ids.join(','));

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const json = await res.json();

    return {
      products: json.data ?? [],
      meta: json.meta ?? null,
      links: json.links ?? null,
    };
  } catch (err) {
    console.error('Fetch Error:', err);
    return { products: [], meta: null, links: null };
  }
}

export async function fetchProductDetails(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
}

export async function fetchRelatedProducts(productId, limit = 8) {
  const res = await fetch(`${API_BASE_URL}/products/related/${productId}?limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) return { products: [] };
  const json = await res.json();
  return { products: json.data ?? [] };
}

export async function fetchProductsByIds(ids = []) {
  if (!ids.length) return { products: [] };

  const res = await fetch(`${API_BASE_URL}/products/by-ids?ids=${ids.join(',')}`, {
    cache: 'no-store',
  });
  if (!res.ok) return { products: [] };
  const json = await res.json();
  return { products: json.data ?? [] };
}

export async function submitReview(productId, payload) {
  const form = new FormData();
  form.append('rating', String(payload.rating));
  if (payload.review_title) form.append('review_title', payload.review_title);
  if (payload.comment) form.append('comment', payload.comment);

  form.append('is_anonymous', payload.is_anonymous ? '1' : '0');

  if (!payload.is_anonymous) {
    if (payload.guest_name) form.append('guest_name', payload.guest_name);
    if (payload.guest_email) form.append('guest_email', payload.guest_email);
  }

  // media: File[]
  if (payload.media?.length) {
    payload.media.forEach((file) => form.append('media[]', file));
  }

  const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // DON'T set Content-Type manually for FormData
    },
    body: form,
  });

  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {}

  if (!res.ok) {
    const msg =
      json?.message || (json?.errors ? Object.values(json.errors).flat().join(' ') : '') || 'Failed to submit review';
    throw new Error(msg);
  }

  return json;
}
