import React from "react";
import useGetListing from "@/src/requests/listings/useGetListing";
import { useRouter } from "next/router";
import { Button } from "@/src/components/shadcn/Button";
import ApplicationForm from "@/src/components/forms/applicationForm";

const ListingDetails = () => {
  const router = useRouter();
  const { listingId } = router.query;
  const { data, isPending, error } = useGetListing(listingId as string);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div>
        <h2>{data.jobTitle}</h2>
        <p>{data.jobDescription}</p>
        <p>{data.salaryRange}</p>
        <p>{data.jobRequirements}</p>
        <p>{data.location}</p>
      </div>
      <ApplicationForm />
      <div className="flex justify-start mt-3 mb-4">
        <Button
          variant={"outline"}
          disabled={isPending}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            router.push("/listings");
          }}
        >
          Back to Listings
        </Button>
      </div>
    </div>
  );
};

export default ListingDetails;
