import { createBrowserRouter } from 'react-router';
import { HomePage, ErrorPage, EventsPage, UsagePage } from '@/pages';
import { MainLayout } from '@/layouts';

export const RouteNames = {
    home: '/',
    events: '/events',
    usage: '/usage',
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
                path: RouteNames.events,
                element: <EventsPage />,
            },
            {
                path: RouteNames.usage,
                element: <UsagePage />,
            },
        ],
    },
    {
        path: RouteNames.error,
        element: <ErrorPage />,
    },
]);
