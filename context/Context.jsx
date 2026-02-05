'use client';

import { allProducts } from '@/data/products';
import { openCartModal } from '@/utlis/openCartModal';
import React, { useEffect, useState, useContext } from 'react';
import { fetchMe, logoutUser } from '@/src/lib/auth';

import { fetchCart, addCartItem, updateCartItem, removeCartItem } from '@/src/lib/api';
import { cldCard, productPlaceholder } from '@/src/lib/cloudinary';

const dataContext = React.createContext();
export const useContextElement = () => useContext(dataContext);

export default function Context({ children }) {
  // -------------------------
  // ✅ AUTH
  // -------------------------
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const me = await fetchMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    await loadCart();
  };

  // -------------------------
  // ✅ CART / WISHLIST / COMPARE
  // -------------------------
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Load cart from backend
  const loadCart = async () => {
    try {
      const json = await fetchCart();
      const items = json?.items ?? [];

      const mapped = items.map((i) => ({
        item_id: i.item_id,
        id: i.id,
        title: i.title,
        price: Number(i.price || 0),
        quantity: Number(i.quantity || 1),
        imgSrc: i.imgPublicId ? cldCard(i.imgPublicId) : productPlaceholder(),
      }));

      setCartProducts(mapped);
      setTotalPrice(Number(json?.subtotal || 0));
    } catch (e) {
      console.error('loadCart failed:', e);
      setCartProducts([]);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (!authLoading) loadCart();
  }, [authLoading, user?.id]);

  const isAddedToCartProducts = (id) => !!cartProducts.find((p) => String(p.id) === String(id));

  // -------------------------
  // ✅ ADD TO CART (opens modal)
  // -------------------------
  const addProductToCart = async (id, qty) => {
    try {
      await addCartItem(id, qty || 1);
      await loadCart();
      openCartModal(); // ✅ ONLY here
    } catch (e) {
      console.error('addProductToCart failed:', e);
    }
  };

  // -------------------------
  // ✅ UPDATE QUANTITY (NO modal reopen)
  // -------------------------
  const updateQuantity = async (productId, qty) => {
    const item = cartProducts.find((p) => String(p.id) === String(productId));
    if (!item?.item_id) {
      return addProductToCart(productId, qty);
    }

    try {
      await updateCartItem(item.item_id, qty);
      await loadCart(); // ✅ silent update
    } catch (e) {
      console.error('updateQuantity failed:', e);
    }
  };

  // -------------------------
  // ✅ REMOVE ITEM
  // -------------------------
  const removeFromCartByProductId = async (productId) => {
    const item = cartProducts.find((p) => String(p.id) === String(productId));
    if (!item?.item_id) return;

    try {
      await removeCartItem(item.item_id);
      await loadCart();
    } catch (e) {
      console.error('removeFromCart failed:', e);
    }
  };

  // -------------------------
  // WISHLIST / COMPARE
  // -------------------------
  const addToWishlist = (id) => {
    setWishList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const removeFromWishlist = (id) => {
    setWishList((prev) => prev.filter((x) => x !== id));
  };

  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((prev) => [...prev, id]);
    }
  };

  const removeFromCompareItem = (id) => {
    setCompareItem((prev) => prev.filter((x) => x !== id));
  };

  const isAddedtoWishlist = (id) => wishList.includes(id);
  const isAddedtoCompareItem = (id) => compareItem.includes(id);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist'));
    if (items?.length) setWishList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishList));
  }, [wishList]);

  // -------------------------
  // PROVIDER
  // -------------------------
  const contextElement = {
    user,
    setUser,
    authLoading,
    logout,

    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    removeFromCartByProductId,

    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
  };

  return <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>;
}
