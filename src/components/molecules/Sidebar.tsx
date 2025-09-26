import React from 'react';
import { BarChart3, Settings, Zap, ChevronRight, Activity, Rocket, Github, BookOpen, ExternalLink, Mail, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { RouteNames } from '@/core/Routes/routeNames';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            title: 'Get Started',
            url: RouteNames.home,
            icon: Rocket,
            description: 'Setup and tutorials',
        },
        {
            title: 'Usage',
            url: RouteNames.usage,
            icon: BarChart3,
            description: 'Usage analytics',
        },
        {
            title: 'Events',
            url: RouteNames.events,
            icon: Activity,
            description: 'Event analytics & firing',
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

                {/* External Links Section */}
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        Resources
                    </h3>
                    <div className="space-y-2">
                        <a
                            href="https://docs.flexprice.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full group flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
                        >
                            <BookOpen className="h-5 w-5 text-slate-400 group-hover:text-white mr-3" />
                            <div className="flex-1 text-left">
                                <div className="font-medium">Documentation</div>
                                <div className="text-xs text-slate-500 group-hover:text-slate-300">
                                    API docs & guides
                                </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                        </a>

                        <a
                            href="https://github.com/flexprice/flexprice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full group flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
                        >
                            <Github className="h-5 w-5 text-slate-400 group-hover:text-white mr-3" />
                            <div className="flex-1 text-left">
                                <div className="font-medium">GitHub</div>
                                <div className="text-xs text-slate-500 group-hover:text-slate-300">
                                    Source code & issues
                                </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                        </a>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        Contact Us
                    </h3>
                    <div className="space-y-2">
                        <a
                            href="mailto:support@flexprice.io"
                            className="w-full group flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
                        >
                            <Mail className="h-5 w-5 text-slate-400 group-hover:text-white mr-3" />
                            <div className="flex-1 text-left">
                                <div className="font-medium">Email Support</div>
                                <div className="text-xs text-slate-500 group-hover:text-slate-300">
                                    support@flexprice.io
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://join.slack.com/t/flexpricecommunity/shared_invite/zt-3caivk4wj-a2MDp7qvX5gdlOHeQc6PuA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full group flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all duration-200"
                        >
                            <MessageCircle className="h-5 w-5 text-slate-400 group-hover:text-white mr-3" />
                            <div className="flex-1 text-left">
                                <div className="font-medium">Slack Community</div>
                                <div className="text-xs text-slate-500 group-hover:text-slate-300">
                                    Join our community
                                </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                        </a>
                    </div>
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
