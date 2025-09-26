// Export the main FlexPrice class and global instance
export { FlexPrice, flexprice, flexpriceConfig } from './config';

// Re-export commonly used types for convenience
export type {
    DtoIngestEventRequest,
    DtoBulkIngestEventRequest,
    DtoGetEventsRequest,
    DtoGetEventsResponse,
    DtoGetUsageAnalyticsRequest,
    DtoGetUsageAnalyticsResponse,
    DtoGetUsageRequest,
    DtoGetUsageResponse,
    DtoCreateCustomerRequest,
    DtoUpdateCustomerRequest,
    DtoCustomerResponse,
    DtoListCustomersResponse,
    DtoCustomerUsageSummaryResponse,
    DtoCustomerEntitlementsResponse,
    DtoLoginRequest,
    DtoSignUpRequest,
    DtoAuthResponse,
    DtoCreatePlanRequest,
    DtoUpdatePlanRequest,
    DtoPlanResponse,
    DtoListPlansResponse,
    DtoCreateFeatureRequest,
    DtoUpdateFeatureRequest,
    DtoFeatureResponse,
    DtoListFeaturesResponse,
    DtoCreateInvoiceRequest,
    DtoUpdateInvoiceRequest,
    DtoInvoiceResponse,
    DtoListInvoicesResponse,
    DtoCreateSubscriptionRequest,
    DtoSubscriptionResponse,
    DtoListSubscriptionsResponse
} from '@flexprice/sdk';
