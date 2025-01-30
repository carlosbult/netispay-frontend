export interface ApiErrorResponse {
  statusCode: number;
  errorCode: string;
  message: string;
  timestamp: string;
  path: string;
  details?: unknown;
}

export class CustomApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string,
    public timestamp: string,
    public path: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'CustomApiError';
  }
}
