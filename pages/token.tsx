import { AUTH_TOKEN } from "@/src/components/wrappers/AuthWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConfirmAccountPage = () => {
  const router = useRouter();
  const {
    query: { token: routerToken, returnRoute },
  } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!!routerToken) {
        localStorage.setItem(AUTH_TOKEN, routerToken as string);
        setTimeout(function () {
          router.push(returnRoute as string);
        }, 5000);
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
