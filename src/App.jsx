import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './config/router.jsx';
import { useSession } from './hooks/useSession.jsx';
import { Skeleton } from 'antd';
import { AuthContext } from './config/AuthContext.js';

function App() {
  const { loading, isAuthenticated, setIsAuthenticated } = useSession();

  if (loading) {
    return (<Skeleton>Loading...</Skeleton>);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} context={{ isAuthenticated }} />
    </AuthContext.Provider>
  );
}

export default App;
