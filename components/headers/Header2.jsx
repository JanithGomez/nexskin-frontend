'use client';

import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import CartLength from '../common/CartLength';
import WishlistLength from '../common/WishlistLength';
import { apiLogout } from '@/src/lib/api';

export default function Header2({ textClass, bgColor = '', uppercase = false, isArrow = true, Linkfs = '' }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadAuthFromStorage = () => {
    try {
      const rawUser = localStorage.getItem('auth_user');
      const rawToken = localStorage.getItem('auth_token');
      setUser(rawUser ? JSON.parse(rawUser) : null);
      setToken(rawToken || null);
    } catch {
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    loadAuthFromStorage();

    // Update header after login/register/logout
    const handler = () => loadAuthFromStorage();
    window.addEventListener('auth:changed', handler);
    return () => window.removeEventListener('auth:changed', handler);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      // optional: call backend logout if you use token auth
      if (token) {
        await apiLogout(token);
      }

      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      setUser(null);
      setToken(null);

      // close dropdown if open (bootstrap)
      // not required, but nice UX
      const bs = require('bootstrap');
      const toggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
      toggles.forEach((t) => {
        const inst = bs.Dropdown.getInstance(t);
        if (inst) inst.hide();
      });

      window.dispatchEvent(new Event('auth:changed'));
    } catch (e) {
      console.error(e);
      alert(e?.message || 'Logout failed');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header id="header" className={`header-default ${uppercase ? 'header-uppercase' : ''}`}>
      <div className="px_15 lg-px_40">
        <div className="row wrapper-header align-items-center">
          {/* Mobile menu icon */}
          <div className="col-md-4 col-3 tf-lg-hidden">
            <a href="#mobileMenu" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={16} viewBox="0 0 24 16" fill="none">
                <path
                  d="M2.00056 2.28571H16.8577C17.1608 2.28571 17.4515 2.16531 17.6658 1.95098C17.8802 1.73665 18.0006 1.44596 18.0006 1.14286C18.0006 0.839753 17.8802 0.549063 17.6658 0.334735C17.4515 0.120408 17.1608 0 16.8577 0H2.00056C1.69745 0 1.40676 0.120408 1.19244 0.334735C0.978109 0.549063 0.857702 0.839753 0.857702 1.14286C0.857702 1.44596 0.978109 1.73665 1.19244 1.95098C1.40676 2.16531 1.69745 2.28571 2.00056 2.28571ZM0.857702 8C0.857702 7.6969 0.978109 7.40621 1.19244 7.19188C1.40676 6.97755 1.69745 6.85714 2.00056 6.85714H22.572C22.8751 6.85714 23.1658 6.97755 23.3801 7.19188C23.5944 7.40621 23.7148 7.6969 23.7148 8C23.7148 8.30311 23.5944 8.59379 23.3801 8.80812C23.1658 9.02245 22.8751 9.14286 22.572 9.14286H2.00056C1.69745 9.14286 1.40676 9.02245 1.19244 8.80812C0.978109 8.59379 0.857702 8.30311 0.857702 8ZM0.857702 14.8571C0.857702 14.554 0.978109 14.2633 1.19244 14.049C1.40676 13.8347 1.69745 13.7143 2.00056 13.7143H12.2863C12.5894 13.7143 12.8801 13.8347 13.0944 14.049C13.3087 14.2633 13.4291 14.554 13.4291 14.8571C13.4291 15.1602 13.3087 15.4509 13.0944 15.6653C12.8801 15.8796 12.5894 16 12.2863 16H2.00056C1.69745 16 1.40676 15.8796 1.19244 15.6653C0.978109 15.4509 0.857702 15.1602 0.857702 14.8571Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          {/* Logo */}
          <div className="col-xl-3 col-md-4 col-6">
            <Link href={`/`} className="logo-header">
              <h4>NEXSKIN</h4>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="col-xl-6 tf-md-hidden">
            <nav className="box-navigation text-center">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                <Nav isArrow={isArrow} Linkfs={Linkfs} />
              </ul>
            </nav>
          </div>

          {/* Icons */}
          <div className="col-xl-3 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
              {/* search */}
              <li className="nav-search">
                <a
                  href="#canvasSearch"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasLeft"
                  className="nav-icon-item">
                  <i className="icon icon-search" />
                </a>
              </li>

              {/* ✅ account */}
              <li className="nav-account dropdown">
                {!user ? (
                  // Logged out -> open Login modal
                  <a href="#login" data-bs-toggle="modal" className="nav-icon-item" title="Login">
                    <i className="icon icon-account" />
                  </a>
                ) : (
                  // Logged in -> dropdown
                  <>
                    <a
                      href="#"
                      className="nav-icon-item"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      title="My Account"
                      onClick={(e) => e.preventDefault()}>
                      <i className="icon icon-account" />
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end p-2">
                      <li className="px-3 py-2" style={{ minWidth: 220 }}>
                        <div style={{ fontWeight: 600 }}>{user?.name || 'Customer'}</div>
                        <div style={{ fontSize: 12, opacity: 0.7 }}>{user?.email}</div>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/account">
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/orders">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                          disabled={loggingOut}
                          style={{ cursor: loggingOut ? 'not-allowed' : 'pointer' }}>
                          {loggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                      </li>
                    </ul>
                  </>
                )}
              </li>

              {/* wishlist */}
              <li className="nav-wishlist">
                <Link href={`/wishlist`} className="nav-icon-item">
                  <i className="icon icon-heart" />
                  <span className={`count-box ${bgColor} ${textClass}`}>
                    <WishlistLength />
                  </span>
                </Link>
              </li>

              {/* cart */}
              <li className="nav-cart">
                <a href="#shoppingCart" data-bs-toggle="modal" className="nav-icon-item">
                  <i className="icon icon-bag" />
                  <span className={`count-box ${bgColor} ${textClass}`}>
                    <CartLength />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
