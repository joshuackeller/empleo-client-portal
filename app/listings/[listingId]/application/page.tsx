import { GetListing } from "@/src/requests/listings/useGetListing";
import { cn } from "@/src/utilities/cn";
import { headers } from "next/headers";
import Link from "next/link";

const SingleListingApplicationPage = async ({
  params: { listingId },
}: { params: { listingId: string } }) => {
  const listing = await GetListing({ listingId });
  const path = headers().get("x-path");
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
      <div>form</div>
    </>
  );
};

export default SingleListingApplicationPage;
