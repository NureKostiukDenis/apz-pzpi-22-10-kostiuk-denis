import { apiRequest, API_URL, getAdminHeaders } from '../utils.ts';

const BASE_URL: string = `${API_URL}/report`

export type ItemMovementHistoryRequest = {
    itemRfidTag: string;
    startDate: string;
    endDate: string;
};

export type PositionDetails = {
    warehouseName: string;
    sectionTitle: string;
}

export type MovementDetail = {
    date: string;
    from: PositionDetails;
    to: PositionDetails;
};

export type ItemMovementHistoryResponse = {
    status: string;
    itemRfidTag: string;
    name: string;
    total: number;
    movements: MovementDetail[];
};

export type SectionInfo = {
    name: string;
    currentLoad: number;
    capacity: number;
};

export type SectionLoadResponse = {
    status: string;
    warehouseName: string;
    total: number;
    sections: SectionInfo[];
};

export type ItemInfo = {
    name: string;
    lastMovementDate: string;
    location: PositionDetails;
};

export type ItemsWithoutMovementResponse = {
    status: string;
    total: number;
    items: ItemInfo[];
};

export type PeakActivityHoursRequest = {
    startDate: string;
    endDate: string;
};

export type PeakHours = {
    hour: number;
    activityCount: number;
};

export type DailyActivity = {
    day: string;
    peakHours: PeakHours[];
};

export type PeakActivityResponse = {
    status: string;
    warehouse: string;
    total: number;
    dailyActivities: DailyActivity[];
};

export const reportService = {

    getItemMovementHistory: async (
        body: ItemMovementHistoryRequest
    ): Promise<ItemMovementHistoryResponse> => {
        const headers = await getAdminHeaders()

        return await apiRequest(`${BASE_URL}/item-movement-history`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });
    },

    getSectionLoad: async (): Promise<SectionLoadResponse> => {
        const headers = await getAdminHeaders()

        return await apiRequest(`${BASE_URL}/section-load`, {
            method: 'GET',
            headers: headers,
        });
    },

    getItemsWithoutMovement: async (
        days: number,
        size: number
    ): Promise<ItemsWithoutMovementResponse> => {
        const headers = await getAdminHeaders()

        const url = `${BASE_URL}/items-without-movement?days=${days}&size=${size}`;
        return await apiRequest(url, {
            method: 'GET',
            headers: headers,
        });
    },

    getPeakActivityHours: async (
        body: PeakActivityHoursRequest
    ): Promise<PeakActivityResponse> => {
        const headers = await getAdminHeaders()

        return await apiRequest(`${BASE_URL}/peak-activity-hours`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });
    }

};
