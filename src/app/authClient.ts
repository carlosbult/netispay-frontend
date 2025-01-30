import { useAuthStore } from 'src/shared/store/useAuthStore';

export async function handleClientLogout() {
  try {
    // Limpiar el estado de autenticación en Zustand
    const { clearAuth } = useAuthStore.getState();
    clearAuth();

    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('authToken');
    }
  } catch (error) {
    console.error('Error durante el logout:', error);
    throw error;
  }
}
