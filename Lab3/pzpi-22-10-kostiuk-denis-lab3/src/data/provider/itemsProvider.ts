import simpleRestProvider from "ra-data-simple-rest";
import {API_URL, apiRequest, getAdminHeaders, httpClient} from "../utils.ts";
import type {CreateResult, DataProvider} from "react-admin";

type IdentifierType = 'EMAIL' | 'UID';

interface AssignExistingUserPayload {
    identifier: string;
    identifierType: IdentifierType;
}


interface NewUserPayloadForDataProvider {
    name: string;
    email: string;
    password: string;
    role: string;
}

const baseDataProvider = simpleRestProvider(API_URL + "/v2", httpClient);

export const itemProvider: DataProvider = {
    ...baseDataProvider,
    create: async (resource, params) => {
        const { data } = params;

        if (data.mode === 'ASSIGN') {
            if (resource !== 'user') {
                throw new Error('Assign mode is only supported for user resource');

            }

            const assignPayload: AssignExistingUserPayload = {
                identifier: data.identifier,
                identifierType: data.identifierType as IdentifierType,
            };

            return  await userService.assignExistingUser(assignPayload);

        } else if (data.mode === 'NEW') {
            const createPayload: NewUserPayloadForDataProvider = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            };
            return baseDataProvider.create(resource, { ...params, data: createPayload });
        } else {
            console.warn('Mode not specified in create, defaulting to new user creation.');
            const createPayload = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            };
            return baseDataProvider.create(resource, { ...params, data: createPayload });
        }
    },
};
export const userService = {

    assignExistingUser: async (payload: AssignExistingUserPayload) => {
        const headers = await getAdminHeaders();
         return  await apiRequest<CreateResult>(`${API_URL}/v2/user/assign`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: headers
        });
    },
}

