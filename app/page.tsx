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
        <p className="text-6xl font-black">Join {organization.title}</p>
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
        {/* <p className="text-xl text-center">
          INSERT LONG DESCRIPTION HERE: At vero eos et accusamus et iusto odio
          dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt
          mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
          facilis est et expedita distinctio. Nam libero tempore, cum soluta
          nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
          placeat facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Temporibus autem quibusdam et aut officiis debitis aut
          rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
          et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
          delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat.
        </p> */}
        {organization.longDescription && (
          <div
            className="richtext"
            dangerouslySetInnerHTML={{ __html: organization.longDescription }}
          />
        )}
      </div>
      <div id="open-positions" className="flex gap-10 my-36 relative">
        <div className="radial-gradient-primary h-[500px] w-[500px] absolute -z-10" />
        <div className="font-black text-3xl mt-4">Open Positions</div>
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
