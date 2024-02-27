"use client";

import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { cn } from "@/src/utilities/cn";
import { FolderIcon, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RestrictedContentWrapper, {
  AUTH_TOKEN,
} from "@/src/components/wrappers/RestrictedContentWrapper";

const ApplicationsPage = () => {
  const pathname = usePathname();

  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN);
      window.location.reload();
    }
  };

  return (
    <div className="flex my-10">
      <div className="w-[200px] space-y-1 mr-5 py-1 pr-1">
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
        <Button
          variant="ghost"
          className="gap-x-2 w-full !justify-start"
          onClick={logOut}
        >
          <LogOutIcon className="h-5 w-5" />
          Leave Account
        </Button>
      </div>
      <div className="w-full flex-1">
        <h3>My Applications</h3>
        <div className="mt-3">
          <RestrictedContentWrapper>
            <div>add applications here</div>
          </RestrictedContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
