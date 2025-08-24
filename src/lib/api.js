class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export async function fetchApi(endPoint, options = {}) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
    const isFormData = options.body instanceof FormData;

    const baseHeaders = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(options.headers || {})
    };

    let finalOptions = {
        ...options,
        headers: baseHeaders
    };

    if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();

        finalOptions.headers['Cookie'] = cookieStore.toString();
    } else {
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
        throw new Error('An error occurred while fetching data.');
    }
}
