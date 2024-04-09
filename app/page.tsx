import { buttonVariants } from "@/src/components/shadcn/Button";
import { GetListings } from "@/src/requests/listings/GetListings";
import { GetOrganization } from "@/src/requests/organizations/GetOrganization";
import { cn } from "@/src/utilities/cn";
import GetOrgSlug from "@/src/utilities/GetOrgSlug";
import { CornerUpRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const HomePage = async () => {
  const slug = GetOrgSlug();
  if (!slug) {
    notFound();
  }

  const organization = await GetOrganization({ slug });
  const listings = await GetListings({ slug });

  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center w-full my-44 relative">
        <h1>Join {organization.title}</h1>
        <p className="text-2xl muted-text">{organization.description}</p>
        <a
          href="#open-positions"
          className={cn("mt-24 z-10", buttonVariants({ size: "lg" }))}
        >
          See Open Positions
        </a>
        <div className="radial-gradient-accent h-[500px] w-[500px] absolute translate-x-1/4" />
      </div>
      <div>
        {organization.longDescription && (
          <div
            className="richtext"
            dangerouslySetInnerHTML={{ __html: organization.longDescription }}
          />
        )}
      </div>
      <div id="open-positions" className="md:flex gap-10 my-36 relative">
        <div className="radial-gradient-primary h-[500px] w-[500px] absolute -z-10" />
        <h2 className="font-black mt-4">Open Positions</h2>
        <div className="flex-1 space-y-3">
          {listings.length > 0 ? (
            <>
              {listings.slice(0, 5).map((listing) => (
                <Link
                  href={`/listings/${listing.id}`}
                  className="block cursor-pointer border rounded-lg w-full p-3 bg-white transition"
                  key={listing.id}
                >
                  <div className="flex justify-between items-center ">
                    <div>
                      <p className=" font-bold">{listing.jobTitle}</p>
                      <p className="!-mt-1 muted-text">
                        {listing.shortDescription}
                      </p>
                    </div>
                    <div>
                      <CornerUpRightIcon className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
              <div className="flex justify-center !mt-10">
                <Link
                  href="/listings"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  See All Positions
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3>No Positions Found</h3>
              <p>Check back later for updates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
