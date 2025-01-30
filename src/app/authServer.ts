'use server';
import { cookies } from 'next/headers';

export async function setAuthCookie(token: string) {
  // Configuración más estricta de la cookie
  cookies().set({
    name: 'authToken',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Cambiado a 'lax' para mejor compatibilidad
    path: '/',
    maxAge: 60 * 60 * 24, // 24 horas
  });
}

export async function removeAuthCookie() {
  cookies().delete('authToken');
}
