'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelect from '../common/LanguageSelect';
import CurrencySelect from '../common/CurrencySelect';
import { fetchNavbar, apiLogout } from '../../src/lib/api';

export default function MobileMenu() {
  const [menus, setMenus] = useState([]);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  const loadAuthFromStorage = () => {
    try {
      const rawUser = localStorage.getItem('auth_user');
      setUser(rawUser ? JSON.parse(rawUser) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchNavbar().then(setMenus).catch(console.error);
  }, []);

  useEffect(() => {
    loadAuthFromStorage();

    const handler = () => loadAuthFromStorage();
    window.addEventListener('auth:changed', handler);

    return () => window.removeEventListener('auth:changed', handler);
  }, []);

  const hideOffcanvas = useCallback(() => {
    try {
      const bs = require('bootstrap');
      const el = document.getElementById('mobileMenu');
      const inst = bs?.Offcanvas?.getInstance(el);
      inst?.hide();
    } catch (e) {
      // ignore if bootstrap not available
    }
  }, []);

  const go = useCallback(
    (href) => {
      if (!href || href === '#') return;
      router.push(href);
      hideOffcanvas();
    },
    [router, hideOffcanvas],
  );

  const handleLogout = useCallback(async () => {
    try {
      setLoggingOut(true);

      // ✅ backend logout (token) - apiLogout reads auth_token internally
      await apiLogout();

      // ✅ clear auth keys used by Login/Register
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');

      // ✅ cleanup old key if you ever used it
      localStorage.removeItem('token');

      setUser(null);

      window.dispatchEvent(new Event('auth:changed'));

      // ✅ navigate away (optional)
      go('/');
    } catch (e) {
      console.error(e);
      alert(e?.message || 'Logout failed');
    } finally {
      setLoggingOut(false);
    }
  }, [go]);

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close" />

      <div className="mb-canvas-content">
        <div className="mb-body">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            {menus.map((mainMenu, i) => {
              const mainId = `mb-main-${i}`;

              return (
                <li key={i} className="nav-mb-item">
                  {/* Level 1 row */}
                  <div className="d-flex align-items-center justify-content-between">
                    {/* ✅ navigate */}
                    <a
                      href={mainMenu.href || '#'}
                      className="mb-menu-link"
                      style={{ flex: 1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        go(mainMenu.href);
                      }}>
                      <span>{mainMenu.label}</span>
                    </a>

                    {/* ✅ toggle collapse (separate click target) */}
                    <button
                      type="button"
                      className="btn-open-sub"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${mainId}`}
                      aria-controls={mainId}
                      aria-expanded="false"
                      style={{
                        width: 42,
                        background: 'transparent',
                        border: 'none',
                      }}
                    />
                  </div>

                  <div id={mainId} className="collapse">
                    <ul className="sub-nav-menu">
                      {mainMenu.menu.map((col, j) => {
                        const colId = `mb-col-${i}-${j}`;

                        return (
                          <li key={j}>
                            {/* Level 2 row */}
                            <div className="d-flex align-items-center justify-content-between">
                              {/* ✅ navigate */}
                              <a
                                href={col.href || '#'}
                                className="sub-nav-link"
                                style={{ flex: 1 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  go(col.href);
                                }}>
                                <span>{col.heading}</span>
                              </a>

                              {/* ✅ toggle collapse */}
                              <button
                                type="button"
                                className="btn-open-sub"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${colId}`}
                                aria-controls={colId}
                                aria-expanded="false"
                                style={{
                                  width: 42,
                                  background: 'transparent',
                                  border: 'none',
                                }}
                              />
                            </div>

                            <div id={colId} className="collapse">
                              <ul className="sub-nav-menu sub-menu-level-2">
                                {col.links.map((link, k) => (
                                  <li key={k}>
                                    {/* Level 3 ✅ navigate */}
                                    <a
                                      href={link.href}
                                      className="sub-nav-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        go(link.href);
                                      }}>
                                      {link.text}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}

            {/* Optional static links */}
            <li className="nav-mb-item">
              <a
                href="/shop-default"
                className="mb-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  go('/shop-default');
                }}>
                Shop
              </a>
            </li>
          </ul>

          <div className="mb-other-content">
            <div className="d-flex group-icon">
              <a href="#canvasSearch" data-bs-toggle="offcanvas" className="site-nav-icon">
                <i className="icon icon-search" />
                Search
              </a>
            </div>

            <div className="mb-notice">
              <a
                href="/contact-1"
                className="text-need"
                onClick={(e) => {
                  e.preventDefault();
                  go('/contact-1');
                }}>
                Need help ?
              </a>
            </div>
          </div>
        </div>

        <div className="mb-bottom">
          {/* ✅ Auth section */}
          {!user ? (
            <a
              href="/login"
              className="site-nav-icon"
              onClick={(e) => {
                e.preventDefault();
                go('/login');
              }}>
              <i className="icon icon-account" />
              Login
            </a>
          ) : (
            <div className="d-flex flex-column gap-2">
              <a
                href="/my-account"
                className="site-nav-icon"
                onClick={(e) => {
                  e.preventDefault();
                  go('/my-account');
                }}>
                <i className="icon icon-account" />
                My Account
              </a>

              <a
                href="#"
                className="site-nav-icon text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  if (!loggingOut) handleLogout();
                }}
                style={{ cursor: loggingOut ? 'not-allowed' : 'pointer' }}>
                <i className="icon icon-logout" />
                {loggingOut ? 'Logging out...' : 'Logout'}
              </a>
            </div>
          )}

          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect parentClassName={'image-select center style-default type-languages'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
