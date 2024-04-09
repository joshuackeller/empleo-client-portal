import "@/styles/globals.css";
import { GetListing } from "@/src/requests/listings/GetListing";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { buttonVariants } from "@/src/components/shadcn/Button";
import GetOrgSlug from "@/src/utilities/GetOrgSlug";
import GetEmploymentType from "@/src/utilities/GetEmploymentType";

const Layout = async ({
  children,
  params: { listingId },
}: {
  children: React.ReactNode;
  params: {
    listingId: string;
  };
}) => {
  const slug = GetOrgSlug();
  const listing = await GetListing({ listingId, slug });
  return (
    <div className="mt-5">
      <Link
        href="/listings"
        className={cn("!p-0", buttonVariants({ variant: "link" }))}
      >
        &larr; All Positions
      </Link>
      <div className="mt-8 mb-12">
        <h1>{listing.jobTitle}</h1>
        <p className="muted-text">{listing.shortDescription}</p>
      </div>
      <div className="md:flex w-full flex-1 ">
        <div className="w-[225px] space-y-5 mr-5 py-1 pr-1">
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">Location</p>
            <p>{listing.location || "-"}</p>
          </div>
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">Type</p>
            <p>{GetEmploymentType(listing.employmentType)}</p>
          </div>
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">
              Salary Estimate
            </p>
            <p>{listing.salaryRange || "-"}</p>
          </div>
        </div>
        <div className="w-full flex-1 mt-8 md:mt-0">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
