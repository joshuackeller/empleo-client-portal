"use client";

import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { cn } from "@/src/utilities/cn";
import { FolderIcon, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RestrictedContentWrapper, {
  AUTH_TOKEN,
} from "@/src/components/wrappers/RestrictedContentWrapper";
import { GetApplications } from "@/src/requests/applications/GetApplications";
import { Application } from "@/src/utilities/interfaces";
import useQuery from "@/src/utilities/useQuery";
import useGetToken from "@/src/utilities/useGetToken";

const ApplicationsPage = () => {
  const pathname = usePathname();

  const token = useGetToken();
  const { data: applications } = useQuery<Application[]>(
    GetApplications,
    {},
    { enabled: !!token }
  );

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
      <div className="w-full flex-1">
        <h3>My Applications</h3>
        <div className="mt-3">
          <RestrictedContentWrapper>
            {applications?.map((application: Application) => (
              <div>{application.id}</div>
            ))}
          </RestrictedContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
