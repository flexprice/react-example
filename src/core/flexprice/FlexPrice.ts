import { Configuration } from '@flexprice/sdk';
import {
    EventsApi,
    CustomersApi,
    AuthApi,
    PlansApi,
    FeaturesApi,
    InvoicesApi,
    SubscriptionsApi,
    AddonsApi,
    CouponsApi,
    CreditNotesApi,
    EntitlementsApi,
    TypesCancellationType,
    TypesPauseMode,
    TypesResumeMode
} from '@flexprice/sdk';

// Import types for better TypeScript support
import type {
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
    DtoListSubscriptionsResponse,
    CustomersGetOrderEnum,
    CustomersGetStatusEnum,
    PlansGetOrderEnum,
    PlansGetStatusEnum,
    FeaturesGetOrderEnum,
    FeaturesGetStatusEnum,
    InvoicesGetOrderEnum,
    InvoicesGetStatusEnum,
    SubscriptionsGetOrderEnum,
    SubscriptionsGetStatusEnum,
    DtoCancelSubscriptionRequest,
    DtoPauseSubscriptionRequest,
    DtoResumeSubscriptionRequest
} from '@flexprice/sdk';

/**
 * FlexPrice SDK Wrapper Class
 * 
 * This class provides a simplified interface to all FlexPrice APIs
 * with proper error handling, type safety, and consistent method signatures.
 */
export class FlexPrice {
    private config: Configuration;

    // API instances
    public events: EventsApi;
    public customers: CustomersApi;
    public auth: AuthApi;
    public plans: PlansApi;
    public features: FeaturesApi;
    public invoices: InvoicesApi;
    public subscriptions: SubscriptionsApi;
    public addons: AddonsApi;
    public coupons: CouponsApi;
    public creditNotes: CreditNotesApi;
    public entitlements: EntitlementsApi;

    constructor(config: Configuration) {
        this.config = config;

        // Initialize all API instances
        this.events = new EventsApi(config);
        this.customers = new CustomersApi(config);
        this.auth = new AuthApi(config);
        this.plans = new PlansApi(config);
        this.features = new FeaturesApi(config);
        this.invoices = new InvoicesApi(config);
        this.subscriptions = new SubscriptionsApi(config);
        this.addons = new AddonsApi(config);
        this.coupons = new CouponsApi(config);
        this.creditNotes = new CreditNotesApi(config);
        this.entitlements = new EntitlementsApi(config);
    }

    // ==================== EVENTS API ====================

    /**
     * Ingest a single event
     */
    async ingestEvent(event: DtoIngestEventRequest): Promise<void> {
        try {
            await this.events.eventsPost({ event });
        } catch (error) {
            console.error('Failed to ingest event:', error);
            throw error;
        }
    }

    /**
     * Ingest multiple events in bulk
     */
    async ingestBulkEvents(events: DtoBulkIngestEventRequest): Promise<void> {
        try {
            await this.events.eventsBulkPost({ event: events });
        } catch (error) {
            console.error('Failed to ingest bulk events:', error);
            throw error;
        }
    }

    /**
     * Query events with filters
     */
    async queryEvents(request: DtoGetEventsRequest): Promise<DtoGetEventsResponse> {
        try {
            return await this.events.eventsQueryPost({ request });
        } catch (error) {
            console.error('Failed to query events:', error);
            throw error;
        }
    }

    /**
     * Get usage analytics
     */
    async getUsageAnalytics(request: DtoGetUsageAnalyticsRequest): Promise<DtoGetUsageAnalyticsResponse> {
        try {
            return await this.events.eventsAnalyticsPost({ request });
        } catch (error) {
            console.error('Failed to get usage analytics:', error);
            throw error;
        }
    }

    /**
     * Get usage data
     */
    async getUsage(request: DtoGetUsageRequest): Promise<DtoGetUsageResponse> {
        try {
            return await this.events.eventsUsagePost({ request });
        } catch (error) {
            console.error('Failed to get usage:', error);
            throw error;
        }
    }

    // ==================== CUSTOMERS API ====================

    /**
     * Create a new customer
     */
    async createCustomer(customer: DtoCreateCustomerRequest): Promise<DtoCustomerResponse> {
        try {
            return await this.customers.customersPost({ customer });
        } catch (error) {
            console.error('Failed to create customer:', error);
            throw error;
        }
    }

    /**
     * Get customer by ID
     */
    async getCustomer(id: string): Promise<DtoCustomerResponse> {
        try {
            return await this.customers.customersIdGet({ id });
        } catch (error) {
            console.error('Failed to get customer:', error);
            throw error;
        }
    }

    /**
     * Update customer
     */
    async updateCustomer(id: string, customer: DtoUpdateCustomerRequest): Promise<DtoCustomerResponse> {
        try {
            return await this.customers.customersIdPut({ id, customer });
        } catch (error) {
            console.error('Failed to update customer:', error);
            throw error;
        }
    }

    /**
     * Delete customer
     */
    async deleteCustomer(id: string): Promise<void> {
        try {
            await this.customers.customersIdDelete({ id });
        } catch (error) {
            console.error('Failed to delete customer:', error);
            throw error;
        }
    }

    /**
     * List customers with filters
     */
    async listCustomers(params?: {
        customerIds?: string[];
        email?: string;
        externalId?: string;
        externalIds?: string[];
        status?: CustomersGetStatusEnum;
        limit?: number;
        offset?: number;
        order?: CustomersGetOrderEnum;
        startTime?: string;
        endTime?: string;
        expand?: string;
    }): Promise<DtoListCustomersResponse> {
        try {
            return await this.customers.customersGet(params || {});
        } catch (error) {
            console.error('Failed to list customers:', error);
            throw error;
        }
    }

    /**
     * Get customer usage summary
     */
    async getCustomerUsage(id: string, params?: {
        featureIds?: string[];
        subscriptionIds?: string[];
    }): Promise<DtoCustomerUsageSummaryResponse> {
        try {
            return await this.customers.customersIdUsageGet({
                id,
                ...params
            });
        } catch (error) {
            console.error('Failed to get customer usage:', error);
            throw error;
        }
    }

    /**
     * Get customer entitlements
     */
    async getCustomerEntitlements(id: string, params?: {
        featureIds?: string[];
        subscriptionIds?: string[];
    }): Promise<DtoCustomerEntitlementsResponse> {
        try {
            return await this.customers.customersIdEntitlementsGet({
                id,
                ...params
            });
        } catch (error) {
            console.error('Failed to get customer entitlements:', error);
            throw error;
        }
    }

    // ==================== AUTH API ====================

    /**
     * Login user
     */
    async login(credentials: DtoLoginRequest): Promise<DtoAuthResponse> {
        try {
            return await this.auth.authLoginPost({ login: credentials });
        } catch (error) {
            console.error('Failed to login:', error);
            throw error;
        }
    }

    /**
     * Sign up new user
     */
    async signUp(userData: DtoSignUpRequest): Promise<DtoAuthResponse> {
        try {
            return await this.auth.authSignupPost({ signup: userData });
        } catch (error) {
            console.error('Failed to sign up:', error);
            throw error;
        }
    }

    // ==================== PLANS API ====================

    /**
     * Create a new plan
     */
    async createPlan(plan: DtoCreatePlanRequest): Promise<DtoPlanResponse> {
        try {
            return await this.plans.plansPost({ plan });
        } catch (error) {
            console.error('Failed to create plan:', error);
            throw error;
        }
    }

    /**
     * Get plan by ID
     */
    async getPlan(id: string): Promise<DtoPlanResponse> {
        try {
            return await this.plans.plansIdGet({ id });
        } catch (error) {
            console.error('Failed to get plan:', error);
            throw error;
        }
    }

    /**
     * Update plan
     */
    async updatePlan(id: string, plan: DtoUpdatePlanRequest): Promise<DtoPlanResponse> {
        try {
            return await this.plans.plansIdPut({ id, plan });
        } catch (error) {
            console.error('Failed to update plan:', error);
            throw error;
        }
    }

    /**
     * Delete plan
     */
    async deletePlan(id: string): Promise<void> {
        try {
            await this.plans.plansIdDelete({ id });
        } catch (error) {
            console.error('Failed to delete plan:', error);
            throw error;
        }
    }

    /**
     * List plans
     */
    async listPlans(params?: {
        limit?: number;
        offset?: number;
        status?: PlansGetStatusEnum;
        order?: PlansGetOrderEnum;
    }): Promise<DtoListPlansResponse> {
        try {
            return await this.plans.plansGet(params || {});
        } catch (error) {
            console.error('Failed to list plans:', error);
            throw error;
        }
    }

    // ==================== FEATURES API ====================

    /**
     * Create a new feature
     */
    async createFeature(feature: DtoCreateFeatureRequest): Promise<DtoFeatureResponse> {
        try {
            return await this.features.featuresPost({ feature });
        } catch (error) {
            console.error('Failed to create feature:', error);
            throw error;
        }
    }

    /**
     * Get feature by ID
     */
    async getFeature(id: string): Promise<DtoFeatureResponse> {
        try {
            return await this.features.featuresIdGet({ id });
        } catch (error) {
            console.error('Failed to get feature:', error);
            throw error;
        }
    }

    /**
     * Update feature
     */
    async updateFeature(id: string, feature: DtoUpdateFeatureRequest): Promise<DtoFeatureResponse> {
        try {
            return await this.features.featuresIdPut({ id, feature });
        } catch (error) {
            console.error('Failed to update feature:', error);
            throw error;
        }
    }

    /**
     * Delete feature
     */
    async deleteFeature(id: string): Promise<void> {
        try {
            await this.features.featuresIdDelete({ id });
        } catch (error) {
            console.error('Failed to delete feature:', error);
            throw error;
        }
    }

    /**
     * List features
     */
    async listFeatures(params?: {
        limit?: number;
        offset?: number;
        status?: FeaturesGetStatusEnum;
        order?: FeaturesGetOrderEnum;
    }): Promise<DtoListFeaturesResponse> {
        try {
            return await this.features.featuresGet(params || {});
        } catch (error) {
            console.error('Failed to list features:', error);
            throw error;
        }
    }

    // ==================== INVOICES API ====================

    /**
     * Create a new invoice
     */
    async createInvoice(invoice: DtoCreateInvoiceRequest): Promise<DtoInvoiceResponse> {
        try {
            return await this.invoices.invoicesPost({ invoice });
        } catch (error) {
            console.error('Failed to create invoice:', error);
            throw error;
        }
    }

    /**
     * Get invoice by ID
     */
    async getInvoice(id: string): Promise<DtoInvoiceResponse> {
        try {
            return await this.invoices.invoicesIdGet({ id });
        } catch (error) {
            console.error('Failed to get invoice:', error);
            throw error;
        }
    }

    /**
     * Update invoice
     */
    async updateInvoice(id: string, invoice: DtoUpdateInvoiceRequest): Promise<DtoInvoiceResponse> {
        try {
            return await this.invoices.invoicesIdPut({ id, request: invoice });
        } catch (error) {
            console.error('Failed to update invoice:', error);
            throw error;
        }
    }

    /**
     * Delete invoice
     */
    async deleteInvoice(_id: string): Promise<void> {
        try {
            // Note: Delete method may not be available in the API
            throw new Error('Delete invoice method not available in current API version');
        } catch (error) {
            console.error('Failed to delete invoice:', error);
            throw error;
        }
    }

    /**
     * List invoices
     */
    async listInvoices(params?: {
        limit?: number;
        offset?: number;
        status?: InvoicesGetStatusEnum;
        order?: InvoicesGetOrderEnum;
        customerId?: string;
    }): Promise<DtoListInvoicesResponse> {
        try {
            return await this.invoices.invoicesGet(params || {});
        } catch (error) {
            console.error('Failed to list invoices:', error);
            throw error;
        }
    }

    // ==================== SUBSCRIPTIONS API ====================

    /**
     * Create a new subscription
     */
    async createSubscription(subscription: DtoCreateSubscriptionRequest): Promise<DtoSubscriptionResponse> {
        try {
            return await this.subscriptions.subscriptionsPost({ subscription });
        } catch (error) {
            console.error('Failed to create subscription:', error);
            throw error;
        }
    }

    /**
     * Get subscription by ID
     */
    async getSubscription(id: string): Promise<DtoSubscriptionResponse> {
        try {
            return await this.subscriptions.subscriptionsIdGet({ id });
        } catch (error) {
            console.error('Failed to get subscription:', error);
            throw error;
        }
    }

    /**
     * Cancel subscription
     */
    async cancelSubscription(id: string, reason?: string): Promise<void> {
        try {
            const request: DtoCancelSubscriptionRequest = {
                reason: reason || 'User requested cancellation',
                cancellationType: TypesCancellationType.CancellationTypeImmediate
            };
            await this.subscriptions.subscriptionsIdCancelPost({ id, request });
        } catch (error) {
            console.error('Failed to cancel subscription:', error);
            throw error;
        }
    }

    /**
     * Pause subscription
     */
    async pauseSubscription(id: string, reason?: string): Promise<void> {
        try {
            const request: DtoPauseSubscriptionRequest = {
                reason: reason || 'User requested pause',
                pauseMode: TypesPauseMode.PauseModeImmediate
            };
            await this.subscriptions.subscriptionsIdPausePost({ id, request });
        } catch (error) {
            console.error('Failed to pause subscription:', error);
            throw error;
        }
    }

    /**
     * Resume subscription
     */
    async resumeSubscription(id: string): Promise<void> {
        try {
            const request: DtoResumeSubscriptionRequest = {
                resumeMode: TypesResumeMode.ResumeModeImmediate
            };
            await this.subscriptions.subscriptionsIdResumePost({ id, request });
        } catch (error) {
            console.error('Failed to resume subscription:', error);
            throw error;
        }
    }

    /**
     * List subscriptions
     */
    async listSubscriptions(params?: {
        limit?: number;
        offset?: number;
        status?: SubscriptionsGetStatusEnum;
        order?: SubscriptionsGetOrderEnum;
        customerId?: string;
    }): Promise<DtoListSubscriptionsResponse> {
        try {
            return await this.subscriptions.subscriptionsGet(params || {});
        } catch (error) {
            console.error('Failed to list subscriptions:', error);
            throw error;
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Update the API configuration
     */
    updateConfig(newConfig: Configuration): void {
        this.config = newConfig;
        // Re-initialize all APIs with new config
        this.events = new EventsApi(newConfig);
        this.customers = new CustomersApi(newConfig);
        this.auth = new AuthApi(newConfig);
        this.plans = new PlansApi(newConfig);
        this.features = new FeaturesApi(newConfig);
        this.invoices = new InvoicesApi(newConfig);
        this.subscriptions = new SubscriptionsApi(newConfig);
        this.addons = new AddonsApi(newConfig);
        this.coupons = new CouponsApi(newConfig);
        this.creditNotes = new CreditNotesApi(newConfig);
        this.entitlements = new EntitlementsApi(newConfig);
    }

    /**
     * Get current configuration
     */
    getConfig(): Configuration {
        return this.config;
    }

    /**
     * Check if the SDK is properly configured
     */
    isConfigured(): boolean {
        return !!(this.config.basePath && this.config.apiKey);
    }
}
