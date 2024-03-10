import { useState, useEffect, useMemo } from "react";
import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export function useSession() {
  const hanko = useMemo(() => new Hanko(hankoApi), []);
  const [sessionState, setSessionState] = useState({
    userID: "",
    jwt: "",
    isValid: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      if (hanko) {
        const isValid = await hanko.session.isValid();
        const session = hanko.session.get();

        if (isValid && session) {
          const { userID, jwt = "" } = session;
          setSessionState({
            userID,
            jwt,
            isValid,
            loading: false,
            error: null,
          });
        } else {
          setSessionState((prevState) => ({
            ...prevState,
            isValid: false,
            loading: false,
            error: "Invalid session",
          }));
        }
      }
    };

    checkSession();
  }, [hanko]);

  const logout = async () => {
    try {
      await hanko?.user.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { ...sessionState, logout };
}
