import { GetListing } from "@/src/requests/listings/useGetListing";
import { cn } from "@/src/utilities/cn";
import GetOrgSlug from "@/src/utilities/GetOrgSlug";
import { headers } from "next/headers";
import Link from "next/link";

const SingleListingPage = async ({
  params: { listingId },
}: { params: { listingId: string } }) => {
  const slug = GetOrgSlug();
  const listing = await GetListing({ listingId, slug });
  const path = headers().get("x-path");
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
              "text-black font-semibold  border-b-2 border-black"
          )}
        >
          Application
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: listing.jobDescription || "No description provided",
        }}
        className="mt-3"
      />
    </>
  );
};

export default SingleListingPage;
