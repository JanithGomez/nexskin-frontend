'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { usePathname } from 'next/navigation';

import { ProductCard } from '../shopCards/ProductCard';
import { blogLinks, pages } from '@/data/menu';

// ✅ APIs
import { fetchNavbar, fetchBestSellers } from '@/src/lib/api';

export default function Nav({ isArrow = true, textColor = '', Linkfs = '' }) {
  const pathname = usePathname();

  const isMenuActive = (menuItem) => {
    let active = false;

    if (menuItem?.href?.includes('/')) {
      if (menuItem.href.split('/')[1] === pathname.split('/')[1]) active = true;
    }

    if (Array.isArray(menuItem)) {
      active = menuItem.some((elm) => elm.href?.split('/')[1] === pathname.split('/')[1]);
    }

    if (Array.isArray(menuItem)) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2?.href?.includes('/')) {
            if (elm2.href.split('/')[1] === pathname.split('/')[1]) active = true;
          }
          if (Array.isArray(elm2)) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3?.href?.split('/')[1] === pathname.split('/')[1]) active = true;
              });
            });
          }
        });

        if (item?.href?.includes('/')) {
          if (item.href.split('/')[1] === pathname.split('/')[1]) active = true;
        }
      });
    }

    return active;
  };

  const [menus, setMenus] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetchNavbar().then(setMenus).catch(console.error);

    fetchBestSellers(4)
      .then((r) => setBestSellers(r.products || []))
      .catch(console.error);
  }, []);

  return (
    <>
      {/* ✅ MAIN MENU (dynamic) */}
      {menus.map((mainMenu, idx) => {
        const hasMega = Array.isArray(mainMenu.menu) && mainMenu.menu.length > 0;

        // ✅ unique navigation classes per menu item (fixes swiper issue)
        const prevClass = `snmpn-${idx}`;
        const nextClass = `snmnn-${idx}`;

        return (
          <li className="menu-item" key={idx}>
            {/* ✅ If no children => no dropdown arrow and no mega menu */}
            <Link
              href={mainMenu.href || '#'}
              className={`item-link ${Linkfs} ${textColor} `}
              onClick={(e) => {
                if (!mainMenu.href || mainMenu.href === '#') e.preventDefault();
              }}
              style={{ whiteSpace: 'nowrap' }} // ✅ keep one line
            >
              {mainMenu.label}
              {hasMega && isArrow ? <i className="icon icon-arrow-down" /> : null}
            </Link>

            {/* ✅ ONLY render mega menu if there are children */}
            {hasMega ? (
              <div className="sub-menu mega-menu">
                <div className="container">
                  <div className="row">
                    {/* ✅ Show 2nd layer (heading) + links */}
                    {mainMenu.menu.map((col, i) => {
                      const links = Array.isArray(col.links) ? col.links : [];
                      const showHeading = !!col.heading && col.heading !== mainMenu.label; // ✅ avoid duplicate text

                      return (
                        <div className="col-lg-2" key={i}>
                          <div className="mega-menu-item">
                            {/* ✅ second layer heading */}
                            {showHeading ? (
                              col.href ? (
                                <Link
                                  href={col.href}
                                  className="menu-heading"
                                  style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                  {col.heading}
                                </Link>
                              ) : (
                                <div className="menu-heading" style={{ whiteSpace: 'nowrap' }}>
                                  {col.heading}
                                </div>
                              )
                            ) : null}

                            {/* ✅ third layer links */}
                            {links.length ? (
                              <ul className="menu-list">
                                {links.map((link, j) => (
                                  <li key={j}>
                                    <Link href={link.href} className="menu-link-text" style={{ whiteSpace: 'nowrap' }}>
                                      {link.text}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}

                    {/* ✅ REAL best sellers from backend */}
                    <div className="col-lg-4">
                      <div className="menu-heading" style={{ whiteSpace: 'nowrap' }}>
                        Best seller
                      </div>

                      {bestSellers?.length ? (
                        <div className="hover-sw-nav hover-sw-2">
                          <Swiper
                            dir="ltr"
                            modules={[Navigation]}
                            navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
                            slidesPerView={2}
                            spaceBetween={30}
                            className="swiper tf-product-header wrap-sw-over">
                            {bestSellers.slice(0, 4).map((p, k) => (
                              <SwiperSlide key={p.id ?? k} className="swiper-slide">
                                <ProductCard product={p} />
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <div
                            className={`nav-sw nav-next-slider nav-next-product-header box-icon w_46 round ${prevClass}`}>
                            <span className="icon icon-arrow-left" />
                          </div>
                          <div
                            className={`nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round ${nextClass}`}>
                            <span className="icon icon-arrow-right" />
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: 12, opacity: 0.7, fontSize: 13 }}>No best sellers yet.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </li>
        );
      })}

      {/* Profile */}
      <li className="menu-item position-relative">
        <a href="#" className={`item-link ${Linkfs} ${textColor}  ${isMenuActive(pages) ? 'activeMenu' : ''}`}>
          Profile
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {pages.map((item, index) => (
              <li key={index} className={item.links ? 'menu-item-2 ' : ''}>
                {item.href.includes('#') ? (
                  <a href={item.href} className={`${item.className} ${isMenuActive(item.links) ? 'activeMenu' : ''}`}>
                    {item.text}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`${item.className}  ${isMenuActive(item) ? 'activeMenu' : ''}`}
                    style={{ position: 'relative' }}>
                    {item.text}{' '}
                    {item.label && (
                      <div className="demo-label">
                        <span className="demo-new">{item.label}</span>
                      </div>
                    )}
                  </Link>
                )}

                {item.links && (
                  <div className="sub-menu submenu-default">
                    <ul className="menu-list">
                      {item.links.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`${subItem.className} ${isMenuActive(subItem) ? 'activeMenu' : ''}`}>
                            {subItem.text}
                            {subItem.label && (
                              <div className="demo-label">
                                <span className="demo-new">{subItem.label}</span>
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>

      {/* Blog */}
      <li className="menu-item position-relative">
        <a href="#" className={`item-link ${Linkfs} ${textColor}  ${isMenuActive(blogLinks) ? 'activeMenu' : ''}`}>
          Blog
          {isArrow ? <i className="icon icon-arrow-down" /> : ''}
        </a>
        <div className="sub-menu links-default">
          <ul className="menu-list">
            {blogLinks.map((linkItem, index) => (
              <li key={index}>
                <Link
                  href={linkItem.href}
                  className={`menu-link-text link text_black-2  ${isMenuActive(linkItem) ? 'activeMenu' : ''}`}>
                  {linkItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
}
