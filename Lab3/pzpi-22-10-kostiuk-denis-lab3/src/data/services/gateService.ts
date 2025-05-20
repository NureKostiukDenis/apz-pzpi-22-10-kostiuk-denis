import {apiRequest, API_URL, getAdminHeaders} from '../utils.ts';

export type AttachGateRequest = {
    sectionId: number;
    connectionType: string;
};

export type DetachGateRequest = {
    sectionId: number;
};


export const gateService = {

    attachToSection: async (gateId: number, body: AttachGateRequest) => {
        await apiRequest<void>(`${API_URL}/v2/gate/${gateId}/attach`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: getAdminHeaders()
        });
    },

    detachFromSection: async (gateId: number, body: DetachGateRequest) => {
        await apiRequest<void>(`${API_URL}/v2/gate/${gateId}/detach`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: getAdminHeaders()
        });
    },
};
