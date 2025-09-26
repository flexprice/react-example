import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button } from '@/components/ui';
import { BarChart3, TrendingUp, Clock, Zap, Download, RefreshCw, Calendar, Users, Activity } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { flexprice } from '@/core/flexprice';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DtoEvent, TypesWindowSize, DtoGetUsageAnalyticsRequest, DtoUsageAnalyticItem } from '@flexprice/sdk';

const UsagePage: React.FC = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const [analyticsData, setAnalyticsData] = useState<DtoUsageAnalyticItem[]>([]);
    const [events, setEvents] = useState<DtoEvent[]>([]);
    const [customerSummary, setCustomerSummary] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('USD');

    // Fetch analytics data
    const { mutate: fetchAnalyticsData, isPending: isLoadingAnalytics } = useMutation({
        mutationFn: async () => {
            const endTime = new Date();
            const startTime = new Date();

            // Calculate time range
            switch (timeRange) {
                case '24h':
                    startTime.setDate(startTime.getDate() - 1);
                    break;
                case '7d':
                    startTime.setDate(startTime.getDate() - 7);
                    break;
                case '30d':
                    startTime.setDate(startTime.getDate() - 30);
                    break;
                case '90d':
                    startTime.setDate(startTime.getDate() - 90);
                    break;
            }

            const request: DtoGetUsageAnalyticsRequest = {
                externalCustomerId: "demo_user_123",
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                windowSize: timeRange === '24h' ? TypesWindowSize.WindowSizeMinute : TypesWindowSize.WindowSizeDay,
                groupBy: ['eventName', 'source'],
                propertyFilters: {},
                sources: ['api']
            };

            const response = await flexprice.getUsageAnalytics(request);
            return response;
        },
        onSuccess: (data) => {
            setAnalyticsData(data.items || []);
            setTotalCost(data.totalCost || 0);
            setCurrency(data.currency || 'USD');
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fetch analytics data');
        }
    });

    // Fetch events
    const { mutate: fetchEvents } = useMutation({
        mutationFn: async () => {
            const endTime = new Date();
            const startTime = new Date();
            startTime.setDate(startTime.getDate() - 7);

            const response = await flexprice.queryEvents({
                externalCustomerId: "demo_user_123",
                pageSize: 100,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString()
            });

            return response.events || [];
        },
        onSuccess: (data) => {
            setEvents(data);
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fetch events');
        }
    });

    // Fetch customer summary
    const { mutate: fetchCustomerSummary } = useMutation({
        mutationFn: async () => {
            const response = await flexprice.getCustomerUsage("demo_user_123");
            return response;
        },
        onSuccess: (data) => {
            setCustomerSummary(data);
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fetch customer summary');
        }
    });

    // Load all data
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            new Promise(resolve => fetchAnalyticsData(undefined, { onSettled: resolve })),
            new Promise(resolve => fetchEvents(undefined, { onSettled: resolve })),
            new Promise(resolve => fetchCustomerSummary(undefined, { onSettled: resolve }))
        ]).finally(() => setIsLoading(false));
    }, [timeRange]);

    // Calculate stats from analytics data
    const usageStats = useMemo(() => {
        const totalUsage = analyticsData.reduce((sum, item) => sum + (item.totalUsage || 0), 0);
        const totalEvents = analyticsData.reduce((sum, item) => sum + (item.eventCount || 0), 0);
        const avgResponseTime = 245; // Mock data since not available in API
        const uptime = 99.9; // Mock data since not available in API

        return [
            {
                title: 'Total Usage',
                value: totalUsage.toLocaleString(),
                change: '+8%',
                icon: BarChart3,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                trend: 'up',
            },
            {
                title: 'Total Events',
                value: totalEvents.toLocaleString(),
                change: '+12%',
                icon: Activity,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                trend: 'up',
            },
            {
                title: 'Total Cost',
                value: `${currency} ${totalCost.toFixed(2)}`,
                change: '+5%',
                icon: Clock,
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200',
                trend: 'up',
            },
            {
                title: 'Uptime',
                value: `${uptime}%`,
                change: '+0.1%',
                icon: Zap,
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                trend: 'up',
            },
        ];
    }, [analyticsData, events, totalCost, currency]);

    // Format analytics data for charts
    const formattedUsageData = useMemo(() => {
        if (analyticsData.length === 0) return [];

        // Get the first analytics item's time series points
        const firstItem = analyticsData[0];
        if (!firstItem.points || firstItem.points.length === 0) return [];

        return firstItem.points.map((point) => ({
            date: new Date(point.timestamp || '').toLocaleDateString(),
            value: point.usage || 0,
            cost: point.cost || 0,
            eventCount: point.eventCount || 0
        }));
    }, [analyticsData]);

    // Event distribution for pie chart from analytics data
    const eventDistribution = useMemo(() => {
        return analyticsData.map((item) => ({
            name: item.eventName || 'Unknown',
            count: item.eventCount || 0,
            cost: item.totalCost || 0,
            usage: item.totalUsage || 0
        }));
    }, [analyticsData]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            setIsLoading(true);
                                            Promise.all([
                                                new Promise(resolve => fetchAnalyticsData(undefined, { onSettled: resolve })),
                                                new Promise(resolve => fetchEvents(undefined, { onSettled: resolve })),
                                                new Promise(resolve => fetchCustomerSummary(undefined, { onSettled: resolve }))
                                            ]).finally(() => setIsLoading(false));
                                        }}
                                    >
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
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index} className="p-6 border-0 shadow-sm">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            usageStats.map((stat, index) => (
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
                            ))
                        )}
                    </div>

                    {/* Charts and Data Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Usage Chart */}
                        <div className="lg:col-span-2">
                            <Card className="p-6 border-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Usage Over Time</h2>
                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>Last {timeRange === '24h' ? '24 hours' : timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}</span>
                                    </div>
                                </div>
                                <div className="h-80">
                                    {isLoading ? (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="animate-pulse bg-slate-200 rounded-lg h-64 w-full"></div>
                                        </div>
                                    ) : formattedUsageData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={formattedUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis
                                                    dataKey="date"
                                                    tick={{ fontSize: 11 }}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={60}
                                                />
                                                <YAxis tick={{ fontSize: 11 }} width={40} />
                                                <RechartsTooltip
                                                    formatter={(value, name) => [
                                                        name === 'value' ? `${value} units` : `${currency} ${value}`,
                                                        name === 'value' ? 'Usage' : 'Cost'
                                                    ]}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="cost"
                                                    stroke="#10b981"
                                                    strokeWidth={2}
                                                    dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                                                    activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                                <p className="text-slate-600">No usage data available</p>
                                                <p className="text-sm text-slate-500">Fire some events to see usage analytics</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Event Distribution */}
                        <div>
                            <Card className="p-6 border-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Event Distribution</h2>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-slate-600">Live</span>
                                    </div>
                                </div>
                                <div className="h-64">
                                    {isLoading ? (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="animate-pulse bg-slate-200 rounded-full h-48 w-48"></div>
                                        </div>
                                    ) : eventDistribution.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={eventDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="count"
                                                >
                                                    {eventDistribution.map((_entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip
                                                    formatter={(value, name, props) => [
                                                        `${value} events (${currency} ${props.payload.cost?.toFixed(2) || 0})`,
                                                        'Event Count'
                                                    ]}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                                <p className="text-slate-600">No events available</p>
                                                <p className="text-sm text-slate-500">Fire some events to see distribution</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Data Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Events */}
                        <Card className="p-6 border-0 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Recent Events</h2>
                                <Button variant="outline" size="sm" onClick={() => fetchEvents()}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index} className="animate-pulse">
                                            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                        </div>
                                    ))
                                ) : events.length > 0 ? (
                                    events.slice(0, 5).map((event, index) => (
                                        <div key={event.id || index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-900">{event.eventName}</span>
                                                <span className="text-sm text-slate-600">
                                                    {event.properties?.value || 'N/A'} units
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-slate-500">
                                                    {event.externalCustomerId}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(event.timestamp || '').toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                        <p className="text-slate-500">No events found</p>
                                        <p className="text-sm text-slate-400">Fire some events to see them here</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Customer Summary */}
                        <Card className="p-6 border-0 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Customer Summary</h2>
                                <Button variant="outline" size="sm" onClick={() => fetchCustomerSummary()}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="animate-pulse">
                                        <div className="h-20 bg-slate-200 rounded-lg"></div>
                                    </div>
                                ) : customerSummary ? (
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">demo_user_123</h3>
                                                <p className="text-sm text-gray-600">External Customer ID</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-gray-900">
                                                    {analyticsData.reduce((sum, item) => sum + (item.totalUsage || 0), 0)}
                                                </div>
                                                <div className="text-sm text-gray-600">Total Usage</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Activity className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-600">Event Count</span>
                                                    <p className="font-semibold text-gray-900">
                                                        {analyticsData.reduce((sum, item) => sum + (item.eventCount || 0), 0)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-600">Total Cost</span>
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        {currency} {totalCost.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                        <p className="text-slate-500">No customer data</p>
                                        <p className="text-sm text-slate-400">Customer summaries will appear here</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsagePage;
