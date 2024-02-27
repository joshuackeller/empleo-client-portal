"use client";

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
      <div className="flex gap-x-5">
        <Link
          href={`/listings/${listingId}`}
          className={cn(path === `/listings/${listingId}` && "font-semibold")}
        >
          Description
        </Link>
        <Link
          href={`/listings/${listingId}/application`}
          className={cn(
            path === `/listings/${listingId}/application` && "font-semibold"
          )}
        >
          Application
        </Link>
      </div>
      <div className="mt-3 flex-1 w-full">
        <RestrictedContentWrapper>
          <div>insert application form here</div>
        </RestrictedContentWrapper>
      </div>
    </>
  );
};

export default SingleListingApplicationPage;
