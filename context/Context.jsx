// "use client";
// import { allProducts } from "@/data/products";
// import { openCartModal } from "@/utlis/openCartModal";
// // import { openCart } from "@/utlis/toggleCart";
// import React, { useEffect } from "react";
// import { useContext, useState } from "react";
// const dataContext = React.createContext();
// export const useContextElement = () => {
//   return useContext(dataContext);
// };

// export default function Context({ children }) {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [wishList, setWishList] = useState([1, 2, 3]);
//   const [compareItem, setCompareItem] = useState([1, 2, 3]);
//   const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
//   const [quickAddItem, setQuickAddItem] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);
//   useEffect(() => {
//     const subtotal = cartProducts.reduce((accumulator, product) => {
//       return accumulator + product.quantity * product.price;
//     }, 0);
//     setTotalPrice(subtotal);
//   }, [cartProducts]);

//   const addProductToCart = (id, qty) => {
//     if (!cartProducts.filter((elm) => elm.id == id)[0]) {
//       const item = {
//         ...allProducts.filter((elm) => elm.id == id)[0],
//         quantity: qty ? qty : 1,
//       };
//       setCartProducts((pre) => [...pre, item]);
//       openCartModal();

//       // openCart();
//     }
//   };
//   const isAddedToCartProducts = (id) => {
//     if (cartProducts.filter((elm) => elm.id == id)[0]) {
//       return true;
//     }
//     return false;
//   };

//   const updateQuantity = (id, qty) => {
//     if (isAddedToCartProducts(id)) {
//       let item = cartProducts.filter((elm) => elm.id == id)[0];
//       let items = [...cartProducts];
//       const itemIndex = items.indexOf(item);

//       item.quantity = qty / 1;
//       items[itemIndex] = item;
//       setCartProducts(items);

//       openCartModal();
//     } else {
//       addProductToCart(id, qty);
//     }
//   };
//   const addToWishlist = (id) => {
//     if (!wishList.includes(id)) {
//       setWishList((pre) => [...pre, id]);
//     } else {
//       setWishList((pre) => [...pre].filter((elm) => elm != id));
//     }
//   };
//   const removeFromWishlist = (id) => {
//     if (wishList.includes(id)) {
//       setWishList((pre) => [...pre.filter((elm) => elm != id)]);
//     }
//   };
//   const addToCompareItem = (id) => {
//     if (!compareItem.includes(id)) {
//       setCompareItem((pre) => [...pre, id]);
//     }
//   };
//   const removeFromCompareItem = (id) => {
//     if (compareItem.includes(id)) {
//       setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
//     }
//   };
//   const isAddedtoWishlist = (id) => {
//     if (wishList.includes(id)) {
//       return true;
//     }
//     return false;
//   };
//   const isAddedtoCompareItem = (id) => {
//     if (compareItem.includes(id)) {
//       return true;
//     }
//     return false;
//   };
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cartList"));
//     if (items?.length) {
//       setCartProducts(items);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartList", JSON.stringify(cartProducts));
//   }, [cartProducts]);
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("wishlist"));
//     if (items?.length) {
//       setWishList(items);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishList));
//   }, [wishList]);

//   const contextElement = {
//     cartProducts,
//     setCartProducts,
//     totalPrice,
//     addProductToCart,
//     isAddedToCartProducts,
//     removeFromWishlist,
//     addToWishlist,
//     isAddedtoWishlist,
//     quickViewItem,
//     wishList,
//     setQuickViewItem,
//     quickAddItem,
//     setQuickAddItem,
//     addToCompareItem,
//     isAddedtoCompareItem,
//     removeFromCompareItem,
//     compareItem,
//     setCompareItem,
//     updateQuantity,
//   };
//   return (
//     <dataContext.Provider value={contextElement}>
//       {children}
//     </dataContext.Provider>
//   );
// }

'use client';
import { allProducts } from '@/data/products';
import { openCartModal } from '@/utlis/openCartModal';
import React, { useEffect, useState, useContext } from 'react';
import { fetchMe, logoutUser } from '@/src/lib/auth';

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
      } catch (e) {
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
  };

  // -------------------------
  // ✅ CART / WISHLIST / COMPARE (your existing)
  // -------------------------
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id, qty) => {
    if (!cartProducts.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: qty ? qty : 1,
      };
      setCartProducts((pre) => [...pre, item]);
      openCartModal();
    }
  };

  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) return true;
    return false;
  };

  const updateQuantity = (id, qty) => {
    if (isAddedToCartProducts(id)) {
      let item = cartProducts.filter((elm) => elm.id == id)[0];
      let items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      item.quantity = qty / 1;
      items[itemIndex] = item;
      setCartProducts(items);

      openCartModal();
    } else {
      addProductToCart(id, qty);
    }
  };

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
    } else {
      setWishList((pre) => [...pre].filter((elm) => elm != id));
    }
  };

  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };

  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };

  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };

  const isAddedtoWishlist = (id) => wishList.includes(id);
  const isAddedtoCompareItem = (id) => compareItem.includes(id);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartList'));
    if (items?.length) setCartProducts(items);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist'));
    if (items?.length) setWishList(items);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishList));
  }, [wishList]);

  // ✅ Provide everything
  const contextElement = {
    // auth
    user,
    setUser,
    authLoading,
    logout,

    // existing
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
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
    updateQuantity,
  };

  return <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>;
}
