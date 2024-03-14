import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './config/router.jsx';
import { useSession } from './hooks/useSession.jsx';
import { Skeleton } from 'antd';
import { AuthContext } from './config/AuthContext.js';
import apiClient from './config/apiClient.js';

function App() {
  const { loading, isAuthenticated, setIsAuthenticated, jwt } = useSession();

  if (loading) {
    return (<Skeleton>Loading...</Skeleton>);
  }

  apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} context={{ isAuthenticated }} />
    </AuthContext.Provider>
  );
}

export default App;
