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
