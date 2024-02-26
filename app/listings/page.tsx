"use client";

import { GetListings } from "@/src/requests/listings/useGetListings";
import { CircleDashedIcon, CornerUpRightIcon } from "lucide-react";
import Link from "next/link";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Listing } from "@/src/utilities/interfaces";
import { Input } from "@/src/components/shadcn/Input";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const ListingsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getIntialListings = async () => {
      const initialListings = await GetListings({ search });
      setIsLoading(false);
      setListings(initialListings);
    };
    getIntialListings();
  }, []);

  const debouncedGetListings = useCallback(
    debounce(async (search) => {
      setIsFetching(true);
      const filteredListings = await GetListings({ search });
      setListings(filteredListings);
      setIsFetching(false);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedGetListings(search);
  }, [search]);

  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center w-full my-24 relative">
        <p className="text-5xl font-black">All Open Positions</p>
        {/* <div className="radial-gradient h-[500px] w-[500px] absolute translate-x-1/4" /> */}
      </div>
      <div className="relative">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          placeholder="Search..."
        />
        <div className="absolute right-2.5 top-2.5 h-full">
          {isFetching ? (
            <CircleDashedIcon className="h-4 w-4 animate-spin" />
          ) : (
            <MagnifyingGlassIcon className="h-4 w-4" />
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 my-5">
        {isLoading ? (
          [0, 1, 2, 3, 4].map((key) => (
            <Skeleton key={key} className="h-[70px] w-full" />
          ))
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <Link
              href={`/listings/${listing.id}`}
              className="block cursor-pointer border rounded-lg w-full p-3 hover:bg-gray-50 transition"
              key={listing.id}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold ">{listing.jobTitle}</p>
                  <p className="!-mt-1 muted-text">
                    add a short description here
                  </p>
                </div>
                <div>
                  <CornerUpRightIcon className="h-4 w-4" />
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
