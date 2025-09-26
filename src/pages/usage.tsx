import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { BarChart3, TrendingUp, Clock, Zap, Download, RefreshCw, Calendar, Users, Activity } from 'lucide-react';

const UsagePage: React.FC = () => {
    const [timeRange, setTimeRange] = useState('7d');

    const usageStats = [
        {
            title: 'API Calls',
            value: '45.2K',
            change: '+8%',
            icon: BarChart3,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            trend: 'up',
        },
        {
            title: 'Data Transfer',
            value: '2.1GB',
            change: '+12%',
            icon: Activity,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            trend: 'up',
        },
        {
            title: 'Response Time',
            value: '245ms',
            change: '-15ms',
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            trend: 'down',
        },
        {
            title: 'Uptime',
            value: '99.9%',
            change: '+0.1%',
            icon: Zap,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            trend: 'up',
        },
    ];

    const endpointUsage = [
        { endpoint: '/api/users', calls: 15200, percentage: 35, color: 'bg-blue-500' },
        { endpoint: '/api/events', calls: 12800, percentage: 28, color: 'bg-green-500' },
        { endpoint: '/api/analytics', calls: 8900, percentage: 20, color: 'bg-purple-500' },
        { endpoint: '/api/billing', calls: 5600, percentage: 12, color: 'bg-orange-500' },
        { endpoint: '/api/auth', calls: 2700, percentage: 5, color: 'bg-red-500' },
    ];

    const topUsers = [
        { user: 'john.doe@company.com', calls: 2100, percentage: 4.6, status: 'active' },
        { user: 'admin@company.com', calls: 1800, percentage: 4.0, status: 'active' },
        { user: 'test@demo.com', calls: 1200, percentage: 2.7, status: 'inactive' },
        { user: 'api@service.com', calls: 950, percentage: 2.1, status: 'active' },
        { user: 'billing@client.com', calls: 780, percentage: 1.7, status: 'active' },
    ];

    const timeRanges = [
        { value: '24h', label: '24 Hours' },
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Usage Analytics</h1>
                                <p className="text-slate-600 mt-2">Monitor your application usage and performance metrics</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
                                <div className="flex gap-2">
                                    {timeRanges.map((range) => (
                                        <button
                                            key={range.value}
                                            onClick={() => setTimeRange(range.value)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${timeRange === range.value
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        Refresh
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {usageStats.map((stat, index) => (
                            <Card key={index} className={`p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm ${stat.borderColor} border-l-4`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                        <div className="flex items-center space-x-1">
                                            <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                                            <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                {stat.change}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Charts and Data Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Usage Chart Placeholder */}
                        <div className="lg:col-span-2">
                            <Card className="p-6 border-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Usage Over Time</h2>
                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>Last 7 days</span>
                                    </div>
                                </div>
                                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                        <p className="text-slate-600">Chart visualization would go here</p>
                                        <p className="text-sm text-slate-500">Integration with charting library needed</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Real-time Activity */}
                        <div>
                            <Card className="p-6 border-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Real-time Activity</h2>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-slate-600">Live</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">API call processed</p>
                                            <p className="text-xs text-slate-500">2 seconds ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">Data export completed</p>
                                            <p className="text-xs text-slate-500">5 seconds ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">Rate limit warning</p>
                                            <p className="text-xs text-slate-500">12 seconds ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Data Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Usage by Endpoint */}
                        <Card className="p-6 border-0 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Usage by Endpoint</h2>
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {endpointUsage.map((endpoint, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-900">{endpoint.endpoint}</span>
                                            <span className="text-sm text-slate-600">{endpoint.calls.toLocaleString()} calls</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${endpoint.color}`}
                                                style={{ width: `${endpoint.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-slate-500">{endpoint.percentage}% of total</div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Top Users */}
                        <Card className="p-6 border-0 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Top Users</h2>
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {topUsers.map((user, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                                <Users className="h-4 w-4 text-slate-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{user.user}</p>
                                            <p className="text-sm text-slate-600">{user.calls.toLocaleString()} calls</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-slate-500">{user.percentage}%</span>
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
                                                }`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsagePage;
