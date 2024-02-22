import RestrictedContentWrapper from "@/src/components/wrappers/RestrictedContentWrapper";

const SingleListingPage = () => {
  return (
    <div>
      <a href="/listings">&larr; All Listings</a>
      <RestrictedContentWrapper>
        <div>single listing</div>
      </RestrictedContentWrapper>
    </div>
  );
};

export default SingleListingPage;
