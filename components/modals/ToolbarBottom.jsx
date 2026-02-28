// import React from 'react';
// import Link from 'next/link';
// import CartLength from '../common/CartLength';
// import WishlistLength from '../common/WishlistLength';
// export default function ToolbarBottom() {
//   return (
//     <div className="tf-toolbar-bottom type-1150">
//       <div className="toolbar-item active">
//         {/* <a
//           href="#toolbarShopmb"
//           data-bs-toggle="offcanvas"
//           aria-controls="offcanvasLeft"
//         >
//           <div className="toolbar-icon">
//             <i className="icon-shop" />
//           </div>
//           <div className="toolbar-label">Shop</div>
//         </a> */}
//         <Link href={`/shop-default`}>
//           <div className="toolbar-icon">
//             <i className="icon-shop" />
//             {/* <div className="toolbar-count"> */}
//             {/* <WishlistLength /> */}
//             {/* </div> */}
//             <div className="toolbar-label">Shop</div>
//           </div>
//         </Link>
//       </div>
//       <div className="toolbar-item">
//         <a href="#canvasSearch" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft">
//           <div className="toolbar-icon">
//             <i className="icon-search" />
//           </div>
//           <div className="toolbar-label">Search</div>
//         </a>
//       </div>
//       <div className="toolbar-item">
//         <a href="#login" data-bs-toggle="modal">
//           <div className="toolbar-icon">
//             <i className="icon-account" />
//           </div>
//           <div className="toolbar-label">Account</div>
//         </a>
//       </div>
//       {/* <div className="toolbar-item">
//         <Link href={`/wishlist`}>
//           <div className="toolbar-icon">
//             <i className="icon-heart" />
//             <div className="toolbar-count">
//               <WishlistLength />
//             </div>
//           </div>
//           <div className="toolbar-label">Wishlist</div>
//         </Link>
//       </div> */}
//       <div className="toolbar-item">
//         <a href="#shoppingCart" data-bs-toggle="modal">
//           <div className="toolbar-icon">
//             <i className="icon-bag" />
//             <div className="toolbar-count">
//               <CartLength />
//             </div>
//           </div>
//           <div className="toolbar-label">Cart</div>
//         </a>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartLength from '../common/CartLength';

export default function ToolbarBottom() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loadAuthFromStorage = () => {
    try {
      const rawUser = localStorage.getItem('auth_user');
      setUser(rawUser ? JSON.parse(rawUser) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadAuthFromStorage();

    const handler = () => loadAuthFromStorage();
    window.addEventListener('auth:changed', handler);

    return () => window.removeEventListener('auth:changed', handler);
  }, []);

  const handleAccountClick = useCallback(
    (e) => {
      e.preventDefault();

      if (user) {
        router.push('/my-account');
      } else {
        router.push('/login');
      }
    },
    [user, router],
  );

  return (
    <div className="tf-toolbar-bottom type-1150">
      {/* Shop */}
      <div className="toolbar-item active">
        <Link href="/shop-default">
          <div className="toolbar-icon">
            <i className="icon-shop" />
            <div className="toolbar-label">Shop</div>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="toolbar-item">
        <a href="#canvasSearch" data-bs-toggle="offcanvas">
          <div className="toolbar-icon">
            <i className="icon-search" />
          </div>
          <div className="toolbar-label">Search</div>
        </a>
      </div>

      {/* ✅ Account (Dynamic Redirect) */}
      <div className="toolbar-item">
        <a href="#" onClick={handleAccountClick}>
          <div className="toolbar-icon">
            <i className="icon-account" />
          </div>
          <div className="toolbar-label">{user ? 'My Account' : 'Login'}</div>
        </a>
      </div>

      {/* Cart */}
      <div className="toolbar-item">
        <a href="#shoppingCart" data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-bag" />
            <div className="toolbar-count">
              <CartLength />
            </div>
          </div>
          <div className="toolbar-label">Cart</div>
        </a>
      </div>
    </div>
  );
}
