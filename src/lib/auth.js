// src/lib/auth.js
const BASE_URL = 'http://localhost:8000';
const API_URL = `${BASE_URL}/api`;

function setToken(token) {
  if (typeof window === 'undefined') return;
  if (token)
    localStorage.setItem('auth_token', token); // ✅ use auth_token
  else localStorage.removeItem('auth_token');
}

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token'); // ✅ use auth_token
}

async function readJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await readJson(res);
  if (!res.ok) throw new Error(json?.message || 'Login failed');

  if (json?.token) setToken(json.token);
  return json?.user ?? null;
}

export async function registerUser({ name, email, password, password_confirmation }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  const json = await readJson(res);
  if (!res.ok) {
    const msg = json?.message || (json?.errors ? Object.values(json.errors).flat().join(' ') : '') || 'Register failed';
    throw new Error(msg);
  }

  if (json?.token) setToken(json.token);
  return json?.user ?? null;
}

export async function fetchMe() {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (res.status === 401) {
    setToken(null);
    return null;
  }

  const json = await readJson(res);
  return json?.user ?? null;
}

export async function logoutUser() {
  const token = getToken();

  if (!token) {
    setToken(null);
    return true;
  }

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });

  setToken(null);
  return res.ok;
}
