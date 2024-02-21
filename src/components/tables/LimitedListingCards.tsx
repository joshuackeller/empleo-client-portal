import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/src/components/shadcn/Card";
  import useGetListings from "@/src/requests/listings/useGetListings";
  import { useRouter } from "next/router";
  
  const ListingsCards = ({ limit }: { limit?: number }) => {
    const { data } = useGetListings();
    const router = useRouter();
    const baseRoute = router.pathname;
  
    const handleRowClick = (baseRoute: string, id: string) => {
      router.push(`listings/${baseRoute}/${id}`);
    };
  
    // If limit is defined, slice the data array. Otherwise, use the full data array.
    const displayedData = limit !== undefined ? data?.slice(0, limit) : data;
  
    return (
      <>
        {displayedData?.map((data) => (
          <Card key={data.id} onClick={() => handleRowClick(baseRoute, data.id)}>
            <CardHeader>
              <CardTitle>{data.jobTitle}</CardTitle>
              <CardDescription>{data.jobDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.jobRequirements}</p>
            </CardContent>
            <CardFooter>
              <p>{data.location}</p>
            </CardFooter>
          </Card>
        ))}
      </>
    );
  };
  
  export default ListingsCards;