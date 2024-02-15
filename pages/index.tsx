import useGetOrganization from "@/src/requests/organizations/useGetOrganization";

export default function Home() {
  const { data: organization } = useGetOrganization();
  return <div>
          {organization?.title}
          <br></br>
          {organization?.description}
          <br></br>
          {organization?.longDescription}
          <br></br>
          {organization?.bodyFont}
          <br></br>
          {organization?.headerFont}
          <br></br>
          {organization?.primaryColor}
          <br></br>
          {organization?.secondaryColor}
          <br></br>
          {organization?.accentColor}
          <br></br>
            <img src={organization?.logo?.url} alt="Organization Logo" />
          <br></br>
            {/* <img src={organization?.} alt="Organization Banner" /> */}
        </div>;
}
