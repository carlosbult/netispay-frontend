import { type ApiErrorResponse } from '@interfaces/errors.interface';

export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: Record<string, unknown>,
  headers: HeadersInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body != null ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);

      throw new Error(
        (data as ApiErrorResponse).message ?? 'API request failed',
      );
    }

    return data;
  } catch (error) {
    console.error('Error in apiRequest:', error);
    throw error;
  }
}
