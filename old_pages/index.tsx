import React from "react";
import useGetOrganization from "@/src/requests/organizations/useGetOrganization";
import Image from "next/image";

const HomePage = () => {
  const { data: organization } = useGetOrganization();

  // switch (organization?.layout) {
  //   case Layout.one:
  //     return <LayoutOne />;
  //   case Layout.two:
  //     return <LayoutTwo />;
  //   case Layout.three:
  //     return <LayoutThree />;
  //   case Layout.four:
  //     return <LayoutFour />;
  //   case Layout.five:
  //     return <LayoutFive />;
  // }

  if (!organization) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {organization?.logo?.url ? (
        <Image
          src={organization?.logo?.url}
          height={100}
          width={100}
          alt={organization?.title || "Organization Logo"}
        />
      ) : (
        <div>{organization?.title}</div>
      )}
    </div>
  );
};

export default HomePage;
