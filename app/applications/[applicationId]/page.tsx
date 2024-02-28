import { GetApplication } from "@/src/requests/applications/GetApplication";
import useGetToken from "@/src/utilities/useGetToken";
import useQuery from "@/src/utilities/useQuery"
import { useParams } from "next/navigation"

const SingleApplicationPage = () => {
  const {applicationId} = useParams<{applicationId: string}>();

  const token = useGetToken();
  const {data: application} = useQuery(GetApplication, {applicationId}, {enabled: !!token})

  return (

  )
}
