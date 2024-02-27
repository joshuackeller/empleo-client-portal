"use client";

import ApplicationForm from "@/src/components/forms/ApplicationForm";
import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";
import { GetListing } from "@/src/requests/listings/useGetListing";
import { cn } from "@/src/utilities/cn";
import { Listing } from "@/src/utilities/interfaces";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SingleListingApplicationPage = () => {
  const path = usePathname();

  const { listingId } = useParams<{ listingId: string }>();
  const [listing, setListing] = useState<Listing | undefined>();

  useEffect(() => {
    const getListing = async () => {
      setListing(await GetListing({ listingId }));
    };
    getListing();
  }, []);

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
          <ApplicationForm listingId={listingId} />
        </RestrictedContentWrapper>
      </div>
    </>
  );
};

export default SingleListingApplicationPage;
