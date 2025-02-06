import { type QueryParams } from 'src/interfaces/api.interface';
import {
  CustomApiError,
  type ApiErrorResponse,
} from 'src/interfaces/errors.interface';

class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage !== null) {
        try {
          const parsedStorage = JSON.parse(authStorage);

          if (parsedStorage.state?.token !== null) {
            return parsedStorage.state.token;
          }
        } catch (error) {
          console.error('Error parsing auth storage:', error);
        }
      }
    }
    return null;
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    const errorData = (await response.json()) as ApiErrorResponse;

    const customError = new CustomApiError(
      errorData.message ?? 'Error desconocido',
      errorData.statusCode ?? 500,
      errorData.errorCode ?? 'UNKNOWN_ERROR',
      errorData.timestamp ?? new Date().toISOString(),
      errorData.path ?? '',
      errorData.details ?? null,
    );

    return await Promise.reject(customError);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const authToken = await this.getAuthToken();

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(authToken !== null && { Authorization: `Bearer ${authToken}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error: unknown) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      // Convertimos cualquier otro error en un CustomApiError
      return await Promise.reject(
        new CustomApiError(
          'Error desconocido REQUEST',
          500,
          'UNKNOWN_ERROR',
          new Date().toISOString(),
          endpoint,
          error,
        ),
      );
    }
  }

  async get<T>(
    endpoint: string,
    params?: QueryParams | string | number,
  ): Promise<T> {
    try {
      let url = `${endpoint}`;

      if (params !== null) {
        if (typeof params === 'object') {
          // Filtrar parámetros undefined
          const validParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value,
              }),
              {},
            );

          const queryString = new URLSearchParams(
            validParams as Record<string, string>,
          ).toString();

          if (queryString !== null) {
            url += `?${queryString}`;
          }
        } else {
          // Si params es un string o número, asumimos que es un ID
          url += `/${params}`;
        }
      }

      return await this.request<T>(url, {
        method: 'GET',
      });
    } catch (error: unknown) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      // Convertimos cualquier otro error en un CustomApiError
      return await Promise.reject(
        new CustomApiError(
          'Error desconocido en GET',
          500,
          'UNKNOWN_ERROR',
          new Date().toISOString(),
          endpoint,
          error,
        ),
      );
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      return await this.request<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error: unknown) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      // Convertimos cualquier otro error en un CustomApiError
      return await Promise.reject(
        new CustomApiError(
          'Error desconocido en POST',
          500,
          'UNKNOWN_ERROR',
          new Date().toISOString(),
          endpoint,
          error,
        ),
      );
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      return await this.request<T>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error: unknown) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      // Convertimos cualquier otro error en un CustomApiError
      return await Promise.reject(
        new CustomApiError(
          'Error desconocido en PUT',
          500,
          'UNKNOWN_ERROR',
          new Date().toISOString(),
          endpoint,
          error,
        ),
      );
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      return await this.request<T>(endpoint, {
        method: 'DELETE',
      });
    } catch (error: unknown) {
      if (error instanceof CustomApiError) {
        throw error;
      }
      // Convertimos cualquier otro error en un CustomApiError
      return await Promise.reject(
        new CustomApiError(
          'Error desconocido en DELETE',
          500,
          'UNKNOWN_ERROR',
          new Date().toISOString(),
          endpoint,
          error,
        ),
      );
    }
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';

export { API_BASE_URL, ApiService };
