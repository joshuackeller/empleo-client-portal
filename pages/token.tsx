import { AUTH_TOKEN } from "@/src/components/wrappers/AuthWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConfirmAccountPage = () => {
  const {
    push,
    query: { token: routerToken, returnRoute },
  } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!!routerToken) {
        localStorage.setItem(AUTH_TOKEN, routerToken as string);
        push(returnRoute as string);
      } else {
        push("/auth_error");
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
