import Features from '@/components/common/Features2';
import Header2 from '@/components/headers/Header2';
import BannerCollection from '@/components/homes/home-cosmetic/BannerCollection';
import Categories from '@/components/homes/home-cosmetic/Categories';
import Hero from '@/components/homes/home-cosmetic/Hero';
import Products from '@/components/homes/home-cosmetic/Products';
import Products2 from '@/components/homes/home-cosmetic/Products2';
import Products3 from '@/components/homes/home-cosmetic/Products3';
import SkinChange from '@/components/homes/home-cosmetic/SkinChange';
import Testimonials from '@/components/homes/home-cosmetic/Testimonials';
import React from 'react';
import Announcment from '@/components/homes/home-cosmetic/Announcment';
import Footer2 from '@/components/footers/Footer2';
export const metadata = {
  title: 'Home Cosmetic || Ecomus - Ultimate Nextjs Ecommerce Template',
  description: 'Ecomus - Ultimate Nextjs Ecommerce Template',
};
export default function page() {
  return (
    <>
      <Announcment />
      <Header2 />
      <Hero />
      {/* <Marquee /> */}
      <Categories />
      <Products />
      <Products2 />
      <Products3 />
      <BannerCollection />
      {/* <Products2 /> */}
      <SkinChange />
      <Testimonials />
      <Features bgColor="flat-spacing-3 bg_grey-7 flat-iconbox" />
      <Footer2 />
    </>
  );
}
