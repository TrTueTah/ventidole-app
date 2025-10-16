import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// === Types ===
interface UserMetadata {
  uid: string;
  phoneNumber: string;
  email: string;
  firstLogin: boolean;
}

interface AuthState {
  userMetadata: UserMetadata;
  userPhoneNumber: string;
  accessToken: string;
  refreshToken: string;
  isLogin: boolean;
  isStorageReady: boolean;

  // === Actions ===
  setIsStorageReady: (ready: boolean) => void;
  setUserMetadata: (metadata: Partial<UserMetadata>) => void;
  setUserPhoneNumber: (phoneNumber: string) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
}

// === Initial values ===
const initialUserMetadata: UserMetadata = {
  uid: '',
  phoneNumber: '',
  email: '',
  firstLogin: false,
};

// === Store ===
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userMetadata: initialUserMetadata,
      userPhoneNumber: '',
      accessToken: '',
      refreshToken: '',
      isLogin: false,
      isStorageReady: false,

      // === Actions ===
      setIsStorageReady: (ready) => set({ isStorageReady: ready }),

      setUserMetadata: (metadata) =>
        set((state) => ({
          userMetadata: { ...state.userMetadata, ...metadata },
        })),

      setUserPhoneNumber: (phoneNumber) => set({ userPhoneNumber: phoneNumber }),

      setAccessToken: (token) => set({ accessToken: token ?? '' }),

      setRefreshToken: (token) => set({ refreshToken: token ?? '' }),

      setIsLogin: (isLogin) => set({ isLogin }),

      logout: () =>
        set((state) => ({
          userMetadata: { ...initialUserMetadata },
          accessToken: '',
          refreshToken: '',
          isLogin: false,
          isStorageReady: state.isStorageReady, // giữ nguyên flag này
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userMetadata: state.userMetadata,
        userPhoneNumber: state.userPhoneNumber,
        isLogin: state.isLogin,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('AuthStore: hydration error', error);
        } else {
          useAuthStore.setState({ isStorageReady: true });
        }
      },
    },
  ),
);

// === Selectors ===
export const selectIsAuthenticated = (state: AuthState): boolean =>
  Boolean(state.accessToken && state.refreshToken);

export const selectIsStorageReady = (state: AuthState): boolean =>
  state.isStorageReady;

export const selectIsFirstLogin = (state: AuthState): boolean =>
  state.userMetadata.firstLogin;
