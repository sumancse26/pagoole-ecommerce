// lib/api.js

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/**
 * A centralized API client that works on both the client and the server.
 * It automatically handles authentication by forwarding cookies on the server
 * and using credentials on the client.
 *
 * @param {string} endPoint - The API endpoint to call (e.g., '/api/private/add-to-cart').
 * @param {RequestInit} [options={}] - Standard fetch options (method, body, etc.).
 * @returns {Promise<any>} A promise that resolves with the JSON response.
 */
export async function fetchApi(endPoint, options = {}) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
    const isFormData = options.body instanceof FormData;

    // Default headers, excluding Content-Type for FormData
    const baseHeaders = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(options.headers || {})
    };

    let finalOptions = {
        ...options,
        headers: baseHeaders
    };

    // Check if the code is running on the server
    if (typeof window === 'undefined') {
        // We are on the server, so we need to manually forward cookies
        console.log('Running on the server, forwarding cookies.');
        // Dynamically import 'next/headers' ONLY on the server
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();

        finalOptions.headers['Cookie'] = cookieStore.toString();
    } else {
        // We are on the client, so the browser will handle cookies
        console.log('Running on the client, using credentials.');
        finalOptions.credentials = 'include';
    }

    try {
        const response = await fetch(url, finalOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.message || 'An unknown API error occurred.', response.status);
        }

        return data;
    } catch (error) {
        console.error(`API call to ${endPoint} failed:`, error);
        if (error instanceof ApiError) {
            throw error;
        }
        // Create a new error to avoid leaking implementation details
        throw new Error('An error occurred while fetching data.');
    }
}
