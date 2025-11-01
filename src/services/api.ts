import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Crear instancia de Axios con baseURL y configuración general
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true, // para cookies HTTP-only
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos de métodos HTTP permitidos
type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

// Tipo genérico para datos de request
type RequestData = Record<string, unknown>;

/**
 * Función genérica para manejar peticiones HTTP
 * @param method - Método HTTP
 * @param endpoint - Endpoint de la API
 * @param data - Datos a enviar en la petición
 * @param config - Configuración adicional de Axios
 * @returns Respuesta tipada de la API
 */
export async function request<T = unknown>(
  method: HTTPMethod,
  endpoint: string,
  data: RequestData = {},
  config: AxiosRequestConfig = {}
): Promise<T> {
  try {
    let response: AxiosResponse<T>;

    if (method === 'get' || method === 'delete') {
      response = await api[method](endpoint, config);
    } else {
      response = await api[method](endpoint, data, config);
    }

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('Error en la petición', {
      method,
      endpoint,
      data,
      status: err.response?.status,
      message: err.response?.data || err.message,
    });
    throw err;
  }
}

export default api;
