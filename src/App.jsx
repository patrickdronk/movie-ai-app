import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './config/router.jsx';
import { useSession } from './hooks/useSession.jsx';
import { Skeleton } from 'antd';
import apiClient from './config/apiClient.js';

function App() {
  const { loading, isValid, jwt } = useSession();

  if (loading) {
    return (<Skeleton>Loading...</Skeleton>);
  }

  apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

  return (
    <RouterProvider router={router} context={{ isAuthenticated: isValid }} />
  );
}

export default App;
