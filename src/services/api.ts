// Mock API Service with simulated delay

const DELAY = 800;

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
    get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
        await sleep(DELAY);
        console.log(`GET ${endpoint}`);
        // Return dummy data based on endpoint (to be implemented)
        return { data: {} as T, success: true };
    },
    post: async <T>(endpoint: string, payload: any): Promise<ApiResponse<T>> => {
        await sleep(DELAY);
        console.log(`POST ${endpoint}`, payload);
        return { data: {} as T, success: true };
    }
};
