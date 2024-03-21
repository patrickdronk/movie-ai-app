import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './config/router.jsx';
import { useSession } from './hooks/useSession.jsx';
import { Skeleton } from 'antd';
import { AuthContext } from './config/AuthContext.js';
import apiClient from './config/apiClient.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { loading, isAuthenticated, setIsAuthenticated, jwt } = useSession();

  const queryClient = new QueryClient({});

  if (loading) {
    return (<Skeleton>Loading...</Skeleton>);
  }

  apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ isAuthenticated }} />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
