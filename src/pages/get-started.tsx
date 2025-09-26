import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Star,
    CheckCircle,
    Code,
    Database,
    BarChart3,
    FileText,
    Zap,
    ArrowRight,
    Copy,
    Check,
    Sparkles,
    Globe,
    Github,
    Terminal,
    Settings,
    TrendingUp,
    DollarSign,
    Receipt,
    UserCheck,
    Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom style with Fira Code font
const customCodeStyle = {
    ...vscDarkPlus,
    'code[class*="language-"]': {
        ...vscDarkPlus['code[class*="language-"]'],
        fontFamily: '"Fira Code", "JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace !important',
        fontVariantLigatures: 'common-ligatures !important',
    },
    'pre[class*="language-"]': {
        ...vscDarkPlus['pre[class*="language-"]'],
        fontFamily: '"Fira Code", "JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace !important',
        fontVariantLigatures: 'common-ligatures !important',
    },
    'span[class*="token"]': {
        fontFamily: '"Fira Code", "JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace !important',
        fontVariantLigatures: 'common-ligatures !important',
    },
};

const GetStartedPage: React.FC = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const codeBlocks = {
        install: `npm install @flexprice/sdk`,
        config: `import { Configuration } from '@flexprice/sdk';
import { FlexPrice } from './FlexPrice';

// Get configuration from environment variables
const API_KEY = import.meta.env.VITE_FLEXPRICE_API_KEY || "your_api_key_here";
const BASE_PATH = import.meta.env.VITE_FLEXPRICE_BASE_URL || "https://api.cloud.flexprice.io/v1";
const ENVIRONMENT_ID = import.meta.env.VITE_FLEXPRICE_ENVIRONMENT_ID || "your_environment_id_here";

export const flexpriceConfig = new Configuration({
    basePath: BASE_PATH,
    apiKey: API_KEY,
    headers: {
        'X-Environment-ID': ENVIRONMENT_ID
    }
});

export const flexprice = new FlexPrice(flexpriceConfig);

export { FlexPrice };`,
        usage: `// Fire a usage event
await flexprice.fireEvent({
  eventName: 'llm_usage',
  externalCustomerId: 'user_123',
  properties: {
    tokens: 150,
    model: 'gpt-4',
    cost: 0.03
  }
});

// Get usage analytics
const usage = await flexprice.getUsage({
  externalCustomerId: 'user_123',
  startTime: '2024-01-01',
  endTime: '2024-01-31'
});

// Use with different APIs
const customerAPI = new CustomerAPI(flexpriceConfig);
const billingAPI = new BillingAPI(flexpriceConfig);`,
        env: `# .env
VITE_FLEXPRICE_API_KEY=your_api_key_here
VITE_FLEXPRICE_ENVIRONMENT_ID=your_environment_id_here
VITE_FLEXPRICE_BASE_URL=https://api.cloud.flexprice.io/v1`
    };

    const features = [
        {
            icon: Code,
            title: 'FlexPrice SDK',
            description: 'Integrate usage tracking with our powerful JavaScript SDK',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            steps: [
                'Install the SDK with npm',
                'Create a main config object',
                'Pass config to all FlexPrice APIs',
                'Fire events and query analytics'
            ]
        },
        {
            icon: Database,
            title: 'FlexPrice API',
            description: 'Direct API integration for custom implementations',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-50 to-pink-50',
            steps: [
                'Use RESTful endpoints for all operations',
                'Webhook support for real-time updates',
                'Comprehensive authentication',
                'Rate limiting and error handling'
            ]
        },
        {
            icon: BarChart3,
            title: 'FlexPrice Dashboard',
            description: 'Visualize and manage your usage data',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
            steps: [
                'Real-time usage monitoring',
                'Interactive charts and graphs',
                'Customer usage breakdowns',
                'Export data for analysis'
            ]
        },
        {
            icon: TrendingUp,
            title: 'FlexPrice Analytics',
            description: 'Advanced analytics and insights',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-50 to-red-50',
            steps: [
                'Usage trends and patterns',
                'Customer behavior analysis',
                'Cost optimization recommendations',
                'Custom reporting and alerts'
            ]
        },
        {
            icon: DollarSign,
            title: 'FlexPrice Billing',
            description: 'Automated billing and invoicing',
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'from-yellow-50 to-orange-50',
            steps: [
                'Usage-based pricing models',
                'Automatic invoice generation',
                'Payment processing integration',
                'Billing cycle management'
            ]
        },
        {
            icon: Receipt,
            title: 'FlexPrice Invoicing',
            description: 'Professional invoice management',
            color: 'from-indigo-500 to-purple-500',
            bgColor: 'from-indigo-50 to-purple-50',
            steps: [
                'Customizable invoice templates',
                'Multi-currency support',
                'Tax calculation and compliance',
                'Automated invoice delivery'
            ]
        },
        {
            icon: UserCheck,
            title: 'FlexPrice Subscriptions',
            description: 'Subscription and plan management',
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'from-teal-50 to-cyan-50',
            steps: [
                'Flexible subscription models',
                'Plan upgrades and downgrades',
                'Proration handling',
                'Subscription analytics'
            ]
        },
        {
            icon: Lock,
            title: 'FlexPrice Entitlements',
            description: 'Feature access and permission control',
            color: 'from-gray-500 to-slate-500',
            bgColor: 'from-gray-50 to-slate-50',
            steps: [
                'Role-based access control',
                'Feature flag management',
                'Usage limits and quotas',
                'Entitlement enforcement'
            ]
        }
    ];

    const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
        <div className="relative group">
            {/* Test font display */}
            <div className="font-fira-code">
                <SyntaxHighlighter
                    language={language}
                    style={customCodeStyle}
                    className="!rounded-xl !p-6 !text-sm !leading-relaxed !font-fira-code"
                    customStyle={{
                        background: '#0d1117',
                        borderRadius: '12px',
                        padding: '24px',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        fontFamily: '"Fira Code", "JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace !important',
                        fontVariantLigatures: 'common-ligatures !important'
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 h-8 w-8 p-0 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
                onClick={() => copyToClipboard(code, id)}
            >
                {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
                                <Sparkles className="h-4 w-4" />
                                Get Started with FlexPrice
                            </div>
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
                                Welcome to FlexPrice SDK
                            </h1>
                            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
                                The complete solution for usage-based billing, analytics, and subscription management.
                                Get up and running in minutes with our powerful SDK and intuitive dashboard.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Globe className="h-5 w-5 mr-2" />
                                Visit Dashboard
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Github className="h-5 w-5 mr-2" />
                                Star on GitHub
                                <Star className="h-4 w-4 ml-2" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Quick Setup Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-20"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm">
                            <CardHeader className="text-center pb-6">
                                <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3 mb-4">
                                    <Zap className="h-8 w-8 text-blue-600" />
                                    Quick Setup
                                </CardTitle>
                                <p className="text-slate-600 text-lg">
                                    Get started in 3 simple steps
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Step 1: Install */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="bg-white rounded-2xl p-8 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                                <Terminal className="h-6 w-6 text-blue-600" />
                                                Install the SDK
                                            </h3>
                                            <p className="text-slate-600 text-lg mb-4">
                                                Add FlexPrice SDK to your project dependencies
                                            </p>
                                            <CodeBlock code={codeBlocks.install} language="bash" id="install" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Step 2: Configure */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="bg-white rounded-2xl p-8 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                                <Settings className="h-6 w-6 text-purple-600" />
                                                Create your config object
                                            </h3>
                                            <p className="text-slate-600 text-lg mb-4">
                                                Create a main configuration object that you can pass to all FlexPrice APIs
                                            </p>
                                            <CodeBlock code={codeBlocks.config} language="javascript" id="config" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Step 3: Environment Variables */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                    className="bg-white rounded-2xl p-8 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                                <FileText className="h-6 w-6 text-green-600" />
                                                Set up environment variables
                                            </h3>
                                            <p className="text-slate-600 text-lg mb-4">
                                                Create a <code className="bg-slate-100 px-3 py-1 rounded-lg text-sm font-mono">.env</code> file in your project root with your API credentials:
                                            </p>
                                            <CodeBlock code={codeBlocks.env} language="bash" id="env" />
                                        </div>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mb-20"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
                                Complete FlexPrice Ecosystem
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Everything you need for usage-based billing, analytics, and subscription management
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 group">
                                        <CardHeader className="pb-4">
                                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                                            </div>
                                            <CardTitle className="text-xl font-bold text-slate-900 mb-3">
                                                {feature.title}
                                            </CardTitle>
                                            <p className="text-slate-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {feature.steps.map((step, stepIndex) => (
                                                    <li key={stepIndex} className="flex items-start gap-3 text-sm text-slate-600">
                                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="leading-relaxed">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Usage Example */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="mb-20"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
                            <CardHeader className="text-center pb-6">
                                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
                                    <Code className="h-8 w-8 text-blue-400" />
                                    Usage Example
                                </CardTitle>
                                <p className="text-blue-100 text-lg">
                                    Here's how to use FlexPrice in your application
                                </p>
                            </CardHeader>
                            <CardContent>
                                <CodeBlock code={codeBlocks.usage} language="javascript" id="usage" />
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="text-center"
                    >
                        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl overflow-hidden">
                            <CardContent className="py-16 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
                                <div className="relative z-10">
                                    <h2 className="text-4xl font-bold mb-6">
                                        Ready to get started?
                                    </h2>
                                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                                        Join thousands of developers who trust FlexPrice for their usage-based billing needs
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <Globe className="h-6 w-6 mr-3" />
                                            Get Your API Key
                                            <ArrowRight className="h-5 w-5 ml-3" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <Github className="h-6 w-6 mr-3" />
                                            Star on GitHub
                                            <Star className="h-5 w-5 ml-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GetStartedPage;