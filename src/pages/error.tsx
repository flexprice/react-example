import React from 'react';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        404
                    </div>
                    <div className="absolute -top-4 -right-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                            <Search className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -left-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Oops! Page not found
                    </h1>
                    <p className="text-xl text-slate-600 mb-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-slate-500">
                        Don't worry, even the best explorers sometimes take a wrong turn.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Go Home
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </Button>
                </div>

                {/* Helpful Links */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Pages</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                    <Home className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Dashboard</p>
                                    <p className="text-sm text-slate-600">Overview & metrics</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/events')}
                            className="p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                    <Search className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Events</p>
                                    <p className="text-sm text-slate-600">Monitor events</p>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/usage')}
                            className="p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <Zap className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Analytics</p>
                                    <p className="text-sm text-slate-600">Usage analytics</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-sm text-slate-500">
                    <p>Need help? Contact our support team at support@flexprice.com</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
