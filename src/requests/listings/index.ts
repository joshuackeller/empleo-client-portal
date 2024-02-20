// const ListingsKeys = {
//     current: ["current-listings"],
//   };

//   export default ListingsKeys;

const ListingQueryKeys = {
  current: ["current-listings"],
  all: ["listings"],
  single: (listingId: string) => [...ListingQueryKeys.all, listingId],
  applications: (listingId: string) => [
    ...ListingQueryKeys.single(listingId),
    "applications",
  ],
};

export default ListingQueryKeys;
