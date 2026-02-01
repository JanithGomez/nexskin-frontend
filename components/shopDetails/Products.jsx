"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "../shopCards/ProductCard";
import { fetchRelatedProducts } from "@/src/lib/api";

export default function Products({ currentId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!currentId) return;
      const { products } = await fetchRelatedProducts(currentId, 8);
      if (alive) setItems(products || []);
    }

    load();
    return () => {
      alive = false;
    };
  }, [currentId]);

  if (!items.length) return null;

  return (
    <section className="flat-spacing-1 pt_0">
      <div className="container">
        <div className="flat-title">
          <span className="title">People Also Bought</span>
        </div>

        <div className="hover-sw-nav hover-sw-2">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-product-sell wrap-sw-over"
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              1024: { slidesPerView: 4 },
              640: { slidesPerView: 3 },
              0: { slidesPerView: 2, spaceBetween: 15 },
            }}
            modules={[Navigation, Pagination]}
            navigation={{ prevEl: ".snbp3070", nextEl: ".snbn3070" }}
            pagination={{ clickable: true, el: ".spd307" }}
          >
            {items.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round snbp3070">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round snbn3070">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-product justify-content-center spd307" />
        </div>
      </div>
    </section>
  );
}
