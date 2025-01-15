const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function handleResponse(response) {
  if (!response) {
    throw new ApiError(
      'No se pudo conectar con el servidor. Por favor, intente más tarde.',
      0,
      { type: 'connection_error' }
    );
  }

  const contentType = response.headers.get('content-type');
  let data;
  
  try {
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    throw new ApiError(
      'Error al procesar la respuesta del servidor',
      response.status,
      { type: 'parse_error' }
    );
  }
  
  if (!response.ok) {
    throw new ApiError(
      data.mensaje || data.message || 'Ha ocurrido un error',
      response.status,
      data
    );
  }
  
  return data;
}

export async function get(endpoint, token = null) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers,
  }).catch(() => null);

  return handleResponse(response);
}

export async function post(endpoint, data = null, token = null) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  }).catch(() => null);

  return handleResponse(response);
}

export async function patch(endpoint, data = null, token = null) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  return handleResponse(response);
}

export function simulateResponse(data, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export function simulateError(message, status = 400, delay = 500) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new ApiError(message, status)), delay);
  });
}