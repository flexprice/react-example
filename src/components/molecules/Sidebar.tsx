import React from 'react';
import { Home, BarChart3, Settings, Zap, ChevronRight, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            url: '/',
            icon: Home,
            description: 'Overview and metrics',
        },
        {
            title: 'Usage',
            url: '/usage',
            icon: BarChart3,
            description: 'Usage analytics',
        },
        {
            title: 'Analytics',
            url: '/analytics',
            icon: Activity,
            description: 'Event analytics & firing',
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
            description: 'Configuration',
        },
    ];

    return (
        <div className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 h-full flex flex-col">
            {/* Logo and Branding */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">FlexPrice</h1>
                        <p className="text-xs text-slate-400">Usage-based billing</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.url;
                        return (
                            <button
                                key={item.title}
                                onClick={() => navigate(item.url)}
                                className={`w-full group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center space-x-3 flex-1">
                                    <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                                    <div className="text-left">
                                        <div className="font-medium">{item.title}</div>
                                        <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                                {isActive && (
                                    <ChevronRight className="h-4 w-4 text-white" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400">admin@flexprice.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
