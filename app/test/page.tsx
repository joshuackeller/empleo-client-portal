"use client";

import { useEffect, useState } from "react";
import useQuery from "@/src/utilities/useQuery";
import { Application } from "@/src/utilities/interfaces";
import { GetApplication } from "@/src/requests/applications/GetApplication";
import useGetToken from "@/src/utilities/useGetToken";
import { Skeleton } from "../../src/components/shadcn/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/shadcn/Select";
import { Label } from "@/src/components/shadcn/Label";

const Page = () => {
  const token = useGetToken();

  const [gender, setGender] = useState<string>("");

  const { data: application, isLoading } = useQuery<Application>(
    GetApplication,
    { applicationId: "2unqgXefAKHM" },
    { enabled: !!token }
  );

  console.log({
    GENDER: gender,
    app_gender: application?.eeocGender,
  });

  useEffect(() => {
    console.log("RUNNING", application);
    if (application) {
      console.log("HERE");
      setGender(application?.eeocGender || "");
    }
  }, [application]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div>
      <Label>gender</Label>
      <Select onValueChange={setGender} value={gender} defaultValue={gender}>
        <SelectTrigger>
          <SelectValue placeholder={gender || "None Selected"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-">I choose not to disclose</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <div>app gender: {application?.eeocGender}</div>
      <div>gender: {gender}</div>
    </div>
  );
};

export default Page;
