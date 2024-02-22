import useGetOrganization from "@/src/requests/organizations/useGetOrganization";

const HomePage = () => {
  const { data: organization } = useGetOrganization();
  return (
    <div>
      <h1>{organization?.title}</h1>
      <a href="/listings">Listings</a>
    </div>
  );
};

export default HomePage;
