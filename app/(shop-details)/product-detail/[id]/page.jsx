import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";

import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";

import React from "react";
import Link from "next/link";

import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";

import { fetchProductDetails } from "@/src/lib/api";

export const metadata = {
  title: "Product Details",
  description: "Product Details",
};

  export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  // ✅ fetch from Laravel
  const json = await fetchProductDetails(id); // expects { product: {...} }
  const product = json?.product;

  if (!product) {
    return (
      <>
        <Header2 />
        <div className="container" style={{ padding: 40 }}>
          <h3>Product not found</h3>
          <Link href="/" className="tf-btn btn-fill">
            Back to Home
          </Link>
        </div>
        <Footer1 />
      </>
    );
  }

  return (
    <>
      <Header2 />

      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">{product.title}</span>
            </div>

            {/* ✅ keep UI, just pass currentId */}
            <ProductSinglePrevNext currentId={product.id} />
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab product={product} />
      <Products currentId={product.id} />
      <RecentProducts currentId={product.id} />
      <Footer1 />
    </>
  );
}
