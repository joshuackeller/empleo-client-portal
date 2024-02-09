import useGetOrganization from "@/src/requests/organizations/useGetOrganization";

export default function Home() {
  const { data: organization } = useGetOrganization();
  return <div>{organization?.title}</div>;
}
