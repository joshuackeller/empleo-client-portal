import { AUTH_TOKEN } from "@/src/components/wrappers/AuthWrapper";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConfirmAccountPage = () => {
  const { setToken } = useAuthContext();
  const router = useRouter();
  const {
    query: { token: routerToken, returnRoute },
  } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!!routerToken) {
        localStorage.setItem(AUTH_TOKEN, routerToken as string);
        setToken(routerToken as string);
        router.push(returnRoute as string);
      } else {
        router.push("/auth_error");
      }
    }
  }, [routerToken]);

  return (
    <div>
      <div>Loading...</div>
    </div>
  );
};

export default ConfirmAccountPage;
