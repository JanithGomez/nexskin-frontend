'use client';

import Drift from 'drift-zoom';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cldMain, cldThumb, cldZoom, productPlaceholder } from '@/src/lib/cloudinary';

export default function Slider1ZoomOuter({ images = [] }) {
  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const safeImages = useMemo(() => {
    if (images?.length) {
      return images.map((img, idx) => {
        // If parent already built URLs, keep them
        if (img?.src) {
          return {
            ...img,
            thumb: img.thumb || img.src,
            width: img.width || 770,
            height: img.height || 1075,
          };
        }

        // If this component receives publicId, build optimized URLs
        const publicId = img?.publicId || img?.image_url || img?.imageUrl;

        const src = publicId ? cldMain(publicId) : productPlaceholder();
        const thumb = publicId ? cldThumb(publicId) : src;

        return {
          id: img?.id ?? idx + 1,
          src,
          thumb,
          width: img.width || 770,
          height: img.height || 1075,
          publicId,
        };
      });
    }

    return [
      {
        id: 1,
        src: productPlaceholder(),
        thumb: productPlaceholder(),
        width: 770,
        height: 1075,
      },
    ];
  }, [images]);

  useEffect(() => {
    const initZoom = () => {
      const driftAll = document.querySelectorAll('.tf-image-zoom');
      const pane = document.querySelector('.tf-zoom-main');

      driftAll.forEach((el) => {
        if (el.dataset.driftInit === '1') return;
        el.dataset.driftInit = '1';

        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };

    initZoom();

    const zoomElements = document.querySelectorAll('.tf-image-zoom');

    const handleMouseOver = (event) => {
      const parent = event.target.closest('.section-image-zoom');
      if (parent) parent.classList.add('zoom-active');
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest('.section-image-zoom');
      if (parent) parent.classList.remove('zoom-active');
    };

    zoomElements.forEach((element) => {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [safeImages]);

  return (
    <>
      <Swiper
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        className="tf-product-media-thumbs other-image-zoom"
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        breakpoints={{
          0: { direction: 'horizontal' },
          1150: { direction: 'vertical' },
        }}>
        {safeImages.map((img) => (
          <SwiperSlide key={img.id} className="stagger-item">
            <div className="item">
              <Image
                className="lazyload"
                alt=""
                src={img.thumb || img.src}
                width={img.width || 200}
                height={img.height || 200}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Gallery>
        <Swiper
          dir="ltr"
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="tf-product-media-main"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}>
          {safeImages.map((img) => {
            const zoomSrc = img?.publicId ? cldZoom(img.publicId) : img.src;

            return (
              <SwiperSlide key={img.id}>
                <Item
                  original={img.src}
                  thumbnail={img.thumb || img.src}
                  width={img.width || 770}
                  height={img.height || 1075}>
                  {({ ref, open }) => (
                    <a
                      className="item"
                      data-pswp-width={img.width || 770}
                      data-pswp-height={img.height || 1075}
                      onClick={open}
                      style={{ cursor: 'zoom-in' }}>
                      <Image
                        className="tf-image-zoom lazyload"
                        data-zoom={zoomSrc}
                        data-src={img.src}
                        ref={ref}
                        alt="image"
                        width={img.width || 770}
                        height={img.height || 1075}
                        src={img.src}
                        priority
                      />
                    </a>
                  )}
                </Item>
              </SwiperSlide>
            );
          })}

          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>
      </Gallery>
    </>
  );
}
