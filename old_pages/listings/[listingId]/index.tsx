import React from "react";
import useGetListing from "@/src/requests/listings/useGetListing";
import { useRouter } from "next/router";
import ApplicationForm from "@/src/components/forms/applicationForm";
import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";

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
    <div className="p-5 max-w-xl mx-auto">
      <div>
        <a href="/listings">&larr; All Listings</a>
      </div>
      <div>
        <div>
          <h2>{data.jobTitle}</h2>
          <p className="!my-0">{data.jobDescription}</p>
          <p className="!my-0">{data.salaryRange}</p>
          <p className="!my-0">{data.jobRequirements}</p>
          <p className="!my-0">{data.location}</p>
        </div>
        <RestrictedContentWrapper actionText="Apply Now">
          <ApplicationForm />
        </RestrictedContentWrapper>
      </div>
    </div>
  );
};

export default ListingDetails;
