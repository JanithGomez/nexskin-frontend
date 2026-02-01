"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "../shopCards/ProductCard";
import { fetchProductsByIds } from "@/src/lib/api";

const STORAGE_KEY = "recent_product_ids";
const MAX_RECENT = 12;

export default function RecentProducts({ currentId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const id = Number(currentId);
    if (!Number.isFinite(id)) return;

    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      ids = [];
    }

    ids = ids.map(Number).filter(Number.isFinite);
    ids = [id, ...ids.filter((x) => x !== id)].slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [currentId]);

  useEffect(() => {
    let alive = true;

    async function load() {
      let ids = [];
      try {
        ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      } catch {
        ids = [];
      }

      ids = ids.map(Number).filter(Number.isFinite);
      if (!ids.length) {
        if (alive) setItems([]);
        return;
      }

      const { products } = await fetchProductsByIds(ids);
      if (alive) setItems(products || []);
    }

    load();
    return () => {
      alive = false;
    };
  }, [currentId]);

  if (!items.length) return null;

  return (
    <section className="flat-spacing-4 pt_0">
      <div className="container">
        <div className="flat-title">
          <span className="title">Recently Viewed</span>
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
            navigation={{ prevEl: ".snbp308", nextEl: ".snbn308" }}
            pagination={{ clickable: true, el: ".spd308" }}
          >
            {items.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round snbp308">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round snbn308">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-recent justify-content-center spd308" />
        </div>
      </div>
    </section>
  );
}
