'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiRegister } from '@/src/lib/api';

export default function Register() {
  const router = useRouter();

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    if (password !== password2) {
      setErr('Password and Confirm Password must match.');
      return;
    }

    setLoading(true);

    try {
      const name = `${first} ${last}`.trim();

      const { user, token } = await apiRegister({
        name,
        email,
        password,
        password_confirmation: password2,
      });

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      window.dispatchEvent(new Event('auth:changed'));

      router.push('/my-account'); // change if you want
    } catch (e2) {
      setErr(e2?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click
              unsubscribe in our emails
            </p>
          </div>

          {err ? <div style={{ color: 'red', marginBottom: 12 }}>{err}</div> : null}

          <div>
            <form onSubmit={onSubmit} id="register-form" acceptCharset="utf-8">
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  autoComplete="given-name"
                />
                <label className="tf-field-label fw-4 text_black-2">First name</label>
              </div>

              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  autoComplete="family-name"
                />
                <label className="tf-field-label fw-4 text_black-2">Last name</label>
              </div>

              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <label className="tf-field-label fw-4 text_black-2">Email *</label>
              </div>

              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <label className="tf-field-label fw-4 text_black-2">Password *</label>
              </div>

              <div className="tf-field style-1 mb_30">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                />
                <label className="tf-field-label fw-4 text_black-2">Confirm Password *</label>
              </div>

              <div className="mb_20">
                <button
                  type="submit"
                  disabled={loading}
                  className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center">
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>

              <div className="text-center">
                <Link href="/login" className="tf-btn btn-line">
                  Already have an account? Log in here <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
