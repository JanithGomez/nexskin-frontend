// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import LanguageSelect from '../common/LanguageSelect';
// import CurrencySelect from '../common/CurrencySelect';
// import { fetchNavbar } from '../../src/lib/api';

// export default function MobileMenu() {
//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     fetchNavbar().then(setMenus).catch(console.error);
//   }, []);

//   return (
//     <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
//       <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close" />

//       <div className="mb-canvas-content">
//         <div className="mb-body">
//           <ul className="nav-ul-mb" id="wrapper-menu-navigation">
//             {menus.map((mainMenu, i) => {
//               const mainId = `mb-main-${i}`;

//               return (
//                 <li key={i} className="nav-mb-item">
//                   {/* ✅ row: left = link, right = toggle */}
//                   <div className="d-flex align-items-center justify-content-between">
//                     <Link
//                       href={mainMenu.href || '#'}
//                       className="mb-menu-link"
//                       data-bs-dismiss="offcanvas"
//                       style={{ flex: 1 }}>
//                       {mainMenu.label}
//                     </Link>

//                     <a
//                       href={`#${mainId}`}
//                       className="btn-open-sub"
//                       data-bs-toggle="collapse"
//                       aria-expanded="false"
//                       aria-controls={mainId}
//                       onClick={(e) => e.preventDefault()}
//                       style={{ width: 42, textAlign: 'right' }}
//                     />
//                   </div>

//                   <div id={mainId} className="collapse">
//                     <ul className="sub-nav-menu">
//                       {mainMenu.menu.map((col, j) => {
//                         const colId = `mb-col-${i}-${j}`;

//                         return (
//                           <li key={j}>
//                             <div className="d-flex align-items-center justify-content-between">
//                               {/* ✅ level 2 link */}
//                               <Link
//                                 href={col.href || '#'}
//                                 className="sub-nav-link"
//                                 data-bs-dismiss="offcanvas"
//                                 style={{ flex: 1 }}>
//                                 {col.heading}
//                               </Link>

//                               {/* toggle level 2 children */}
//                               <a
//                                 href={`#${colId}`}
//                                 className="btn-open-sub"
//                                 data-bs-toggle="collapse"
//                                 aria-expanded="false"
//                                 aria-controls={colId}
//                                 onClick={(e) => e.preventDefault()}
//                                 style={{ width: 42, textAlign: 'right' }}
//                               />
//                             </div>

//                             <div id={colId} className="collapse">
//                               <ul className="sub-nav-menu sub-menu-level-2">
//                                 {col.links.map((link, k) => (
//                                   <li key={k}>
//                                     <Link href={link.href} className="sub-nav-link" data-bs-dismiss="offcanvas">
//                                       {link.text}
//                                     </Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>

//           <div className="mb-other-content">
//             <div className="d-flex group-icon">
//               <Link href={`/wishlist`} className="site-nav-icon" data-bs-dismiss="offcanvas">
//                 <i className="icon icon-heart" />
//                 Wishlist
//               </Link>
//               <Link href={`/home-search`} className="site-nav-icon" data-bs-dismiss="offcanvas">
//                 <i className="icon icon-search" />
//                 Search
//               </Link>
//             </div>

//             <div className="mb-notice">
//               <Link href={`/contact-1`} className="text-need" data-bs-dismiss="offcanvas">
//                 Need help ?
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="mb-bottom">
//           <Link href={`/login`} className="site-nav-icon" data-bs-dismiss="offcanvas">
//             <i className="icon icon-account" />
//             Login
//           </Link>

//           <div className="bottom-bar-language">
//             <div className="tf-currencies">
//               <CurrencySelect />
//             </div>
//             <div className="tf-languages">
//               <LanguageSelect parentClassName={'image-select center style-default type-languages'} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelect from '../common/LanguageSelect';
import CurrencySelect from '../common/CurrencySelect';
import { fetchNavbar } from '../../src/lib/api';

export default function MobileMenu() {
  const [menus, setMenus] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchNavbar().then(setMenus).catch(console.error);
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

            {/* Optional static links (use router push too if you want) */}
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
              <a
                href="/wishlist"
                className="site-nav-icon"
                onClick={(e) => {
                  e.preventDefault();
                  go('/wishlist');
                }}>
                <i className="icon icon-heart" />
                Wishlist
              </a>

              <a
                href="/home-search"
                className="site-nav-icon"
                onClick={(e) => {
                  e.preventDefault();
                  go('/home-search');
                }}>
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
