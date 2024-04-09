"use client";

import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { cn } from "@/src/utilities/cn";
import { FolderIcon, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CLIENT_AUTH_TOKEN } from "@/src/components/wrappers/RestrictedContentWrapper";
import useGetToken from "@/src/utilities/useGetToken";
import { ReactNode } from "react";

interface ApplicationsLayoutProps {
  children: ReactNode;
}

const ApplicationsLayout = ({ children }: ApplicationsLayoutProps) => {
  const pathname = usePathname();

  const token = useGetToken();

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CLIENT_AUTH_TOKEN);
      window.location.reload();
    }
  };

  return (
    <div className="md:flex my-10">
      <div className="mb-5 md:mb-0 md:w-[200px] space-y-1 mr-5 py-1 pr-1">
        <Link
          href="/applications"
          className={cn(
            "gap-x-2 w-full !justify-start",
            buttonVariants({ variant: "ghost" }),
            pathname === "/applications" && "bg-accent text-accent-foreground"
          )}
        >
          <FolderIcon className="h-5 w-5" />
          My Applications
        </Link>
        {!!token && (
          <Button
            variant="ghost"
            className="gap-x-2 w-full !justify-start"
            onClick={logOut}
          >
            <LogOutIcon className="h-5 w-5" />
            Leave Account
          </Button>
        )}
      </div>
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default ApplicationsLayout;
