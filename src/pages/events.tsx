import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { LLMUsageSimulator } from '@/components/molecules';
import { Calendar, Clock, Filter, Search, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const EventsPage: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const eventStats = [
        {
            title: 'Total Events',
            value: '1,234',
            change: '+12%',
            icon: Calendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        {
            title: 'Success Rate',
            value: '98.5%',
            change: '+2.1%',
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
        },
        {
            title: 'Failed Events',
            value: '12',
            change: '-5%',
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
        },
        {
            title: 'Avg Response Time',
            value: '245ms',
            change: '-15ms',
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
        },
    ];

    const recentEvents = [
        { id: 1, type: 'user_login', message: 'User authentication successful', timestamp: '2 minutes ago', status: 'success', user: 'john.doe@example.com' },
        { id: 2, type: 'data_export', message: 'CSV export completed', timestamp: '5 minutes ago', status: 'success', user: 'admin@company.com' },
        { id: 3, type: 'api_call', message: 'API rate limit exceeded', timestamp: '10 minutes ago', status: 'warning', user: 'api@service.com' },
        { id: 4, type: 'payment', message: 'Payment processing failed', timestamp: '15 minutes ago', status: 'error', user: 'billing@client.com' },
        { id: 5, type: 'subscription', message: 'New subscription created', timestamp: '1 hour ago', status: 'success', user: 'sales@company.com' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'warning':
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case 'error':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Events</h1>
                                <p className="text-slate-600 mt-2">Monitor and track your application events in real-time</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* LLM Usage Simulator */}
                    <div className="mb-8">
                        <LLMUsageSimulator />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {eventStats.map((stat, index) => (
                            <Card key={index} className={`p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm ${stat.borderColor} border-l-4`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                        <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Events Table */}
                    <Card className="border-0 shadow-sm">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-900">Recent Events</h2>
                                <div className="flex gap-2">
                                    {['all', 'success', 'warning', 'error'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilter(status)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === status
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {recentEvents
                                .filter(event => filter === 'all' || event.status === filter)
                                .map((event) => (
                                    <div key={event.id} className={`p-6 hover:bg-slate-50 transition-colors ${getStatusColor(event.status)}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {getStatusIcon(event.status)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-sm font-medium text-slate-900">{event.message}</p>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                        {event.type.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 mt-1">{event.user}</p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-sm text-slate-500">{event.timestamp}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="p-6 border-t border-slate-200">
                            <Button variant="outline" className="w-full">
                                Load More Events
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
