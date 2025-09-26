import { Configuration } from '@flexprice/sdk';
import { FlexPrice } from './FlexPrice';

const API_KEY = "flexprice-test-api-key";
const BASE_PATH = "https://api.cloud.flexprice.com";

export const flexpriceConfig = new Configuration({
    basePath: BASE_PATH,
    apiKey: API_KEY,
});

export const flexprice = new FlexPrice(flexpriceConfig);

export { FlexPrice };
