// "use client";
// import Drift from "drift-zoom";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { Gallery, Item } from "react-photoswipe-gallery";
// import { Navigation, Thumbs } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// export default function Slider1ZoomMagnifier({
//   currentColor = "Beige",
//   handleColor = () => {},
//   firstImage,
// }) {
//   const images = [
//     {
//       id: 1,
//       src: firstImage || "/images/shop/products/p-d1.png",
//       alt: "",
//       width: 770,
//       height: 1075,
//       dataValue: "beige",
//     },
//     {
//       id: 2,
//       src: "/images/shop/products/hmgoepprod.jpg",
//       alt: "",
//       width: 713,
//       height: 1070,
//       dataValue: "beige",
//     },
//     {
//       id: 3,
//       src: "/images/shop/products/hmgoepprod2.jpg",
//       alt: "img-compare",
//       width: 713,
//       height: 1070,
//       dataValue: "beige",
//     },
//     {
//       id: 4,
//       src: "/images/shop/products/hmgoepprod3.jpg",
//       alt: "img-compare",
//       width: 713,
//       height: 1070,
//       dataValue: "beige",
//     },
//     {
//       id: 5,
//       src: "/images/shop/products/hmgoepprod4.jpg",
//       alt: "img-compare",
//       width: 768,
//       height: 1152,
//       dataValue: "beige",
//     },
//     {
//       id: 6,
//       src: "/images/shop/products/hmgoepprod5.jpg",
//       alt: "img-compare",
//       width: 713,
//       height: 1070,
//       dataValue: "beige",
//     },
//     {
//       id: 7,
//       src: "/images/shop/products/hmgoepprod6.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "black",
//     },
//     {
//       id: 8,
//       src: "/images/shop/products/hmgoepprod7.jpg",
//       alt: "",
//       width: 713,
//       height: 1070,
//       dataValue: "black",
//     },
//     {
//       id: 9,
//       src: "/images/shop/products/hmgoepprod8.jpg",
//       alt: "",
//       width: 713,
//       height: 1070,
//       dataValue: "black",
//     },
//     {
//       id: 10,
//       src: "/images/shop/products/hmgoepprod9.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "black",
//     },
//     {
//       id: 11,
//       src: "/images/shop/products/hmgoepprod10.jpg",
//       alt: "",
//       width: 713,
//       height: 1070,
//       dataValue: "blue",
//     },
//     {
//       id: 12,
//       src: "/images/shop/products/hmgoepprod11.jpg",
//       alt: "",
//       width: 713,
//       height: 1070,
//       dataValue: "blue",
//     },
//     {
//       id: 13,
//       src: "/images/shop/products/hmgoepprod12.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "blue",
//     },
//     {
//       id: 14,
//       src: "/images/shop/products/hmgoepprod13.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "blue",
//     },
//     {
//       id: 15,
//       src: "/images/shop/products/hmgoepprod14.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "white",
//     },
//     {
//       id: 16,
//       src: "/images/shop/products/hmgoepprod15.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "white",
//     },
//     {
//       id: 17,
//       src: "/images/shop/products/hmgoepprod16.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "white",
//     },
//     {
//       id: 18,
//       src: "/images/shop/products/hmgoepprod17.jpg",
//       alt: "",
//       width: 768,
//       height: 1152,
//       dataValue: "white",
//     },
//   ];
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const swiperRef = useRef(null);
//   useEffect(() => {
//     const slideIndex =
//       images.filter(
//         (elm) => elm.dataValue.toLowerCase() == currentColor.toLowerCase()
//       )[0].id - 1;
//     swiperRef.current.slideTo(slideIndex);
//   }, [currentColor]);
//   useEffect(() => {
//     // Function to initialize Drift
//     const imageZoom = () => {
//       const driftAll = document.querySelectorAll(".tf-image-zoom-magnifier");

//       driftAll.forEach((el) => {
//         new Drift(el, {
//           zoomFactor: 2,
//           inlinePane: true,
//           containInline: false,
//           inlinePane: 35,
//           paneClass: "drift-pane",
//         });
//       });
//     };

//     // Call the function
//     imageZoom();
//     document.body.classList.add("zoom-magnifier-containing");
//     // Optionally, clean up if necessary
//     return () => {
//       document.body.classList.remove("zoom-magnifier-containing");
//       // Clean up logic if required
//     };
//   }, []); // Empty dependency array to run only once on mount

//   return (
//     <>
//       <Swiper
//         dir="ltr"
//         direction="vertical"
//         spaceBetween={10}
//         slidesPerView={6}
//         className="tf-product-media-thumbs other-image-zoom"
//         onSwiper={setThumbsSwiper}
//         modules={[Thumbs]}
//         breakpoints={{
//           0: {
//             direction: "horizontal",
//           },
//           1150: {
//             direction: "vertical",
//           },
//         }}
//       >
//         {images.map((slide, index) => (
//           <SwiperSlide key={index} className="stagger-item">
//             <div className="item">
//               <Image
//                 className="lazyload"
//                 data-src={slide.src}
//                 alt={""}
//                 src={slide.src} // Optional fallback for non-lazy loading
//                 width={slide.width}
//                 height={slide.height}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <Gallery>
//         <Swiper
//           dir="ltr"
//           spaceBetween={10}
//           slidesPerView={1}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           className="tf-product-media-main tf-product-zoom-inner"
//           id="gallery-swiper-started"
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[Thumbs, Navigation]}
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           onSlideChange={(swiper) => {
//             handleColor(images[swiper.activeIndex].dataValue);
//           }}
//         >
//           {images.map((slide, index) => (
//             <SwiperSlide key={index}>
//               <Item
//                 original={slide.src}
//                 thumbnail={slide.src}
//                 width={slide.width}
//                 height={slide.height}
//               >
//                 {({ ref, open }) => (
//                   <a
//                     className="item"
//                     data-pswp-width={slide.width}
//                     data-pswp-height={slide.height}
//                     onClick={open}
//                   >
//                     <Image
//                       className="tf-image-zoom-magnifier ls-is-cached lazyloaded"
//                       data-zoom={slide.src}
//                       data-src={slide.src}
//                       ref={ref}
//                       alt="image"
//                       width={slide.width}
//                       height={slide.height}
//                       src={slide.src} // Optional fallback for non-lazy loading
//                     />
//                   </a>
//                 )}
//               </Item>
//             </SwiperSlide>
//           ))}

//           {/* Navigation buttons */}
//           <div className="swiper-button-next button-style-arrow thumbs-next"></div>
//           <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
//         </Swiper>
//       </Gallery>
//     </>
//   );
// }

'use client';

import Drift from 'drift-zoom';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cldMain, cldThumb, cldZoom, productPlaceholder } from '@/src/lib/cloudinary';

export default function Slider1ZoomMagnifier({
  currentColor = 'Beige',
  handleColor = () => {},
  firstImage,
  images = [],
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);

  // Normalize images like Slider1ZoomOuter (supports src OR publicId)
  const safeImages = useMemo(() => {
    if (images?.length) {
      return images.map((img, idx) => {
        // If parent already provides URLs
        if (img?.src) {
          return {
            id: img?.id ?? idx + 1,
            src: img.src,
            thumb: img.thumb || img.src,
            zoomSrc: img.zoomSrc || img.src,
            width: img.width || 770,
            height: img.height || 1075,
            alt: img.alt || '',
            dataValue: (img.dataValue || img.color || '').toString().toLowerCase(),
          };
        }

        // If component receives a Cloudinary publicId (or variants)
        const publicId = img?.publicId || img?.image_url || img?.imageUrl;

        const src = publicId ? cldMain(publicId) : productPlaceholder();
        const thumb = publicId ? cldThumb(publicId) : src;
        const zoomSrc = publicId ? cldZoom(publicId) : src;

        return {
          id: img?.id ?? idx + 1,
          src,
          thumb,
          zoomSrc,
          width: img.width || 770,
          height: img.height || 1075,
          alt: img.alt || '',
          dataValue: (img.dataValue || img.color || '').toString().toLowerCase(),
          publicId,
        };
      });
    }

    // Fallback to old behavior
    const fallbackSrc = firstImage || '/images/shop/products/p-d1.png';

    return [
      {
        id: 1,
        src: fallbackSrc,
        thumb: fallbackSrc,
        zoomSrc: fallbackSrc,
        width: 770,
        height: 1075,
        alt: '',
        dataValue: 'beige',
      },
    ];
  }, [images, firstImage]);

  // Jump to the color's first slide (same behavior as your old component)
  useEffect(() => {
    if (!swiperRef.current || !safeImages?.length) return;

    const target = safeImages.find(
      (img) => img?.dataValue && img.dataValue.toLowerCase() === currentColor.toLowerCase(),
    );

    if (!target) return;

    const slideIndex = (target.id ?? 1) - 1;
    swiperRef.current.slideTo(slideIndex);
  }, [currentColor, safeImages]);

  // Drift inline magnifier (same settings + same classes as your old component)
  useEffect(() => {
    const initZoom = () => {
      const driftAll = document.querySelectorAll('.tf-image-zoom-magnifier');

      driftAll.forEach((el) => {
        if (el.dataset.driftInit === '1') return;
        el.dataset.driftInit = '1';

        new Drift(el, {
          zoomFactor: 2,
          inlinePane: true,
          containInline: false,
          inlinePane: 35,
          paneClass: 'drift-pane',
        });
      });
    };

    initZoom();
    document.body.classList.add('zoom-magnifier-containing');

    return () => {
      document.body.classList.remove('zoom-magnifier-containing');
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
                data-src={img.thumb || img.src}
                alt={img.alt || ''}
                src={img.thumb || img.src}
                width={img.width}
                height={img.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FIX: ensure PhotoSwipe overlay is appended to body (prevents arrows/X appearing "inside" swiper) */}
      <Gallery
        options={{
          appendToEl: typeof document !== 'undefined' ? document.body : undefined,
        }}>
        <Swiper
          dir="ltr"
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="tf-product-media-main tf-product-zoom-inner"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const v = safeImages?.[swiper.activeIndex]?.dataValue;
            if (v) handleColor(v);
          }}>
          {safeImages.map((img) => (
            <SwiperSlide key={img.id}>
              <Item original={img.src} thumbnail={img.thumb || img.src} width={img.width} height={img.height}>
                {({ ref, open }) => (
                  <a className="item" data-pswp-width={img.width} data-pswp-height={img.height} onClick={open}>
                    <Image
                      className="tf-image-zoom-magnifier ls-is-cached lazyloaded"
                      data-zoom={img.zoomSrc || img.src}
                      data-src={img.src}
                      ref={ref}
                      alt="image"
                      width={img.width}
                      height={img.height}
                      src={img.src}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next button-style-arrow thumbs-next"></div>
          <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
        </Swiper>
      </Gallery>
    </>
  );
}
