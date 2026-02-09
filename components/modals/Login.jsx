'use client';
import React, { useState } from 'react';
import { apiLogin } from '@/src/lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const closeModal = () => {
    try {
      const bootstrap = require('bootstrap');
      const el = document.getElementById('login');
      if (!el) return;

      // If modal instance exists, hide it
      let instance = bootstrap.Modal.getInstance(el);

      // If not exists, create then hide (safe)
      if (!instance) instance = new bootstrap.Modal(el);

      instance.hide();
    } catch {}
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const { user, token } = await apiLogin({ email, password });

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      // ✅ Notify header (and any component) that auth changed
      window.dispatchEvent(new Event('auth:changed'));

      closeModal();
    } catch (e) {
      setErr(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="login"
      tabIndex={-1}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Log in</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>

          <div className="tf-login-form">
            <form onSubmit={onSubmit} acceptCharset="utf-8">
              {err ? <div style={{ color: 'red', marginBottom: 10 }}>{err}</div> : null}

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <label className="tf-field-label">Email *</label>
              </div>

              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <label className="tf-field-label">Password *</label>
              </div>

              <div>
                <a href="#forgotPassword" data-bs-toggle="modal" className="btn-link link">
                  Forgot your password?
                </a>
              </div>

              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center">
                    <span>{loading ? 'Logging in...' : 'Log in'}</span>
                  </button>
                </div>

                <div className="w-100">
                  <a href="#register" data-bs-toggle="modal" className="btn-link fw-6 w-100 link">
                    New customer? Create your account <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
