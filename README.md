<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/flexprice/flexprice/main/assets/flexprice_logo.png" height="30%" width="30%" alt="flexprice logo"/>
</p>

<h3 align="center">
<b>
⚡️ FlexPrice SDK Example - Get Started in Minutes ⚡️
</b>
</h3>

<p align="center">
A complete example application demonstrating FlexPrice SDK integration with usage-based billing, analytics, and modern React architecture. Get up and running with FlexPrice in under 5 minutes.
</p>

<h5 align="center">

[Documentation](https://docs.flexprice.io) • [Demo](https://www.loom.com/share/60d8308781254fe0bc5be341501f9fd5) • [Website](https://flexprice.io/) • [GitHub](https://github.com/flexprice/flexprice)

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.npmjs.com/package/@flexprice/sdk) [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</h5>

---

## 🚀 Quick Start (2 Minutes)

### Prerequisites

- Node.js 16+ and npm/yarn
- FlexPrice API Key (get one [here](https://admin.flexprice.io/))

### One-Command Setup

```bash
# Clone and install
git clone https://github.com/flexprice/react-example
cd react-example
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API key

# Start development server
npm run dev
```

Visit `http://localhost:5173` and you're ready to go! 🎉

---

## 🎯 What This Example Includes

This example demonstrates a complete FlexPrice integration with:

### ✨ Core Features

- **SDK Integration** - Complete FlexPrice SDK setup and configuration
- **Usage Analytics** - Real-time usage tracking and visualization
- **Event Firing** - Send usage events from your application
- **Modern UI** - Beautiful, responsive interface with syntax highlighting
- **Environment Setup** - Proper configuration with environment variables

### 🛠 Technical Stack

- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for modern styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **React Query** for data fetching
- **Syntax Highlighter** with Fira Code font

---

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── atoms/          # Basic UI elements (Button, Input, Card)
│   ├── molecules/      # Composite components (Sidebar, BreadCrumbs)
│   └── ui/             # Reusable UI components
├── pages/              # Route components
│   ├── get-started.tsx # Main landing page with tutorials
│   ├── usage.tsx       # Usage analytics dashboard
│   └── analytics.tsx   # Event analytics
├── core/               # Core business logic
│   ├── flexprice/      # FlexPrice SDK configuration
│   └── Routes/         # Application routing
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
└── lib/                # Utility functions
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# FlexPrice Configuration
VITE_FLEXPRICE_API_KEY=your_api_key_here
VITE_FLEXPRICE_BASE_URL=https://api.cloud.flexprice.io/v1
VITE_FLEXPRICE_ENVIRONMENT_ID=your_environment_id_here
```

### SDK Setup

The FlexPrice SDK is pre-configured in `src/core/flexprice/config.ts`:

```typescript
import {
  Configuration,
  FlexPrice,
  CustomerAPI,
  BillingAPI,
} from "@flexprice/sdk";

const flexpriceConfig = new Configuration({
  basePath: import.meta.env.VITE_FLEXPRICE_BASE_URL,
  apiKey: import.meta.env.VITE_FLEXPRICE_API_KEY,
  headers: {
    "X-Environment-ID": import.meta.env.VITE_FLEXPRICE_ENVIRONMENT_ID,
  },
});

export const flexprice = new FlexPrice(flexpriceConfig);
export const customerAPI = new CustomerAPI(flexpriceConfig);
export const billingAPI = new BillingAPI(flexpriceConfig);
```

---

## 🎮 Usage Examples

### 1. Fire Usage Events

```javascript
// Fire a usage event
await flexprice.fireEvent({
  eventName: "llm_usage",
  externalCustomerId: "user_123",
  properties: {
    tokens: 150,
    model: "gpt-4",
    cost: 0.03,
  },
});
```

### 2. Get Usage Analytics

```javascript
// Get usage analytics
const usage = await flexprice.getUsage({
  externalCustomerId: "user_123",
  startTime: "2024-01-01",
  endTime: "2024-01-31",
});
```

### 3. Use Different APIs

```javascript
// Customer management
const customers = await customerAPI.getCustomers();

// Billing operations
const invoices = await billingAPI.getInvoices();
```

---

## 🚀 Available Scripts

```bash
# Development
npm run dev           # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
```

---

## 🎨 Customization

### Adding New Features

1. **Create a new page:**

```bash
# Create new page component
touch src/pages/new-feature.tsx
```

2. **Add route:**

```typescript
// src/core/Routes/Router.tsx
import NewFeaturePage from '@/pages/new-feature';

// Add to routes array
{
  path: '/new-feature',
  element: <NewFeaturePage />
}
```

3. **Update navigation:**

```typescript
// src/components/molecules/Sidebar.tsx
const menuItems = [
  // ... existing items
  {
    title: "New Feature",
    url: "/new-feature",
    icon: NewIcon,
    description: "Feature description",
  },
];
```

### Styling Components

We use Tailwind CSS with custom configurations:

```tsx
// Example component with modern styling
const ModernButton = ({ children }) => (
  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    {children}
  </button>
);
```

---

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**

```bash
# Clear dependencies and cache
rm -rf node_modules
rm -rf .vite
npm install
```

2. **Environment Variables Not Loading**

```bash
# Ensure .env file is in root directory
ls -la .env

# Check variable names start with VITE_
cat .env
```

3. **API Connection Issues**

```bash
# Verify API key and environment ID
curl -H "Authorization: Bearer $VITE_FLEXPRICE_API_KEY" \
     -H "X-Environment-ID: $VITE_FLEXPRICE_ENVIRONMENT_ID" \
     $VITE_FLEXPRICE_BASE_URL/health
```

---

## 📚 Learn More

### FlexPrice Documentation

- [Getting Started](https://docs.flexprice.io) - Complete FlexPrice documentation
- [API Reference](https://docs.flexprice.io/api-reference) - Detailed API documentation
- [SDK Guide](https://docs.flexprice.io/sdk) - SDK usage examples
- [Pricing Models](https://docs.flexprice.io/pricing-models) - Different pricing strategies

### This Example

- [Component Guidelines](docs/component-guidelines.md) - Building UI components
- [State Management](docs/state-management.md) - Managing application state
- [API Integration](docs/api-integration.md) - Working with FlexPrice APIs

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:**

```bash
git checkout -b feat/amazing-feature
```

3. **Make your changes**
4. **Commit your changes:**

```bash
git commit -m 'Add amazing feature'
```

5. **Push to the branch:**

```bash
git push origin feat/amazing-feature
```

6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass

---

## 🆘 Need Help?

- **Documentation**: [docs.flexprice.io](https://docs.flexprice.io)
- **Support**: support@flexprice.io
- **GitHub Issues**: [Create an issue](https://github.com/flexprice/flexprice-examples/issues)
- **Community**: [Join our Discord](https://discord.gg/flexprice)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
Made with ❤️ by the <a href="https://flexprice.io">FlexPrice</a> Team
</p>

<p align="center">
<a href="https://flexprice.io">Website</a> • 
<a href="https://docs.flexprice.io">Docs</a> • 
<a href="https://github.com/flexprice/flexprice">Backend</a> • 
<a href="https://github.com/flexprice/flexprice-examples">Examples</a>
</p>
