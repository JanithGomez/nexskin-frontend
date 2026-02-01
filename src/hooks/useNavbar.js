'use client';

import { useEffect, useState } from 'react';
import { fetchNavbar } from '@/src/lib/api';

export function useNavbar() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNavbar()
      .then((data) => setMenus(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { menus, loading };
}
