"use client";

import ApplicationForm from "@/src/components/forms/ApplicationForm";
import { buttonVariants } from "@/src/components/shadcn/Button";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";
import { GetListingApplication } from "@/src/requests/listings/GetListingApplication";
import { cn } from "@/src/utilities/cn";
import { Application } from "@/src/utilities/interfaces";
import useGetToken from "@/src/utilities/useGetToken";
import useQuery from "@/src/utilities/useQuery";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const SingleListingApplicationPage = () => {
  const path = usePathname();

  const { listingId } = useParams<{ listingId: string }>();

  const token = useGetToken();
  const { data: application, isSettled } = useQuery<Application | null>(
    GetListingApplication,
    { listingId },
    {
      enabled: !!token,
    }
  );

  return (
    <>
      <div className="flex">
        <Link
          href={`/listings/${listingId}`}
          className={cn(
            "py-2 pr-12 text-gray-700 hover:text-black hover:border-b-2",
            path === `/listings/${listingId}` &&
              "text-black border-b-2 border-black"
          )}
        >
          Description
        </Link>
        <Link
          href={`/listings/${listingId}/application`}
          className={cn(
            "py-2 pr-12 text-gray-700 hover:text-black hover:border-b-2",
            path === `/listings/${listingId}/application` &&
              "text-black border-b-2 border-black"
          )}
        >
          Application
        </Link>
      </div>
      <div className="mt-3 flex-1 w-full">
        <RestrictedContentWrapper>
          {application ? (
            <div>
              <h3>Application Submitted</h3>
              <Link
                href="/applications"
                className={cn("mt-3", buttonVariants())}
              >
                View Application
              </Link>
            </div>
          ) : !isSettled ? (
            <Skeleton className="h-60" />
          ) : (
            <ApplicationForm listingId={listingId} />
          )}
        </RestrictedContentWrapper>
      </div>
    </>
  );
};

export default SingleListingApplicationPage;
