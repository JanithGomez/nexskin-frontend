'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiLogout } from '@/src/lib/api';

const accountLinks = [
  { href: '/my-account', label: 'Dashboard' },
  { href: '/my-account-orders', label: 'Orders' },
  { href: '/my-account-address', label: 'Addresses' },
  { href: '/my-account-edit', label: 'Account Details' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // ✅ backend logout
      await apiLogout();

      // ✅ clear auth storage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token'); // legacy safety

      // ✅ notify all components
      window.dispatchEvent(new Event('auth:changed'));

      // ✅ refresh current UI state
      router.refresh();

      // ✅ go to login page
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      alert(err?.message || 'Logout failed');
    }
  };

  return (
    <ul className="my-account-nav">
      {accountLinks.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className={`my-account-nav-item ${pathname === link.href ? 'active' : ''}`}>
            {link.label}
          </Link>
        </li>
      ))}

      <li>
        <a href="/login" onClick={handleLogout} className="my-account-nav-item">
          Logout
        </a>
      </li>
    </ul>
  );
}
