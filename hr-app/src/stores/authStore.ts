import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: '',
      name: '',
      role: '',

      setAuth: ({ token, name, role }: any) =>
        set({ token: token, name: name, role: role, isLogin: true }),
      setSessionAuth: ({ name, role }: any) => set({ name: name, role: role }),
    }),
    {
      name: 'authToken',
      partialize: (state: any) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
