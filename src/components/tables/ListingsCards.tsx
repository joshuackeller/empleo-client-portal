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

const ListingsCards = () => {
  const { data } = useGetListings();
  const router = useRouter();
  const baseRoute = router.pathname;

  const handleRowClick = (baseRoute: string, id: string) => {
    router.push(`${baseRoute}/${id}`);
  };

  return (
    <>
      {data?.map((data) => (
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
