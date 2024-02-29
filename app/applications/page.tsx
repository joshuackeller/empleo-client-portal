"use client";

import Link from "next/link";
import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";
import { GetApplications } from "@/src/requests/applications/GetApplications";
import { Application } from "@/src/utilities/interfaces";
import useQuery from "@/src/utilities/useQuery";
import useGetToken from "@/src/utilities/useGetToken";
import ApplicationStatusBadge from "@/src/components/other/ApplicationStatusBadge";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import { cn } from "@/src/utilities/cn";
import { buttonVariants } from "@/src/components/shadcn/Button";

const ApplicationsPage = () => {
  const token = useGetToken();
  const { data: applications } = useQuery<Application[]>(
    GetApplications,
    {},
    { enabled: !!token }
  );

  return (
    <>
      <h3>My Applications</h3>
      <div className="mt-3">
        <RestrictedContentWrapper>
          <div className="space-y-2">
            {!!applications ? (
              applications?.length < 1 ? (
                <div className="space-y-3 my-10">
                  <h4 className="text-center">No Applications Found</h4>
                  <div className="flex justify-center">
                    <Link href="/listings" className={cn(buttonVariants())}>
                      See Open Positions
                    </Link>
                  </div>
                </div>
              ) : (
                applications?.map((application: Application) => (
                  <Link
                    className="block cursor-pointer border rounded-lg w-full p-3 bg-white transition"
                    href={`/applications/${application.id}`}
                    key={application.id}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className=" font-bold">
                          {application.listing.jobTitle}
                        </p>
                        <p className="!-mt-1 muted-text">
                          ID: {application.id}
                        </p>
                      </div>
                      <div>
                        <ApplicationStatusBadge status={application.status} />
                      </div>
                    </div>
                  </Link>
                ))
              )
            ) : (
              [0, 1, 2, 3].map((key) => (
                <Skeleton className="h-16 w-full" key={key} />
              ))
            )}
          </div>
        </RestrictedContentWrapper>
      </div>
    </>
  );
};

export default ApplicationsPage;
