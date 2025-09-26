import React from 'react'
import { Card } from '@/components/ui'
import { ArrowRight, BarChart3, CreditCard, Users, Zap } from 'lucide-react'

const HomePage = () => {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$24,567',
            change: '+12.5%',
            icon: CreditCard,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Active Customers',
            value: '1,234',
            change: '+8.2%',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'API Calls',
            value: '2.4M',
            change: '+15.3%',
            icon: BarChart3,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Uptime',
            value: '99.9%',
            change: '+0.1%',
            icon: Zap,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ]

    const recentActivities = [
        { id: 1, action: 'New subscription created', customer: 'Acme Corp', time: '2 minutes ago', type: 'success' },
        { id: 2, action: 'Payment processed', customer: 'TechStart Inc', time: '5 minutes ago', type: 'info' },
        { id: 3, action: 'Usage limit reached', customer: 'DataFlow Ltd', time: '12 minutes ago', type: 'warning' },
        { id: 4, action: 'Invoice generated', customer: 'CloudSync', time: '1 hour ago', type: 'info' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                <div className="relative px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-slate-900 mb-4">
                                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">FlexPrice</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                                The modern platform for usage-based pricing and billing.
                                Scale your business with flexible pricing models.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <button className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-200">
                                    View Documentation
                                </button>
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
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
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

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2">
                            <Card className="p-6 border-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        View all
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                            <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' :
                                                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                                }`}></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                                                <p className="text-sm text-slate-600">{activity.customer}</p>
                                            </div>
                                            <p className="text-xs text-slate-500">{activity.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <Card className="p-6 border-0 shadow-sm">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                                <Users className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">Add Customer</p>
                                                <p className="text-sm text-slate-600">Create a new customer account</p>
                                            </div>
                                        </div>
                                    </button>
                                    <button className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                                <BarChart3 className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">View Analytics</p>
                                                <p className="text-sm text-slate-600">Check usage and revenue metrics</p>
                                            </div>
                                        </div>
                                    </button>
                                    <button className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                                <CreditCard className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">Manage Billing</p>
                                                <p className="text-sm text-slate-600">Configure pricing and plans</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage 