import { createBrowserRouter } from 'react-router';
import { HomePage, ErrorPage, UsagePage, AnalyticsPage } from '@/pages';
import { MainLayout } from '@/layouts';

export const RouteNames = {
    home: '/',
    usage: '/usage',
    events: '/events',
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
                path: RouteNames.events,
                element: <AnalyticsPage />,
            },
        ],
    },
    {
        path: RouteNames.error,
        element: <ErrorPage />,
    },
]);
