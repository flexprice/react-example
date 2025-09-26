import { createBrowserRouter } from 'react-router';
import { HomePage, ErrorPage, UsagePage, AnalyticsPage } from '@/pages';
import { MainLayout } from '@/layouts';

export const RouteNames = {
    home: '/',
    usage: '/usage',
    analytics: '/analytics',
    error: '*',
};

export const MainRouter = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <MainLayout />,
        children: [
            {
                path: RouteNames.home,
                element: <HomePage />,
            },
            {
                path: RouteNames.usage,
                element: <UsagePage />,
            },
            {
                path: RouteNames.analytics,
                element: <AnalyticsPage />,
            },
        ],
    },
    {
        path: RouteNames.error,
        element: <ErrorPage />,
    },
]);
