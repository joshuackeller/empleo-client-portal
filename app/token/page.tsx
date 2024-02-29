"use client";

import { CLIENT_AUTH_TOKEN } from "@/src/components/wrappers/RestrictedContentWrapper";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ConfirmAccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const routerToken = searchParams.get("token");
  const returnRoute = searchParams.get("returnRoute");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!!routerToken) {
        localStorage.setItem(CLIENT_AUTH_TOKEN, routerToken as string);
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
