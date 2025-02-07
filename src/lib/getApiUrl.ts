import { API_BASE_URL } from '@services/api/api.service';

export const getApiUrl = (path: string): string => {
  const baseUrl = API_BASE_URL ?? '';
  // Elimina cualquier barra final del baseUrl y barra inicial del path
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  const url = `${cleanBaseUrl}/${cleanPath}`;

  console.log('url a donde se envia: ', url);

  return url;
};
