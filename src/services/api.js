const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'Ha ocurrido un error',
      response.status,
      data
    );
  }
  
  return data;
}

export async function get(endpoint, token = null) {
  const headers = { ...defaultHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers,
  });

  return handleResponse(response);
}

export async function post(endpoint, data = null, token = null) {
  const headers = { ...defaultHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  return handleResponse(response);
}

export async function patch(endpoint, data = null, token = null) {
  const headers = { ...defaultHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers,
    body: data ? JSON.stringify(data) : null,
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