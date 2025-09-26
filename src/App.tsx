import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainRouter } from './core/Routes/Router';
import './index.css';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={MainRouter} />
    </QueryClientProvider>
  );
}

export default App