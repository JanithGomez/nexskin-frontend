'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContextElement } from '@/context/Context';
import CountdownComponent from '../common/Countdown';
import { cldCard, cldHover, productPlaceholder } from '@/src/lib/cloudinary';

export const ProductCard = ({ product }) => {
  const {
    setQuickViewItem,
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  const imgSrc = cldCard(product.imgPublicId) || productPlaceholder();
  const imgHoverSrc = cldHover(product.hoverPublicId) || cldCard(product.imgPublicId) || productPlaceholder();

  const [currentImage, setCurrentImage] = useState(imgSrc);

  useEffect(() => {
    setCurrentImage(imgSrc);
  }, [imgSrc]);

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={currentImage}
            alt={product.title || 'image-product'}
            width={720}
            height={1005}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <Image
            className="lazyload img-hover"
            src={imgHoverSrc}
            alt={product.title || 'image-product'}
            width={720}
            height={1005}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {product.soldOut ? (
          <div className="sold-out">
            <span>Sold out</span>
          </div>
        ) : (
          <>
            <div className="list-product-btn">
              <a
                href="#quick_add"
                onClick={() => setQuickAddItem(product.id)}
                data-bs-toggle="modal"
                className="box-icon bg_white quick-add tf-btn-loading">
                <span className="icon icon-bag" />
                <span className="tooltip">Quick Add</span>
              </a>

              <a onClick={() => addToWishlist(product.id)} className="box-icon bg_white wishlist btn-icon-action">
                <span className={`icon icon-heart ${isAddedtoWishlist(product.id) ? 'added' : ''}`} />
                <span className="tooltip">
                  {isAddedtoWishlist(product.id) ? 'Already Wishlisted' : 'Add to Wishlist'}
                </span>
                <span className="icon icon-delete" />
              </a>

              <a
                href="#compare"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                onClick={() => addToCompareItem(product.id)}
                className="box-icon bg_white compare btn-icon-action">
                <span className={`icon icon-compare ${isAddedtoCompareItem(product.id) ? 'added' : ''}`} />
                <span className="tooltip">
                  {isAddedtoCompareItem(product.id) ? 'Already Compared' : 'Add to Compare'}
                </span>
                <span className="icon icon-check" />
              </a>

              <a
                href="#quick_view"
                onClick={() => setQuickViewItem(product)}
                data-bs-toggle="modal"
                className="box-icon bg_white quickview tf-btn-loading">
                <span className="icon icon-view" />
                <span className="tooltip">Quick View</span>
              </a>
            </div>

            {product.countdown && (
              <div className="countdown-box">
                <div className="js-countdown">
                  <CountdownComponent />
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="size-list">
                {product.sizes.map((size) => (
                  <span key={size}>{size}</span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="price">LKR {product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
