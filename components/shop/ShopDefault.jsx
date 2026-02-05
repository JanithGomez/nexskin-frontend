'use client';

import { layouts } from '@/data/shop';
import ProductGrid from './ProductGrid';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../common/Pagination';
import ShopFilter from './ShopFilter';
import Sorting from './Sorting';
import fetchAllProducts from '@/src/lib/api';

export default function ShopDefault({ categorySlug = null }) {
  const [gridItems, setGridItems] = useState(6);

  const [products, setProducts] = useState([]);
  const [finalSorted, setFinalSorted] = useState([]);

  const [filterData, setFilterData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [paginationMeta, setPaginationMeta] = useState(null);

  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ when categorySlug changes, reset filters
  useEffect(() => {
    setCurrentPage(1);
    setActiveFilters((prev) => ({
      ...prev,
      category_slug: categorySlug || undefined,
    }));
  }, [categorySlug]);

  useEffect(() => {
    const syncGridWithScreen = () => {
      const w = window.innerWidth;

      setGridItems((prev) => {
        if (w < 768 && !['1', '2'].includes(prev)) return '2';
        if (w < 1200 && !['1', '3'].includes(prev)) return '3';
        if (w >= 1200 && !['1', '6'].includes(prev)) return '6';
        return prev;
      });
    };

    syncGridWithScreen();
    window.addEventListener('resize', syncGridWithScreen);
    return () => window.removeEventListener('resize', syncGridWithScreen);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/product-filters')
      .then((res) => res.json())
      .then((data) => setFilterData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleApplyFilters = useCallback((filters) => {
    setCurrentPage(1);

    // ✅ keep category_slug always if present
    const merged = {
      ...filters,
      category_slug: categorySlug || undefined,
    };

    setActiveFilters((prev) => {
      const prevStr = JSON.stringify(prev);
      const nextStr = JSON.stringify(merged);
      return prevStr === nextStr ? prev : merged;
    });
  }, [categorySlug]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);

      const { products: items, meta } = await fetchAllProducts({
        ...activeFilters,
        page: currentPage,
        per_page: perPage,
      });

      if (cancelled) return;

      setProducts(items);
      setFinalSorted(items);
      setPaginationMeta(meta);
      setLoading(false);
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, [activeFilters, currentPage, perPage]);

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <a href="#filterShop" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft" className="tf-btn-filter">
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>

            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${layout.display} ${
                    gridItems == layout.dataValueGrid ? 'active' : ''
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}>
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <Sorting setFinalSorted={setFinalSorted} products={products} />
              </div>
            </div>
          </div>

          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />

            {loading ? (
              <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : (
              <ProductGrid allproducts={finalSorted} gridItems={gridItems} total={paginationMeta?.total} />
            )}

            {paginationMeta?.last_page > 1 ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination meta={paginationMeta} onPageChange={(p) => setCurrentPage(p)} />
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <ShopFilter onApplyFilters={handleApplyFilters} filterData={filterData} />
    </>
  );
}

