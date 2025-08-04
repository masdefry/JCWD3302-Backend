import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: '',
      name: '',
      role: '',
      hasHydrated: false,

      setAuth: ({ token, name, role }: any) =>
        set({
          token: token,
          name: name,
          role: role,
          hasHydrated: true,
        }),
      setSessionAuth: ({ name, role }: any) =>
        set({ name: name, role: role, hasHydrated: true }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: 'authToken',
      partialize: (state: any) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;
