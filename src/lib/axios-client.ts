import axiosClient from './axios';
import { AxiosResponse } from 'axios';
import { DataObject } from './types';

// Helper function to sanitize data before sending
function sanitizeData<T extends DataObject>(data?: T): T | undefined {
    if (!data) return undefined;

    // Remove null and undefined values
    const sanitized = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== null && value !== undefined)
    );

    return sanitized as T;
}

export class AxiosClient {
    public static async get<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await axiosClient.get(url);
        return response as T;
    }

    // T is the expected response type, D is the type of the data being sent
    public static async post<T, D extends DataObject = DataObject>(url: string, data?: D): Promise<T> {
        const sanitizedData = sanitizeData(data);
        const response: AxiosResponse<T> = await axiosClient.post(url, sanitizedData);
        return response as T;
    }

    public static async patch<T, D extends DataObject = DataObject>(url: string, data?: D): Promise<T> {
        const sanitizedData = sanitizeData(data);
        const response: AxiosResponse<T> = await axiosClient.patch(url, sanitizedData);
        return response as T;
    }

    public static async put<T, D extends DataObject = DataObject>(url: string, data?: D): Promise<T> {
        const sanitizedData = sanitizeData(data);
        const response: AxiosResponse<T> = await axiosClient.put(url, sanitizedData);
        return response as T;
    }

    public static async delete<T, D extends DataObject = DataObject>(url: string, data?: D): Promise<T> {
        const sanitizedData = sanitizeData(data);
        const response: AxiosResponse<T> = await axiosClient.delete(url, { data: sanitizedData });
        return response as T;
    }
}
