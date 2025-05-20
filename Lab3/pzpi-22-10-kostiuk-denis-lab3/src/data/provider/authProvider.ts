import { type AuthProvider } from 'react-admin';

import {API_URL} from '../utils.ts';
import {authStorageService} from "../services/localStorageService.ts";

const BASE_URL: string = `${API_URL}/user`

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const response = await fetch(`${BASE_URL}/log-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
        });

        if (!response.ok) {
            throw new Error('Невірний email або пароль');
        }

        const data = await response.json();
        authStorageService.setAccessToken(data.idToken);
        authStorageService.setRefreshToken(data.refreshToken);
    },

    logout: () => {
        authStorageService.clear()
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = authStorageService.getAccessToken();
        if (!token) return Promise.reject();

        const res = await fetch(`${BASE_URL}/token-verify`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) return Promise.resolve();

        const refreshToken = authStorageService.getRefreshToken();
        if (!refreshToken) return Promise.reject();

        const refreshRes = await fetch(`${BASE_URL}/refresh?refreshToken=${refreshToken}`, {
            method: 'POST',
        });

        if (!refreshRes.ok) return Promise.reject();

        const data = await refreshRes.json();
        authStorageService.setAccessToken(data.idToken);
        authStorageService.setRefreshToken(data.refreshToken);
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            authStorageService.clear()
            return Promise.reject();
        }
        return Promise.resolve();
    },

};
