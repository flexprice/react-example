import { createBrowserRouter } from 'react-router';
import { ErrorPage, UsagePage, AnalyticsPage, GetStartedPage } from '@/pages';
import { MainLayout } from '@/layouts';
import { RouteNames } from './routeNames';

export const MainRouter = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <MainLayout />,
        children: [
            {
                path: RouteNames.home,
                element: <GetStartedPage />,
            },
            {
                path: RouteNames.usage,
                element: <UsagePage />,
            },
            {
                path: RouteNames.events,
                element: <AnalyticsPage />,
            },
            {
                path: RouteNames.getStarted,
                element: <GetStartedPage />,
            },
        ],
    },
    {
        path: RouteNames.error,
        element: <ErrorPage />,
    },
]);
