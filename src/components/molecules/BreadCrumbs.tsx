import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ChevronRight, Home, BarChart3, Calendar, Settings } from 'lucide-react';

const BreadCrumbs: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const getPageInfo = (path: string) => {
        const pageMap: { [key: string]: { name: string; icon: React.ComponentType<any>; description: string } } = {
            '': { name: 'Dashboard', icon: Home, description: 'Overview and metrics' },
            'events': { name: 'Events', icon: Calendar, description: 'Monitor events' },
            'usage': { name: 'Analytics', icon: BarChart3, description: 'Usage analytics' },
            'settings': { name: 'Settings', icon: Settings, description: 'Configuration' },
        };
        return pageMap[path] || { name: path.charAt(0).toUpperCase() + path.slice(1), icon: Home, description: '' };
    };

    const currentPage = getPageInfo(pathnames[pathnames.length - 1] || '');

    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    {/* Home Icon */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors group"
                    >
                        <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                            <Home className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">Home</span>
                    </button>

                    {/* Breadcrumb Path */}
                    {pathnames.length > 0 && (
                        <>
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                            <div className="flex items-center space-x-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
                                    <currentPage.icon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-slate-900">
                                        {currentPage.name}
                                    </span>
                                    {currentPage.description && (
                                        <p className="text-xs text-slate-500 -mt-0.5">
                                            {currentPage.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Right side info */}
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                        <div className="text-xs text-slate-500">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbs;
