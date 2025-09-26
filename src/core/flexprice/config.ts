import { Configuration } from '@flexprice/sdk';
import { FlexPrice } from './FlexPrice';

const API_KEY = "<API_KEY>";
const BASE_PATH = "https://api.cloud.flexprice.io/v1";

export const flexpriceConfig = new Configuration({
    basePath: BASE_PATH,
    apiKey: API_KEY,
    headers: {
        'X-Environment-ID': '<ENV_ID>'
    }
});

export const flexprice = new FlexPrice(flexpriceConfig);

export { FlexPrice };
