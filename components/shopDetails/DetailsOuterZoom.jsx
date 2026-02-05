'use client';
import React, { useMemo, useState } from 'react';

import Image from 'next/image';
import CountdownComponent from '../common/Countdown';
import { colors, paymentImages, sizeOptions } from '@/data/singleProductOptions';
import StickyItem from './StickyItem';
import Quantity from './Quantity';

import Slider1ZoomOuter from './sliders/Slider1ZoomOuter';
import { allProducts } from '@/data/products';
import { useContextElement } from '@/context/Context';
import { openCartModal } from '@/utlis/openCartModal';

import { cldMain, cldThumb, productPlaceholder } from '@/src/lib/cloudinary';

export default function DetailsOuterZoom({ product = allProducts[0] }) {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[1]);
  const [quantity, setQuantity] = useState(1);

  const handleColor = (color) => {
    const updatedColor = colors.filter((elm) => elm.value.toLowerCase() == color.toLowerCase())[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const {
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();

  // ✅ build dynamic gallery from backend publicIds
  // expects: product.gallery = [{ id, publicId, is_primary, sort }, ...]
  const galleryImages = useMemo(() => {
    const g = product?.gallery || [];

    if (g.length) {
      return g.map((img, idx) => {
        const publicId = img.publicId || img.image_url || img.imageUrl;

        const src = publicId ? cldMain(publicId) : productPlaceholder();
        const thumb = publicId ? cldThumb(publicId) : src;

        return {
          id: img.id ?? idx + 1,
          src,
          thumb,
          alt: '',
          width: 770,
          height: 1075,
          dataValue: currentColor?.value?.toLowerCase() || 'default',
        };
      });
    }

    // fallback if gallery empty
    const fallbackPublicId = product?.imgPublicId || product?.hoverPublicId;
    const fallbackSrc = fallbackPublicId ? cldMain(fallbackPublicId) : productPlaceholder();
    const fallbackThumb = fallbackPublicId ? cldThumb(fallbackPublicId) : fallbackSrc;

    return [
      {
        id: 1,
        src: fallbackSrc,
        thumb: fallbackThumb,
        alt: '',
        width: 770,
        height: 1075,
        dataValue: currentColor?.value?.toLowerCase() || 'default',
      },
    ];
  }, [product, currentColor]);

  return (
    <section className="flat-spacing-4 pt_0" style={{ maxWidth: '100vw', overflow: 'clip' }}>
      <div className="tf-main-product section-image-zoom" style={{ maxWidth: '100vw', overflow: 'clip' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1ZoomOuter
                    handleColor={handleColor}
                    currentColor={currentColor.value}
                    firstImage={galleryImages?.[0]?.src}
                    images={galleryImages}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title">
                    <h5>{product.title ? product.title : '...'}</h5>
                  </div>

                  <div className="tf-product-info-badges">
                    <div className="badges">Best seller</div>
                    <div className="product-status-content">
                      <i className="icon-lightning" />
                      <p className="fw-6">Selling fast! 56 people have this in their carts.</p>
                    </div>
                  </div>

                  <div className="tf-product-info-price">
                    <div className="price-on-sale">LKR {Number(product.price || 0).toFixed(2)}</div>
                    <div className="compare-at-price">${currentColor.oldPrice.toFixed(2)}</div>
                    <div className="badges-on-sale">
                      <span>20</span>% OFF
                    </div>
                  </div>

                  <div className="tf-product-info-liveview">
                    <div className="liveview-count">20</div>
                    <p className="fw-6">People are viewing this right now</p>
                  </div>

                  <div className="tf-product-info-countdown">
                    <div className="countdown-wrap">
                      <div className="countdown-title">
                        <i className="icon-time tf-ani-tada" />
                        <p>HURRY UP! SALE ENDS IN:</p>
                      </div>
                      <div className="tf-countdown style-1">
                        <div className="js-countdown">
                          <CountdownComponent labels="Days :,Hours :,Mins :,Secs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tf-product-info-variant-picker">
                    <div className="variant-picker-item">
                      <div className="variant-picker-label">
                        Color:
                        <span className="fw-6 variant-picker-label-value">{currentColor.value}</span>
                      </div>
                      <form className="variant-picker-values">
                        {colors.map((color) => (
                          <React.Fragment key={color.id}>
                            <input id={color.id} type="radio" name="color1" readOnly checked={currentColor == color} />
                            <label
                              onClick={() => setCurrentColor(color)}
                              className="hover-tooltip radius-60"
                              htmlFor={color.id}
                              data-value={color.value}>
                              <span className={`btn-checkbox ${color.className}`} />
                              <span className="tooltip">{color.value}</span>
                            </label>
                          </React.Fragment>
                        ))}
                      </form>
                    </div>

                    <div className="variant-picker-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="variant-picker-label">
                          Size:
                          <span className="fw-6 variant-picker-label-value">{currentSize.value}</span>
                        </div>
                        <a href="#find_size" data-bs-toggle="modal" className="find-size fw-6">
                          Find your size
                        </a>
                      </div>
                      <form className="variant-picker-values">
                        {sizeOptions.map((size) => (
                          <React.Fragment key={size.id}>
                            <input type="radio" name="size1" id={size.id} readOnly checked={currentSize == size} />
                            <label
                              onClick={() => setCurrentSize(size)}
                              className="style-text"
                              htmlFor={size.id}
                              data-value={size.value}>
                              <p>{size.value}</p>
                            </label>
                          </React.Fragment>
                        ))}
                      </form>
                    </div>
                  </div>

                  <div className="tf-product-info-quantity">
                    <div className="quantity-title fw-6">Quantity</div>
                    <Quantity setQuantity={setQuantity} />
                  </div>

                  <div className="tf-product-info-buy-button">
                    <form onSubmit={(e) => e.preventDefault()} className="">
                      <a
                        onClick={() => {
                          // openCartModal();
                          // addProductToCart(product.id, quantity ? quantity : 1);
                          addProductToCart(product.id, quantity);
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn">
                        <span>{isAddedToCartProducts(product.id) ? 'Already Added' : 'Add to cart'} - </span>
                        <span className="tf-qty-price">LKR {(Number(product.price || 0) * quantity).toFixed(2)}</span>
                      </a>

                      <a
                        onClick={() => addToWishlist(product.id)}
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                        <span className={`icon icon-heart ${isAddedtoWishlist(product.id) ? 'added' : ''}`} />
                        <span className="tooltip">
                          {isAddedtoWishlist(product.id) ? 'Already Wishlisted' : 'Add to Wishlist'}
                        </span>
                        <span className="icon icon-delete" />
                      </a>

                      <a
                        href="#compare"
                        data-bs-toggle="offcanvas"
                        onClick={() => addToCompareItem(product.id)}
                        aria-controls="offcanvasLeft"
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action">
                        <span className={`icon icon-compare ${isAddedtoCompareItem(product.id) ? 'added' : ''}`} />
                        <span className="tooltip">
                          {isAddedtoCompareItem(product.id) ? 'Already Compared' : 'Add to Compare'}
                        </span>
                        <span className="icon icon-check" />
                      </a>

                      <div className="w-100">
                        <a href="#" className="btns-full">
                          Buy with
                          <Image alt="image" src="/images/payments/paypal.png" width={64} height={18} />
                        </a>
                        <a href="#" className="payment-more-option">
                          More payment options
                        </a>
                      </div>
                    </form>
                  </div>

                  <div className="tf-product-info-trust-seal">
                    <div className="tf-product-trust-mess">
                      <i className="icon-safe" />
                      <p className="fw-6">
                        Guarantee Safe <br />
                        Checkout
                      </p>
                    </div>
                    <div className="tf-payment">
                      {paymentImages.map((image, index) => (
                        <Image key={index} alt={image.alt} src={image.src} width={image.width} height={image.height} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        </div>
      </div>{' '}
      <StickyItem />
    </section>
  );
}
