import Footer1 from '@/components/footers/Footer1';
import Header2 from '@/components/headers/Header2';
import ShopDefault from '@/components/shop/ShopDefault';
import React from 'react';

export const metadata = {
  title: 'Category || NEXSKIN',
  description: 'NEXSKIN - Original Cosmetics Products',
};

export default function Page({ params }) {
  const slug = params?.slug;

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{slug}</div>
          <p className="text-center text-2 text_black-2 mt_5">Shop through our latest selection of cosmetics</p>
        </div>
      </div>
      <ShopDefault categorySlug={slug} />
      <Footer1 />
    </>
  );
}
