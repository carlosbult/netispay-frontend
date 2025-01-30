'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import { userService } from '../api/users.service';
import { type UserResponse } from '../types/users.interface';

export function useUser() {
  const { userId, role } = useAuthStore();

  return useQuery<UserResponse>({
    queryKey: ['user-details', userId],
    queryFn: async (): Promise<UserResponse> => {
      if (userId === 0) throw new Error('Usuario no autenticado');

      const response = await userService.getUserById(userId);
      return response;
    },
    enabled: !(userId === 0) && role === 'CLIENT',
  });
}
