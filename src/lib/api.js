/* =========================================================
   BASE URL
   ========================================================= */
const API_BASE_URL = 'http://localhost:8000/api';

/* =========================================================
   Helpers
   ========================================================= */
function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token'); // ✅ IMPORTANT (was "token")
}

async function readJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

/* =========================================================
   AUTH (TOKEN)
   ========================================================= */
export async function apiRegister(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await readJson(res);
  if (!res.ok) throw new Error(json?.message || 'Register failed');
  return json; // { user, token }
}

export async function apiLogin(payload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await readJson(res);
  if (!res.ok) throw new Error(json?.message || 'Login failed');
  return json; // { user, token }
}

export async function apiMe() {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (res.status === 401) return null;
  const json = await readJson(res);
  return json?.user ?? null;
}

export async function apiLogout() {
  const token = getToken();

  // ✅ even if no token, just clear local
  if (!token) return true;

  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  return res.ok;
}

/* =========================================================
   NAVBAR
   ========================================================= */
export async function fetchNavbar() {
  const res = await fetch(`${API_BASE_URL}/navbar`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch navbar data');
  return res.json();
}

export async function fetchBestSellers(limit = 4) {
  const res = await fetch(`${API_BASE_URL}/products/best-sellers?limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) return { products: [] };
  const json = await res.json();
  return { products: json.data ?? [] };
}

/* =========================================================
   PRODUCTS
   ========================================================= */
export default async function fetchAllProducts(filters = {}) {
  try {
    const params = new URLSearchParams();

    params.append('page', String(filters.page ?? 1));
    params.append('per_page', String(filters.per_page ?? 12));

    if (filters.category_slug) params.append('category_slug', filters.category_slug);
    if (filters.availability) params.append('availability', filters.availability);
    if (filters.price_min) params.append('price_min', filters.price_min);
    if (filters.price_max) params.append('price_max', filters.price_max);

    if (filters.brand_ids?.length) params.append('brand_ids', filters.brand_ids.join(','));
    if (filters.product_type_ids?.length) params.append('product_type_ids', filters.product_type_ids.join(','));
    if (filters.skin_type_ids?.length) params.append('skin_type_ids', filters.skin_type_ids.join(','));
    if (filters.target_group_ids?.length) params.append('target_group_ids', filters.target_group_ids.join(','));

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');

    const json = await res.json();
    return { products: json.data ?? [], meta: json.meta ?? null, links: json.links ?? null };
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
  const res = await fetch(`${API_BASE_URL}/products/related/${productId}?limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) return { products: [] };
  const json = await res.json();
  return { products: json.data ?? [] };
}

export async function fetchProductsByIds(ids = []) {
  if (!ids.length) return { products: [] };

  const res = await fetch(`${API_BASE_URL}/products/by-ids?ids=${ids.join(',')}`, { cache: 'no-store' });
  if (!res.ok) return { products: [] };

  const json = await res.json();
  return { products: json.data ?? [] };
}

/* =========================================================
   CART (SESSION for guests + TOKEN for logged users)
   ========================================================= */
async function cartFetch(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include', // keep, for guest session cart
    cache: 'no-store',
  });

  const json = await readJson(res);
  if (!res.ok) {
    const msg = json?.message || (json?.errors ? Object.values(json.errors).flat().join(' ') : '') || 'Request failed';
    throw new Error(msg);
  }
  return json;
}

export async function fetchCart() {
  return cartFetch('/cart');
}
export async function addCartItem(productId, quantity = 1) {
  return cartFetch('/cart/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}
export async function updateCartItem(itemId, quantity) {
  return cartFetch(`/cart/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
}
export async function removeCartItem(itemId) {
  return cartFetch(`/cart/items/${itemId}`, { method: 'DELETE' });
}
export async function clearCart() {
  return cartFetch('/cart', { method: 'DELETE' });
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
