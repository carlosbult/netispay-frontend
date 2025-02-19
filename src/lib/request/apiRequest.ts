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

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: ApiErrorResponse | null = null;

    try {
      errorData = (await response.json()) as ApiErrorResponse;
    } catch (e) {
      console.error('Failed to parse error response', e);
    }
    console.error('Error response:', errorData);
    throw new CustomApiError(
      errorData?.message ?? 'Unknown error',
      errorData?.statusCode ?? response.status ?? 500,
      errorData?.errorCode ?? 'UNKNOWN_ERROR',
      errorData?.timestamp ?? new Date().toISOString(),
      errorData?.path ?? response.url ?? '',
      errorData?.details ?? null,
    );
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Handle cases where there's no content (e.g., 204 No Content)
      if (response.status === 204) {
        return null as T;
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      throw error instanceof CustomApiError
        ? error
        : new CustomApiError(
            'Request failed',
            500,
            'UNKNOWN_ERROR',
            new Date().toISOString(),
            endpoint,
            error,
          );
    }
  }

  async get<T>(
    endpoint: string,
    params?: QueryParams | string | number,
    headers: HeadersInit = {},
  ): Promise<T> {
    let url = `${endpoint}`;

    if (params !== null && params !== undefined) {
      if (typeof params === 'object') {
        const validParams = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined),
        );

        const queryString = new URLSearchParams(
          validParams as Record<string, string>,
        ).toString();
        if (queryString !== '') {
          url += `?${queryString}`;
        }
      } else {
        url += `/${params}`;
      }
    }

    return await this.request<T>(url, { method: 'GET', headers });
  }

  async post<T>(
    endpoint: string,
    data: object | Record<string, unknown>,
    headers: HeadersInit = {},
  ): Promise<T> {
    return await this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    });
  }

  async put<T>(
    endpoint: string,
    data: Record<string, unknown>,
    headers: HeadersInit = {},
  ): Promise<T> {
    return await this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });
  }

  async patch<T>(
    endpoint: string,
    data: Record<string, unknown>,
    headers: HeadersInit = {},
  ): Promise<T> {
    return await this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers,
    });
  }

  async delete<T>(endpoint: string, headers: HeadersInit = {}): Promise<T> {
    return await this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export { API_BASE_URL, ApiService };
