/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ServerError {
    success: false;
    error: { message: string; internal_error: string; details: Record<string, string> };
}

// adds the same shape to the global namespace for legacy code, tests, etc.
declare global {
    interface ServerError {
        success: false;
        error: { message: string; internal_error: string; details: Record<string, string> };
    }
}

export interface DataObject {
    [key: string]: any;
}
