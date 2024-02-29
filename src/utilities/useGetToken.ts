import { useEffect, useState } from "react";
import { CLIENT_AUTH_TOKEN } from "../components/wrappers/RestrictedContentWrapper";

const useGetToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== undefined) {
      setToken(localStorage.getItem(CLIENT_AUTH_TOKEN));
    }
  }, []);

  return token;
};

export default useGetToken;
