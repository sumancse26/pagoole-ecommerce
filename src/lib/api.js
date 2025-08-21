// File: lib/api.js

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/**
 * A centralized API client that ensures cookies are always sent with requests.
 *
 * @param {string} endPoint - The API endpoint to call (e.g., '/api/private/add-to-cart').
 * @param {RequestInit} [options={}] - Standard fetch options (method, body, etc.).
 * @returns {Promise<any>} A promise that resolves with the JSON response.
 */
export async function fetchApi(endPoint, options = {}) {
    // <--- Renamed the function here
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
    console.log('url: ', url);
    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(options.headers || {}),
        ...(!isFormData && { 'Content-Type': 'application/json' })
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include' // Ensures the browser sends the HttpOnly cookie
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.message || 'An unknown API error occurred.', response.status);
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new Error('A network error occurred.');
    }
}
