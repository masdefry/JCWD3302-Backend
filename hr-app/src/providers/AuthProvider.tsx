'use client';
import axiosInstance from '@/utils/axiosInstance';
import useAuthStore from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setSessionAuth, hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const onAuthSessionLogin = async () => {
    try {
      if (!token) router.replace('/login');

      const res = await axiosInstance.get('/api/auth/session-login', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSessionAuth({
        name: res?.data?.data?.name,
        role: res?.data?.data?.role,
      });
    } catch (error) {
      router.replace('/login');
    }
  };

  useEffect(() => {
    if (!hasHydrated) return;

    onAuthSessionLogin();
  }, [token, pathname, hasHydrated]);

  if (!hasHydrated) return <h1>Loading...</h1>;

  return <>{children}</>;
}
