import { GetListing } from "@/src/requests/listings/useGetListing";

const SingleListingPage = async ({
  params: { listingId },
}: { params: { listingId: string } }) => {
  const listing = await GetListing({ listingId });
  return (
    <div>
      <div className="my-24">
        <p className="text-5xl font-black ">{listing.jobTitle}</p>
        <p>add a short description</p>
      </div>
      <p>{listing.jobDescription}</p>
    </div>
  );
};

export default SingleListingPage;
