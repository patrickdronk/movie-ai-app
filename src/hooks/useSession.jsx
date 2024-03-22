import { useState, useEffect, useMemo } from 'react';
import { Hanko } from '@teamhanko/hanko-elements';

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export function useSession() {
  const hanko = useMemo(() => new Hanko(hankoApi), []);
  const [sessionState, setSessionState] = useState({
    userId: '',
    jwt: '',
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      if (hanko) {
        const isAuthenticated = hanko.session.isValid();
        const session = hanko.session.get();

        if (isAuthenticated && session) {
          const { userID, jwt = '' } = session;
          setSessionState({
            userId: userID,
            jwt,
            isAuthenticated,
            loading: false,
            error: null,
          });
        } else {
          setSessionState((prevState) => ({
            ...prevState,
            isAuthenticated: false,
            loading: false,
            error: 'Invalid session',
          }));
        }
      }
    };

    checkSession();
  }, [hanko]);

  const setSession = (session) => {
    setSessionState((prevState) => ({
      ...prevState,
      ...session,
    }));
  };

  const logout = async () => {
    try {
      await hanko?.user.logout();
      setSession({ userID: '', jwt: '', isAuthenticated: false });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { ...sessionState, setSession, logout };
}