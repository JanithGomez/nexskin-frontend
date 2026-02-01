// src/lib/auth.js
const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/api`;

// Get Sanctum CSRF cookie (required for session auth)
export async function getCsrfCookie() {
  await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
}

// Login
export async function loginUser({ email, password }) {
  await getCsrfCookie();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.message || "Login failed");
  }

  return json; // expected: { user: {...}, message?: "..." }
}

// Register
export async function registerUser({
  name,
  email,
  password,
  password_confirmation,
}) {
  await getCsrfCookie();

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      json?.message ||
      (json?.errors ? Object.values(json.errors).flat().join(" ") : "") ||
      "Register failed";
    throw new Error(msg);
  }

  return json; // expected: { user: {...} }
}

// Me
export async function fetchMe() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (res.status === 401) return null;

  const json = await res.json().catch(() => ({}));
  return json?.user ?? null;
}

// Logout
export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  return res.ok;
}
