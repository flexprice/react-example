import { Configuration } from '@flexprice/sdk';
import { FlexPrice } from './FlexPrice';

// Get configuration from environment variables
const API_KEY = import.meta.env.VITE_FLEXPRICE_API_KEY || "sk_01K63BS8VWATV9MKWKPCH44DYB";
const BASE_PATH = import.meta.env.VITE_FLEXPRICE_BASE_URL || "https://api-dev.cloud.flexprice.io/v1";
const ENVIRONMENT_ID = import.meta.env.VITE_FLEXPRICE_ENVIRONMENT_ID || "env_01K63AV6GHEM4GAVJCH8X228Z5";

export const flexpriceConfig = new Configuration({
    basePath: BASE_PATH,
    apiKey: API_KEY,
    headers: {
        'X-Environment-ID': ENVIRONMENT_ID
    }
});

export const flexprice = new FlexPrice(flexpriceConfig);

export { FlexPrice };
