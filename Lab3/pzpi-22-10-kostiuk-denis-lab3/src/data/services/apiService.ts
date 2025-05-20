import {authStorageService} from "./localStorageService.ts";
import {API_URL, apiRequest} from "../utils.ts";


export const apiService = {
    getApiKey: async (): Promise<string | null> => {
        const storedApiKey = authStorageService.getApiKey();

        if (storedApiKey) {
            return storedApiKey;
        }

        const headers = new Headers();
        const token = authStorageService.getAccessToken()
        headers.set('Authorization', 'Bearer '+ token);
        headers.set('Content-Type', 'Plain text');

        return await apiRequest<string>(`${API_URL}/warehouse/api-key`, {
            method: 'GET',
            headers: headers
        });
    }
}
