import "@/styles/globals.css";
import { GetListing } from "@/src/requests/listings/useGetListing";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { buttonVariants } from "@/src/components/shadcn/Button";

const Layout = async ({
  children,
  params: { listingId },
}: {
  children: React.ReactNode;
  params: {
    listingId: string;
  };
}) => {
  const listing = await GetListing({ listingId });
  return (
    <div className="mt-5">
      <Link
        href="/listings"
        className={cn("!p-0", buttonVariants({ variant: "link" }))}
      >
        &larr; All Positions
      </Link>
      <div className="my-12">
        <p className="text-5xl font-black ">{listing.jobTitle}</p>
        <p>add a short description</p>
      </div>
      <div className="flex">
        <div className="w-[200px] space-y-5 mr-5">
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">Location</p>
            <p>{listing.location}</p>
          </div>
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">Type</p>
            <p>{listing.employmentType}</p>
          </div>
          <div>
            <p className="-mb-2 uppercase text-xs text-gray-500">
              Salary Estimate
            </p>
            <p>{listing.salaryRange}</p>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
