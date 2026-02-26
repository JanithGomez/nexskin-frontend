'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiLogin } from '@/src/lib/api';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const { user, token } = await apiLogin({ email, password });

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      window.dispatchEvent(new Event('auth:changed'));

      router.push('/my-account'); // change if you want
    } catch (e2) {
      setErr(e2?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            {/* Login */}
            <div id="login">
              <h5 className="mb_36">Log in</h5>

              {err ? <div style={{ color: 'red', marginBottom: 12 }}>{err}</div> : null}

              <div>
                <form onSubmit={onSubmit}>
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=" "
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="tf-field-label fw-4 text_black-2">Email *</label>
                  </div>

                  <div className="tf-field style-1 mb_30">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=" "
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="tf-field-label fw-4 text_black-2">Password *</label>
                  </div>

                  <div className="mb_20">
                    {/* if you want a real reset page route, change this to /forgot-password */}
                    <Link href="" className="tf-btn btn-line">
                      Forgot your password?
                    </Link>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center">
                      {loading ? 'Logging in...' : 'Log in'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="tf-login-content">
            <h5 className="mb_36">I'm new here</h5>
            <p className="mb_20">
              Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click
              unsubscribe in our emails.
            </p>

            <Link href="/register" className="tf-btn btn-line">
              Register <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
