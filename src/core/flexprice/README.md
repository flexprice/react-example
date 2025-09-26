# FlexPrice SDK Wrapper

A comprehensive TypeScript wrapper for the FlexPrice SDK that provides a simplified interface to all FlexPrice APIs with proper error handling, type safety, and consistent method signatures.

## Features

- **Complete API Coverage**: Events, Customers, Auth, Plans, Features, Invoices, Subscriptions, and more
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Consistent error handling across all methods
- **Easy to Use**: Simplified method signatures and intuitive API design
- **Global Instance**: Pre-configured global instance ready to use

## Quick Start

### Import the global instance

```typescript
import { flexprice } from "@/core/flexprice";

// Use the global instance
const events = await flexprice.queryEvents({
  customerId: "customer-123",
  eventType: "api_call",
  limit: 100,
});
```

### Or create a custom instance

```typescript
import { FlexPrice, flexpriceConfig } from "@/core/flexprice";
import { Configuration } from "@flexprice/sdk";

const customConfig = new Configuration({
  basePath: "https://api.custom.flexprice.com",
  apiKey: "your-api-key",
});

const customFlexprice = new FlexPrice(customConfig);
```

## API Reference

### Events API

```typescript
// Ingest a single event
await flexprice.ingestEvent({
    customerId: 'customer-123',
    eventType: 'api_call',
    timestamp: new Date().toISOString(),
    properties: {
        endpoint: '/api/users',
        method: 'GET',
        responseTime: 150
    }
});

// Ingest multiple events
await flexprice.ingestBulkEvents({
    events: [
        { customerId: 'customer-123', eventType: 'api_call', ... },
        { customerId: 'customer-123', eventType: 'api_call', ... }
    ]
});

// Query events
const events = await flexprice.queryEvents({
    customerId: 'customer-123',
    eventType: 'api_call',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-01-31T23:59:59Z',
    limit: 100
});

// Get usage analytics
const analytics = await flexprice.getUsageAnalytics({
    customerId: 'customer-123',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-01-31T23:59:59Z',
    groupBy: ['eventType'],
    aggregation: 'count'
});
```

### Customers API

```typescript
// Create a customer
const customer = await flexprice.createCustomer({
  name: "Acme Corporation",
  email: "billing@acme.com",
  externalId: "acme-123",
  properties: {
    industry: "Technology",
    plan: "enterprise",
  },
});

// Get customer
const customer = await flexprice.getCustomer("customer-123");

// Update customer
const updatedCustomer = await flexprice.updateCustomer("customer-123", {
  name: "Updated Name",
  properties: { industry: "Updated Industry" },
});

// List customers
const customers = await flexprice.listCustomers({
  status: "active",
  limit: 50,
  order: "created_at_desc",
});

// Get customer usage
const usage = await flexprice.getCustomerUsage("customer-123", {
  featureIds: ["feature-1", "feature-2"],
});
```

### Auth API

```typescript
// Login
const authResponse = await flexprice.login({
  email: "user@example.com",
  password: "password123",
});

// Sign up
const authResponse = await flexprice.signUp({
  email: "newuser@example.com",
  password: "password123",
  name: "New User",
  company: "Example Corp",
});
```

### Plans API

```typescript
// Create a plan
const plan = await flexprice.createPlan({
  name: "Pro Plan",
  description: "Professional plan with advanced features",
  status: "active",
  pricing: {
    type: "usage_based",
    basePrice: 0,
    usagePricing: [
      {
        featureId: "api-calls",
        pricePerUnit: 0.01,
        unit: "call",
      },
    ],
  },
});

// List plans
const plans = await flexprice.listPlans({
  status: "active",
  limit: 50,
});
```

### Features API

```typescript
// Create a feature
const feature = await flexprice.createFeature({
  name: "API Calls",
  description: "Number of API calls made",
  type: "counter",
  unit: "call",
  status: "active",
});

// List features
const features = await flexprice.listFeatures({
  status: "active",
  limit: 50,
});
```

### Subscriptions API

```typescript
// Create a subscription
const subscription = await flexprice.createSubscription({
  customerId: "customer-123",
  planId: "plan-123",
  status: "active",
});

// Cancel subscription
await flexprice.cancelSubscription(
  "subscription-123",
  "User requested cancellation"
);

// Pause subscription
await flexprice.pauseSubscription("subscription-123", "User requested pause");

// Resume subscription
await flexprice.resumeSubscription("subscription-123");
```

## Error Handling

All methods include proper error handling and will log errors to the console. You can wrap calls in try-catch blocks for custom error handling:

```typescript
try {
  const customer = await flexprice.createCustomer(customerData);
  console.log("Customer created:", customer);
} catch (error) {
  console.error("Failed to create customer:", error);
  // Handle error appropriately
}
```

## Configuration

The global instance is pre-configured with default settings. You can update the configuration at runtime:

```typescript
import { flexprice } from "@/core/flexprice";
import { Configuration } from "@flexprice/sdk";

// Update configuration
const newConfig = new Configuration({
  basePath: "https://api.new.flexprice.com",
  apiKey: "new-api-key",
});

flexprice.updateConfig(newConfig);
```

## Type Safety

All methods are fully typed with TypeScript, providing excellent IDE support and compile-time error checking. Import the types you need:

```typescript
import type {
  DtoIngestEventRequest,
  DtoCreateCustomerRequest,
  DtoCustomerResponse,
} from "@/core/flexprice";
```

## Examples

See `examples.ts` for comprehensive usage examples including:

- Event ingestion workflows
- Customer management
- Authentication flows
- Complete billing workflows
- Error handling patterns

## API Coverage

The FlexPrice class provides access to all major FlexPrice APIs:

- ✅ **Events API** - Event ingestion, querying, and analytics
- ✅ **Customers API** - Customer management and usage tracking
- ✅ **Auth API** - User authentication and authorization
- ✅ **Plans API** - Pricing plan management
- ✅ **Features API** - Feature definition and management
- ✅ **Invoices API** - Invoice creation and management
- ✅ **Subscriptions API** - Subscription lifecycle management
- ✅ **Addons API** - Addon management
- ✅ **Coupons API** - Coupon and discount management
- ✅ **Credit Notes API** - Credit note management
- ✅ **Entitlements API** - Feature entitlement management
