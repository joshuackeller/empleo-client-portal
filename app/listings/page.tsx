import { GetListings } from "@/src/requests/listings/useGetListings";
import { CornerUpRightIcon } from "lucide-react";
import Link from "next/link";

const ListingsPage = async () => {
  const listings = await GetListings({});

  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center w-full my-24 relative">
        <p className="text-5xl font-black">All Open Positions</p>
        {/* <div className="radial-gradient h-[500px] w-[500px] absolute translate-x-1/4" /> */}
      </div>

      <div className="flex-1 space-y-3">
        {listings.length > 0 ? (
          listings.slice(0, 5).map((listing) => (
            <Link
              href={`/listings/${listing.id}`}
              className="block cursor-pointer border rounded-lg w-full p-5 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-xl">{listing.jobTitle}</p>
                  <p className="!-mt-1 muted-text">
                    add a short description here
                  </p>
                </div>
                <div>
                  <CornerUpRightIcon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No Listings Found</div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
