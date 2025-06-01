import {authStorageService} from "./localStorageService.ts";
import {API_URL, apiRequest} from "../utils.ts";


export const apiService = {
    getApiKey: async (): Promise<string | null> => {
        const storedApiKey = authStorageService.getApiKey();
        if (storedApiKey) {
            return storedApiKey;
        }

        const token = authStorageService.getAccessToken();
        if (!token) {
            console.warn("Cannot fetch API key: No access token available.");
            return null;
        }

        const headers = new Headers();
        headers.set('Authorization', 'Bearer '+ token);

        try {
            const apiKey = await apiRequest<string>(`${API_URL}/warehouse/api-key`, {
                method: 'GET',
                headers: headers
            });

            if (apiKey) {
                authStorageService.setApiKey(apiKey);
            }
            return apiKey;
        } catch (error) {
            console.error("Failed to fetch API key from server:", error);
            throw error;
        }
    }
}