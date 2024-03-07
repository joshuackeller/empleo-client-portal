"use client";

import { GetApplication } from "@/src/requests/applications/GetApplication";
import { Application } from "@/src/utilities/interfaces";
import useGetToken from "@/src/utilities/useGetToken";
import useQuery from "@/src/utilities/useQuery";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import ApplicationStatusBadge from "@/src/components/other/ApplicationStatusBadge";
import ApplicationUpdateForm from "@/src/components/forms/ApplicationUpdateForm";
import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";
import ApplicationUpdateFormCopy from "@/src/components/forms/ApplicationUpdateFormCopy";

const SingleApplicationPage = () => {
  const { applicationId, listingId } = useParams<{
    applicationId: string;
    listingId: string;
  }>();

  const token = useGetToken();
  const { data: application, isLoading } = useQuery<Application>(
    GetApplication,
    { applicationId },
    { enabled: !!token }
  );

  return (
    <div>
      <div className="flex gap-x-1 items-center text-gray-400 text-xs">
        <Link href="/applications">My Applications</Link>
        <ChevronRightIcon className="h-3 w-3" />
        <Link href={`/applications/${applicationId}`}>
          {application?.listing.jobTitle || "Application"}
        </Link>
      </div>
      <div className="mt-3 space-y-3">
        <RestrictedContentWrapper>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-96 w-full" />
            </>
          ) : !!application ? (
            <>
              <div className="flex justify-between mb-3">
                <h3>{application?.listing.jobTitle}</h3>
                <ApplicationStatusBadge status={application.status} />
              </div>
              <ApplicationUpdateForm applicationId={applicationId} />
            </>
          ) : (
            <div>Application Not Found</div>
          )}
        </RestrictedContentWrapper>
      </div>
    </div>
  );
};

export default SingleApplicationPage;
