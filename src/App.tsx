import { RouterProvider } from 'react-router';
import { MainRouter } from './core/Routes/Router';
import './index.css';

const App = () => {
  return <RouterProvider router={MainRouter} />;
}

export default App