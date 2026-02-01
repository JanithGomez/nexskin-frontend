// "use client";
// import Link from "next/link";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { products1 } from "@/data/products";
// import { ProductCard } from "../shopCards/ProductCard";
// import { Navigation } from "swiper/modules";
// import { useEffect, useState } from "react";
// import { fetchNavbar } from "../../src/lib/api";

// import { usePathname } from "next/navigation";

// import { blogLinks, pages } from "@/data/menu";

// export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
//   const pathname = usePathname();
//   const isMenuActive = (menuItem) => {
//     let active = false;
//     if (menuItem.href?.includes("/")) {
//       if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
//         active = true;
//       }
//     }
//     if (menuItem.length) {
//       active = menuItem.some(
//         (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
//       );
//     }
//     if (menuItem.length) {
//       menuItem.forEach((item) => {
//         item.links?.forEach((elm2) => {
//           if (elm2.href?.includes("/")) {
//             if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
//               active = true;
//             }
//           }
//           if (elm2.length) {
//             elm2.forEach((item2) => {
//               item2?.links?.forEach((elm3) => {
//                 if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
//                   active = true;
//                 }
//               });
//             });
//           }
//         });
//         if (item.href?.includes("/")) {
//           if (item.href?.split("/")[1] == pathname.split("/")[1]) {
//             active = true;
//           }
//         }
//       });
//     }

//     return active;
//   };

//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     fetchNavbar().then(setMenus).catch(console.error);
//   }, []);

//   return (
//     <>
//       {" "}

//       {menus.map((mainMenu, idx) => (
//         <li className="menu-item" key={idx}>
//           <a href="#" className="item-link">
//             {mainMenu.label}
//             <i className="icon icon-arrow-down" />
//           </a>

//           <div className="sub-menu mega-menu">
//             <div className="container">
//               <div className="row">
//                 {mainMenu.menu.map((col, i) => (
//                   <div className="col-lg-2" key={i}>
//                     <div className="mega-menu-item">
//                       <div className="menu-heading">{col.heading}</div>
//                       <ul className="menu-list">
//                         {col.links.map((link, j) => (
//                           <li key={j}>
//                             <Link href={link.href} className="menu-link-text">
//                               {link.text}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="col-lg-4">
//                   <div className="menu-heading">Best seller</div>
//                   <div className="hover-sw-nav hover-sw-2">
//                     <Swiper
//                       dir="ltr"
//                       modules={[Navigation]}
//                       navigation={{
//                         prevEl: ".snmpn1",
//                         nextEl: ".snmnn1",
//                       }}
//                       slidesPerView={2}
//                       spaceBetween={30}
//                       className="swiper tf-product-header wrap-sw-over"
//                     >
//                       {[...products1]
//                         .slice(0, 4)

//                         .map((elm, i) => (
//                           <SwiperSlide key={i} className="swiper-slide">
//                             <ProductCard product={elm} />
//                           </SwiperSlide>
//                         ))}
//                     </Swiper>
//                     <div className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round snmpn1">
//                       <span className="icon icon-arrow-left" />
//                     </div>
//                     <div className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round snmnn1">
//                       <span className="icon icon-arrow-right" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//       ))}
//       <li className="menu-item position-relative">
//         <a
//           href="#"
//           className={`item-link ${Linkfs} ${textColor}  ${
//             isMenuActive(pages) ? "activeMenu" : ""
//           }`}
//         >
//           Profile
//           <i className="icon icon-arrow-down" />
//         </a>
//         <div className="sub-menu submenu-default">
//           <ul className="menu-list">
//             {pages.map((item, index) => (
//               <li key={index} className={item.links ? "menu-item-2 " : ""}>
//                 {item.href.includes("#") ? (
//                   <a
//                     href={item.href}
//                     className={`${item.className} ${
//                       isMenuActive(item.links) ? "activeMenu" : ""
//                     }`}
//                   >
//                     {item.text}
//                   </a>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`${item.className}  ${
//                       isMenuActive(item) ? "activeMenu" : ""
//                     }`}
//                     style={{ position: "relative" }}
//                   >
//                     {item.text}{" "}
//                     {item.label && (
//                       <div className="demo-label">
//                         <span className="demo-new">{item.label}</span>
//                       </div>
//                     )}
//                   </Link>
//                 )}

//                 {item.links && (
//                   <div className="sub-menu submenu-default">
//                     <ul className="menu-list">
//                       {item.links.map((subItem, subIndex) => (
//                         <li key={subIndex}>
//                           <Link
//                             href={subItem.href}
//                             className={`${subItem.className} ${
//                               isMenuActive(subItem) ? "activeMenu" : ""
//                             }`}
//                           >
//                             {subItem.text}
//                             {subItem.label && (
//                               <div className="demo-label">
//                                 <span className="demo-new">
//                                   {subItem.label}
//                                 </span>
//                               </div>
//                             )}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </li>
//       {/* -----Blog----- */}
//       <li className="menu-item position-relative">
//         <a
//           href="#"
//           className={`item-link ${Linkfs} ${textColor}  ${
//             isMenuActive(blogLinks) ? "activeMenu" : ""
//           }`}
//         >
//           Blog
//           {isArrow ? <i className="icon icon-arrow-down" /> : ""}
//         </a>
//         <div className="sub-menu links-default">
//           <ul className="menu-list">
//             {blogLinks.map((linkItem, index) => (
//               <li key={index}>
//                 <Link
//                   href={linkItem.href}
//                   className={`menu-link-text link text_black-2  ${
//                     isMenuActive(linkItem) ? "activeMenu" : ""
//                   }`}
//                 >
//                   {linkItem.text}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </li>
//     </>
//   );
// }

'use client';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { products1 } from '@/data/products';
import { ProductCard } from '../shopCards/ProductCard';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchNavbar } from '../../src/lib/api';

import { usePathname } from 'next/navigation';
import { blogLinks, pages } from '@/data/menu';

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
          if (elm2.href?.includes('/')) {
            if (elm2.href.split('/')[1] === pathname.split('/')[1]) active = true;
          }
          if (Array.isArray(elm2)) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split('/')[1] === pathname.split('/')[1]) active = true;
              });
            });
          }
        });
        if (item.href?.includes('/')) {
          if (item.href.split('/')[1] === pathname.split('/')[1]) active = true;
        }
      });
    }

    return active;
  };

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchNavbar().then(setMenus).catch(console.error);
  }, []);

  return (
    <>
      {menus.map((mainMenu, idx) => (
        <li className="menu-item" key={idx}>
          {/* ✅ Level 1 clickable */}
          <Link href={mainMenu.href || '#'} className="item-link">
            {mainMenu.label}
            <i className="icon icon-arrow-down" />
          </Link>

          <div className="sub-menu mega-menu">
            <div className="container">
              <div className="row">
                {mainMenu.menu.map((col, i) => (
                  <div className="col-lg-2" key={i}>
                    <div className="mega-menu-item">
                      {/* ✅ Level 2 clickable */}
                      <Link href={col.href || '#'} className="menu-heading" style={{ display: 'inline-block' }}>
                        {col.heading}
                      </Link>

                      <ul className="menu-list">
                        {col.links.map((link, j) => (
                          <li key={j}>
                            {/* level 3 already clickable */}
                            <Link href={link.href} className="menu-link-text">
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="col-lg-4">
                  <div className="menu-heading">Best seller</div>
                  <div className="hover-sw-nav hover-sw-2">
                    <Swiper
                      dir="ltr"
                      modules={[Navigation]}
                      navigation={{ prevEl: '.snmpn1', nextEl: '.snmnn1' }}
                      slidesPerView={2}
                      spaceBetween={30}
                      className="swiper tf-product-header wrap-sw-over">
                      {[...products1].slice(0, 4).map((elm, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                          <ProductCard product={elm} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round snmpn1">
                      <span className="icon icon-arrow-left" />
                    </div>
                    <div className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round snmnn1">
                      <span className="icon icon-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}

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
