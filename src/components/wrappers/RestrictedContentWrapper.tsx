import useAuthContext from "@/src/utilities/useAuthContext";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../shadcn/Button";

interface RestrictedContentWrapperProps {
  children: ReactNode;
  actionText?: string;
}

const RestrictedContentWrapper = ({
  children,
  actionText = "Get Started",
}: RestrictedContentWrapperProps) => {
  let [mounted, setMounted] = useState<boolean>(false);

  const { token, setAuthModalOpen } = useAuthContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {!mounted ? (
        <div>loading...</div>
      ) : token ? (
        <div>{children}</div>
      ) : (
        <div>
          <Button onClick={() => setAuthModalOpen(true)}>{actionText}</Button>
        </div>
      )}
    </div>
  );
};

export default RestrictedContentWrapper;
