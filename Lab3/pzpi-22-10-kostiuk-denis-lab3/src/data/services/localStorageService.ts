// src/utils/authStorage.ts

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const API_KEY = 'apiKey';

export const authStorageService = {
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    setAccessToken(token: string): void {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    removeAccessToken(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    setRefreshToken(token: string): void {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },

    removeRefreshToken(): void {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    getApiKey(): string | null {
        return localStorage.getItem(API_KEY);
    },

    setApiKey(apiKey: string): void {
        localStorage.setItem(API_KEY, apiKey);
    },

    removeApiKey(): void {
        localStorage.removeItem(API_KEY);
    },

    clear(): void {
        this.removeAccessToken();
        this.removeRefreshToken();
        this.removeApiKey();
    },
};
