import { ApiClient, SubscriptionsApi, CustomersApi, EventsApi } from '@flexprice/sdk';

console.log('✅ FlexPrice SDK imported successfully!');

// Test configuration
const config = new ApiClient({
  basePath: 'https://api.cloud.flexprice.io/v1',
  apiKey: 'test-key'
});

// Test API instances
const subscriptionsApi = new SubscriptionsApi(config);
const customersApi = new CustomersApi(config);
const eventsApi = new EventsApi(config);

console.log('✅ API instances created:', {
  subscriptionsApi: !!subscriptionsApi,
  customersApi: !!customersApi,
  eventsApi: !!eventsApi
});

export { config, subscriptionsApi, customersApi, eventsApi };
