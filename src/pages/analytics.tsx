import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, BarChart3, Users, Activity, TrendingUp, Loader2, CheckCircle, Zap, Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { flexprice } from '@/core/flexprice';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DtoEvent, TypesAggregationType, TypesWindowSize } from '@flexprice/sdk';
import { motion, AnimatePresence } from 'framer-motion';


// Utility functions
const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
};

const formatDateShort = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
};

interface EventData {
    id: string;
    customerId: string;
    eventName: string;
    externalCustomerId: string;
    properties: Record<string, unknown>;
    timestamp: string;
    source?: string;
}

interface UsageData {
    windowSize: string;
    value: number;
}

interface CustomerSummary {
    customer_id: string;
    total_usage: number;
    event_count: number;
    last_activity: string;
}

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [usageData, setUsageData] = useState<UsageData[]>([]);
    const [customerSummary, setCustomerSummary] = useState<CustomerSummary[]>([]);
    const [paginationState, setPaginationState] = useState<{
        iterLastKey?: string;
        hasMore: boolean;
        pageSize: number;
    }>({ hasMore: false, pageSize: 10 });

    // Animation states
    const [isSending, setIsSending] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [sentCount, setSentCount] = useState(0);

    // Fire event mutation
    const { mutate: fireEvent } = useMutation({
        mutationFn: async () => {
            return await flexprice.fireLLMUsageEvent();
        },
        onSuccess: () => {
            toast.success('Event fired successfully!');
            fetchEvents({ resetPagination: true });
            fetchUsageData();
            fetchCustomerSummary();
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fire event');
        }
    });

    // Fetch events
    const { mutate: fetchEvents, isPending: isLoadingEvents } = useMutation({
        mutationFn: async (params?: { resetPagination?: boolean; startTime?: string }) => {
            const endTime = new Date();
            const startTime = params?.startTime ? new Date(params.startTime) : new Date();
            startTime.setDate(startTime.getDate() - 7);

            return await flexprice.queryEvents({
                externalCustomerId: "demo_user_123",
                pageSize: 10,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                iterLastKey: params?.resetPagination ? undefined : paginationState.iterLastKey
            });
        },
        onSuccess: (data) => {
            const newEvents = data.events?.map((event: DtoEvent) => ({
                id: event.id || '',
                customerId: event.customerId || '',
                eventName: event.eventName || '',
                externalCustomerId: event.externalCustomerId || '',
                properties: event.properties || {},
                timestamp: event.timestamp || ''
            })) || [];

            setEvents(prevEvents => {
                return paginationState.iterLastKey ? [...prevEvents, ...newEvents] : newEvents;
            });

            setPaginationState({
                iterLastKey: data.iterLastKey,
                hasMore: data.hasMore || false,
                pageSize: 10
            });
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fetch events');
        }
    });

    // Fetch usage data
    const { mutate: fetchUsageData, isPending: isLoadingUsage } = useMutation({
        mutationFn: async () => {
            const endTime = new Date();
            const startTime = new Date();
            startTime.setDate(startTime.getDate() - 7);

            console.log('Fetching usage data...', {
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                externalCustomerId: "demo_user_123"
            });

            const response = await flexprice.getUsage({
                aggregationType: TypesAggregationType.AggregationSum,
                eventName: 'llm_usage',
                externalCustomerId: "demo_user_123",
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                bucketSize: TypesWindowSize.WindowSizeDay,
            });

            console.log('Usage API response:', response);

            return {
                results: response.results?.map(item => ({
                    windowSize: item.windowSize || '',
                    value: item.value || 0
                })) || []
            };
        },
        onSuccess: (data: { results: UsageData[] }) => {
            console.log('Usage data success:', data);
            setUsageData(data.results);
        },
        onError: (error: { message?: string }) => {
            console.error('Usage data error:', error);
            toast.error(error?.message || 'Failed to fetch usage data');
        }
    });

    // Fetch customer summary
    const { mutate: fetchCustomerSummary, isPending: isLoadingSummary } = useMutation({
        mutationFn: async () => {
            const response = await flexprice.getCustomerUsage("demo_user_123");
            return {
                totalUsage: (response as { totalUsage?: number }).totalUsage || 0
            };
        },
        onSuccess: (data: { totalUsage: number }) => {
            // Transform the data to match our interface
            const summary: CustomerSummary = {
                customer_id: "demo_user_123",
                total_usage: data.totalUsage,
                event_count: events.length,
                last_activity: events[0]?.timestamp || new Date().toISOString()
            };
            setCustomerSummary([summary]);
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || 'Failed to fetch customer summary');
        }
    });

    // Load more events function
    const loadMoreEvents = useCallback(() => {
        if (paginationState.hasMore) {
            fetchEvents({});
        }
    }, [paginationState.hasMore, fetchEvents]);

    // Reset events function
    const resetEvents = useCallback(() => {
        setEvents([]);
        setPaginationState({ hasMore: false, pageSize: 10 });
        fetchEvents({ resetPagination: true });
    }, [fetchEvents]);

    // Load all data on component mount
    useEffect(() => {
        fetchEvents({ resetPagination: true });
        fetchUsageData();
        fetchCustomerSummary();
    }, [fetchEvents, fetchUsageData, fetchCustomerSummary]);

    const handleFireEvent = async () => {
        setIsSending(true);
        setIsCompleted(false);
        setSentCount(0);

        // Simulate sending 5 LLM usage events with animation
        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
            setSentCount(i);
        }

        // Fire the actual event
        fireEvent();

        setIsSending(false);
        setIsCompleted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setIsCompleted(false);
            setSentCount(0);
        }, 3000);
    };

    const handleRefresh = () => {
        resetEvents();
        fetchUsageData();
        fetchCustomerSummary();
    };

    // Format data for charts
    const formattedUsageData = useMemo(() => {
        console.log('Usage data for formatting:', usageData);

        if (usageData.length === 0) {
            // Show sample data when no real data is available
            const sampleData = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                sampleData.push({
                    date: formatDateShort(date.toISOString()),
                    value: Math.floor(Math.random() * 100) + 10
                });
            }
            console.log('Returning sample usage data:', sampleData);
            return sampleData;
        }

        const formatted = usageData.map((item) => ({
            date: formatDateShort(item.windowSize),
            value: item.value
        }));
        console.log('Returning formatted real usage data:', formatted);
        return formatted;
    }, [usageData]);

    const eventCountByType = useMemo(() => {
        console.log('Events for pie chart:', events);

        if (events.length === 0) {
            // Show sample data when no real events are available
            return [
                { name: 'llm_usage', count: 5 },
                { name: 'api_call', count: 3 },
                { name: 'data_processing', count: 2 }
            ];
        }

        const counts: Record<string, number> = {};
        events.forEach(event => {
            counts[event.eventName] = (counts[event.eventName] || 0) + 1;
        });
        return Object.entries(counts).map(([name, count]) => ({ name, count }));
    }, [events]);

    // const chartConfig = {
    //     value: { label: 'Usage', color: 'hsl(var(--chart-1))' },
    // } satisfies ChartConfig;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Dashboard</h1>
                    <p className="text-gray-600">Monitor and track your application events in real-time</p>
                </div>

                {/* LLM Usage Simulator Card */}
                <Card className="p-6 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-l-blue-500 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">LLM Usage Simulator</h3>
                            <p className="text-sm text-slate-600">Test your usage-based billing system</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {isSending ? (
                            <motion.div
                                key="sending"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="relative">
                                        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Activity className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-medium text-slate-900">Sending LLM Events</p>
                                        <p className="text-sm text-slate-600">{sentCount}/5 events processed</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Progress</span>
                                        <span>{Math.round((sentCount / 5) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <motion.div
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(sentCount / 5) * 100}%` }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white/50 rounded-lg p-3">
                                        <p className="text-2xl font-bold text-blue-600">{sentCount}</p>
                                        <p className="text-xs text-slate-600">Events Sent</p>
                                    </div>
                                    <div className="bg-white/50 rounded-lg p-3">
                                        <p className="text-2xl font-bold text-purple-600">{5 - sentCount}</p>
                                        <p className="text-xs text-slate-600">Remaining</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : isCompleted ? (
                            <motion.div
                                key="completed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center space-y-6"
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="p-4 bg-green-100 rounded-full">
                                        <CheckCircle className="h-12 w-12 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-slate-900">Events Sent Successfully!</p>
                                        <p className="text-slate-600">5 LLM usage events have been processed</p>
                                    </div>
                                </div>

                                <div className="bg-white/50 rounded-lg p-4">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">5</p>
                                            <p className="text-xs text-slate-600">Events</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">1.5s</p>
                                            <p className="text-xs text-slate-600">Duration</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-purple-600">100%</p>
                                            <p className="text-xs text-slate-600">Success</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleFireEvent}
                                    variant="outline"
                                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                                >
                                    <Send className="h-4 w-4 mr-2" /> Send Again
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="initial"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <p className="text-slate-600 mb-2">Simulate LLM usage events to test your billing system</p>
                                    <p className="text-sm text-slate-500">This will send 5 sample events with different usage patterns</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white/50 rounded-lg p-4">
                                        <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-900">5 Events</p>
                                        <p className="text-xs text-slate-600">Sample data</p>
                                    </div>
                                    <div className="bg-white/50 rounded-lg p-4">
                                        <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-slate-900">Real-time</p>
                                        <p className="text-xs text-slate-600">Live processing</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleFireEvent}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    <Send className="h-4 w-4 mr-2" /> Start Simulation
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>

                {/* Refresh Button */}
                <div className="flex justify-end mb-8">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        className="flex items-center gap-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm border-blue-200 border-l-4 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Total Events</p>
                                <p className="text-2xl font-bold text-slate-900">{events.length}</p>
                                <p className="text-sm font-medium text-blue-600">+{events.length} today</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm border-green-200 border-l-4 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Total Usage</p>
                                <p className="text-2xl font-bold text-slate-900">
                                    {customerSummary[0]?.total_usage || 0}
                                </p>
                                <p className="text-sm font-medium text-green-600">+{customerSummary[0]?.total_usage || 0} units</p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50">
                                <BarChart3 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm border-purple-200 border-l-4 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Active Customers</p>
                                <p className="text-2xl font-bold text-slate-900">{customerSummary.length}</p>
                                <p className="text-sm font-medium text-purple-600">+{customerSummary.length} active</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm border-orange-200 border-l-4 hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Last Activity</p>
                                <p className="text-sm font-semibold text-slate-900">
                                    {customerSummary[0]?.last_activity
                                        ? formatDateTime(customerSummary[0].last_activity)
                                        : 'No activity'
                                    }
                                </p>
                                <p className="text-sm font-medium text-orange-600">Recent</p>
                            </div>
                            <div className="p-3 rounded-lg bg-orange-50">
                                <TrendingUp className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Usage Over Time Chart */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                                Usage Over Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {isLoadingUsage ? (
                                <div className="h-64 flex items-center justify-center">
                                    <div className="animate-pulse bg-gray-200 rounded-lg h-48 w-full"></div>
                                </div>
                            ) : (
                                <div className="h-64">

                                    <div className="h-80">
                                        {(() => {
                                            console.log('Rendering chart with data:', formattedUsageData);
                                            return null;
                                        })()}
                                        {formattedUsageData.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart
                                                    data={formattedUsageData}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                    <XAxis
                                                        dataKey="date"
                                                        tick={{ fontSize: 11 }}
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={60}
                                                    />
                                                    <YAxis
                                                        tick={{ fontSize: 11 }}
                                                        width={40}
                                                    />
                                                    <RechartsTooltip />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#3b82f6"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">📊</div>
                                                    <p className="text-gray-500">Chart data loading...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Event Types Distribution */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
                            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-green-600" />
                                Event Types Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {isLoadingEvents ? (
                                <div className="h-64 flex items-center justify-center">
                                    <div className="animate-pulse bg-gray-200 rounded-full h-48 w-48"></div>
                                </div>
                            ) : (
                                <div className="h-64">
                                    {events.length === 0 && (
                                        <div className="mb-4 text-center">
                                            <div className="text-xs text-gray-400 bg-green-50 px-3 py-2 rounded inline-block">
                                                📊 Showing sample data for demonstration
                                            </div>
                                        </div>
                                    )}
                                    <ResponsiveContainer width="100%" height={256}>
                                        <PieChart>
                                            <Pie
                                                data={eventCountByType}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="count"
                                            >
                                                {eventCountByType.map((_entry, _index) => (
                                                    <Cell key={`cell-${_index}`} fill={COLORS[_index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Events Table */}
                <Card className="border-0 shadow-sm mb-8">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">Recent Events</h2>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-200">
                        {isLoadingEvents ? (
                            <div className="p-6 space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : events.length > 0 ? (
                            events.slice(0, 10).map((event, _index) => (
                                <div key={event.id} className="p-6 hover:bg-slate-50 transition-colors bg-green-50 border-green-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <Activity className="h-4 w-4 text-green-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium text-slate-900">LLM Usage Event Fired</p>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                    {event.eventName}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mt-1">Customer: {event.externalCustomerId}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Properties: {JSON.stringify(event.properties)}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 text-right">
                                            <p className="text-sm text-slate-500">{formatDateTime(event.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg font-medium">No events found</p>
                                <p className="text-slate-400 text-sm">Events will appear here when you fire them</p>
                            </div>
                        )}
                    </div>
                    {paginationState.hasMore && events.length > 0 && (
                        <div className="p-6 border-t border-slate-200">
                            <Button
                                onClick={loadMoreEvents}
                                disabled={isLoadingEvents}
                                variant="outline"
                                className="w-full hover:bg-slate-50 transition-all duration-200"
                            >
                                {isLoadingEvents ? 'Loading...' : 'Load More Events'}
                            </Button>
                        </div>
                    )}
                </Card>

                {/* Customer Summary */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            Customer Usage Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {isLoadingSummary ? (
                            <div className="space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-20 bg-gray-200 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {customerSummary.map((customer) => (
                                    <div key={customer.customer_id} className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer: {customer.customer_id}</h3>
                                                <p className="text-sm text-gray-600">
                                                    External ID: demo_user_123
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-gray-900">{customer.total_usage}</div>
                                                <div className="text-sm text-gray-600">Total Usage</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Activity className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-600">Event Count</span>
                                                    <p className="font-semibold text-gray-900">{customer.event_count}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-600">Last Activity</span>
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        {formatDateTime(customer.last_activity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {customerSummary.length === 0 && (
                                    <div className="text-center py-12">
                                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg font-medium">No customer data</p>
                                        <p className="text-gray-400 text-sm">Customer summaries will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EventsPage;

