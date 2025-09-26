# FlexPrice SDK Example

This is an example repository demonstrating how to use the FlexPrice SDK for usage-based billing, analytics, and subscription management.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your FlexPrice credentials:
   - Get your API key from [FlexPrice Dashboard](https://dashboard.flexprice.io)
   - Get your Environment ID from [FlexPrice Dashboard](https://dashboard.flexprice.io)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` and click on "Get Started" to see the setup guide.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# FlexPrice SDK Configuration
VITE_FLEXPRICE_API_KEY=your_api_key_here
VITE_FLEXPRICE_ENVIRONMENT_ID=your_environment_id_here
VITE_FLEXPRICE_BASE_URL=https://api.cloud.flexprice.io/v1
```

## Features

- **Get Started Page**: Complete setup guide and tutorials
- **Usage Analytics**: Track and visualize usage data
- **Event Management**: Fire and monitor events
- **Real-time Dashboard**: Live usage monitoring
- **Environment Configuration**: Easy setup with environment variables

## FlexPrice Features Covered

- ✅ FlexPrice SDK integration
- ✅ FlexPrice API usage
- ✅ FlexPrice Dashboard
- ✅ FlexPrice Analytics
- ✅ FlexPrice Billing
- ✅ FlexPrice Invoicing
- ✅ FlexPrice Subscriptions
- ✅ FlexPrice Entitlements

## Learn More

- [FlexPrice Documentation](https://docs.flexprice.io)
- [FlexPrice Dashboard](https://dashboard.flexprice.io)
- [GitHub Repository](https://github.com/flexprice/flexprice-sdk)

## Support

For support, email support@flexprice.io or join our Discord community.
