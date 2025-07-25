'use client';
import axiosInstance from '@/utils/axiosInstance';
import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setSessionAuth, name, role } = useAuthStore();
  const router = useRouter();

  const onAuthSessionLogin = async () => {
    const res = await axiosInstance.get('/api/auth/session-login', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSessionAuth({
      name: res?.data?.data?.name,
      role: res?.data?.data?.role,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      onAuthSessionLogin();
    }, 2000);
  }, []);

  if (!token && !name && !role) return <h1>Loading...</h1>;

  return <>{children}</>;
}
