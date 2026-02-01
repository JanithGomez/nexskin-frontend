'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContextElement } from '@/context/Context';
import { cldCard, cldHover, productPlaceholder } from '@/src/lib/cloudinary';

export default function Productcard23({ product }) {
  const {
    setQuickViewItem,
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  const imgSrc = cldCard(product.imgPublicId) || productPlaceholder();
  const imgHoverSrc =
    cldHover(product.hoverPublicId) ||
    cldCard(product.imgPublicId) ||
    productPlaceholder();

  const [currentImage, setCurrentImage] = useState(imgSrc);

  useEffect(() => {
    setCurrentImage(imgSrc);
  }, [imgSrc]);

  return (
    <div className="card-product list-layout small-card">
      <div className="card-product-wrapper">
        {/* ✅ Go to single product page */}
        <Link href={`/product-detail/${product.id}`} className="product-img small-img">
          <Image
            alt={product.title || 'image-product'}
            src={currentImage}
            width={720}
            height={1005}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 35vw"
          />
          <Image
            alt={product.title || 'image-product'}
            src={imgHoverSrc}
            width={720}
            height={1005}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 35vw"
          />
        </Link>
      </div>

      <div className="card-product-info small-info">
        {/* ✅ Title also goes to single product page */}
        <Link href={`/product-detail/${product.id}`} className="title link small-title">
          {product.title}
        </Link>

        <span className="price small-price">LKR {product.price.toFixed(2)}</span>

        <p className="description small-desc">{product.short_description}</p>

        <div className="list-product-btn small-btns">
          <a
            href="#quick_add"
            onClick={(e) => {
              e.preventDefault();
              setQuickAddItem(product.id);
            }}
            data-bs-toggle="modal"
            className="box-icon quick-add style-3 hover-tooltip">
            <span className="icon icon-bag" />
            <span className="tooltip">Quick add</span>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(product.id);
            }}
            className="box-icon wishlist style-3 hover-tooltip">
            <span className={`icon icon-heart ${isAddedtoWishlist(product.id) ? 'added' : ''}`} />
            <span className="tooltip">
              {isAddedtoWishlist(product.id) ? 'Already Wishlisted' : 'Add to Wishlist'}
            </span>
          </a>

          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={(e) => {
              e.preventDefault();
              addToCompareItem(product.id);
            }}
            className="box-icon compare style-3 hover-tooltip">
            <span className={`icon icon-compare ${isAddedtoCompareItem(product.id) ? 'added' : ''}`} />
            <span className="tooltip">
              {isAddedtoCompareItem(product.id) ? 'Already Compared' : 'Add to Compare'}
            </span>
          </a>

          <a
            href="#quick_view"
            onClick={(e) => {
              e.preventDefault();
              setQuickViewItem(product);
            }}
            data-bs-toggle="modal"
            className="box-icon quickview style-3 hover-tooltip">
            <span className="icon icon-view" />
            <span className="tooltip">Quick view</span>
          </a>
        </div>
      </div>
    </div>
  );
}
