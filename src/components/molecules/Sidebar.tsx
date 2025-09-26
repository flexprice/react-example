import React, { useState, useEffect } from 'react';
import { BarChart3, Settings, Zap, ChevronRight, Activity, Rocket, Github, BookOpen, ExternalLink, Mail, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { RouteNames } from '@/core/Routes/routeNames';
import { flexprice } from '@/core/flexprice/config';
import { UsersApi } from '@flexprice/sdk';

interface UserData {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Fetch current user data using FlexPrice SDK
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoading(true);
                const user = await flexprice.getCurrentUser();
                setUserData({
                    id: user.id || 'unknown',
                    name: user.email?.split('@')[0] || 'User', // Use email prefix as name since name is not in DtoUserResponse
                    email: user.email || 'user@flexprice.com',
                    avatar: undefined // Avatar not available in DtoUserResponse
                });
            } catch (err) {
                console.error('Failed to fetch current user:', err);
                setError('Failed to load user data');
                // Fallback data on error
                setUserData({
                    id: 'demo_user',
                    name: 'Demo User',
                    email: 'demo@flexprice.com'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

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
                    {loading ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center animate-pulse">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="h-4 bg-slate-600 rounded animate-pulse mb-1"></div>
                                <div className="h-3 bg-slate-600 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    ) : userData ? (
                        <div className="flex items-center space-x-3">
                            {userData.avatar ? (
                                <img
                                    src={userData.avatar}
                                    alt={userData.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        {userData.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {userData.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {userData.email}
                                </p>
                                {error && (
                                    <p className="text-xs text-red-400 truncate">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Demo User</p>
                                <p className="text-xs text-slate-400">demo@flexprice.com</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
