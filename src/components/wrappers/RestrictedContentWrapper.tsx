"use client";

import { ReactNode, useEffect, useState } from "react";
import { Card } from "../shadcn/Card";
import RequestLinkForm from "../auth/RequestLinkForm";
import { Skeleton } from "../shadcn/Skeleton";

export const CLIENT_AUTH_TOKEN = "CLIENT_AUTH_TOKEN";

interface RestrictedContentWrapperProps {
  children: ReactNode;
  actionText?: string;
}

const RestrictedContentWrapper = ({
  children,
}: RestrictedContentWrapperProps) => {
  let [mounted, setMounted] = useState<boolean>(false);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      let localToken = localStorage.getItem(CLIENT_AUTH_TOKEN);
      if (localToken) {
        setToken(localToken);
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      {!mounted ? (
        <Skeleton className="h-60 !w-full" />
      ) : token ? (
        <div>{children}</div>
      ) : (
        <Card className="p-5 mt-3 w-full">
          <h3>Enter your email to proceed</h3>
          <p className="muted-text">
            After entering your email we'll send you a secure link to complete
            the application
          </p>
          <RequestLinkForm />
        </Card>
      )}
    </div>
  );
};

export default RestrictedContentWrapper;
