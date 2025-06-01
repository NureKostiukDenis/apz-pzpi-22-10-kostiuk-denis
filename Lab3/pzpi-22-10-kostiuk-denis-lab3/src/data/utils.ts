import { fetchUtils } from 'react-admin';
import {authStorageService} from "./services/localStorageService.ts";
import {apiService} from "./services/apiService.ts";


export const API_URL = 'http://127.0.0.1:8002/api';

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
        const requestHeaders = new Headers(options.headers);

        if (options.method && ['POST', 'PUT', 'PATCH'].includes(options.method.toUpperCase()) && options.body) {
            if (!requestHeaders.has('Content-Type')) {
                requestHeaders.set('Content-Type', 'application/json');
            }
        }

        const response = await fetch(url, {
            ...options,
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData: { message?: string } = { message: `HTTP error! Status: ${response.status} ${response.statusText}` };
            try {
                const jsonData = await response.json();
                if (jsonData && typeof jsonData.message === 'string') {
                    errorData.message = jsonData.message;
                }
            } catch (e) {
                console.warn('Could not parse error response as JSON or no message field found.', e);
            }
            throw new Error(errorData.message || `HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        if (response.status === 204) {
            return undefined as T;
        }

        const responseText = await response.text();

        if (responseText.length === 0) {
            return undefined as T;
        }

        try {
            return JSON.parse(responseText) as T;
        } catch (e) {
            if (responseText) {
                return responseText as unknown as T;
            } else {
                console.error(`API request to ${url} succeeded but failed to parse non-empty response text as JSON:`, e, "Response text:", responseText);
                throw new Error(`API request to ${url} received invalid JSON in response.`);
            }
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`API request failed: ${options.method || 'GET'} ${url}`, errorMessage);
        throw new Error(errorMessage);
    }
}


export const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    console.log("FETCH:", url, options);

    const token = authStorageService.getAccessToken();
    let apikey = authStorageService.getApiKey();

    if (!apikey) {
        apikey = await apiService.getApiKey();
    }

    if (apikey) {
        (options.headers as Headers).set('ApiKey', apikey);
    }

    if (token) {
        (options.headers as Headers).set('Authorization', 'Bearer ' + token);
    }

    return fetchUtils.fetchJson(url, options);
};

export const getAdminHeaders = async () => {
    const token = authStorageService.getAccessToken();
    let apikey = authStorageService.getApiKey();

    if (!apikey) {
        apikey = await apiService.getApiKey();
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', 'Bearer ' + token);
    }

    if (apikey) {
        headers.set('ApiKey', apikey);
    }

    return headers;
};

