"use client";

import { useEffect, useState } from "react";
import useQuery from "@/src/utilities/useQuery";
import { Application, Organization } from "@/src/utilities/interfaces";
import { GetApplication } from "@/src/requests/applications/GetApplication";
import useGetToken from "@/src/utilities/useGetToken";
import { Skeleton } from "../shadcn/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/Select";
import { Label } from "@/src/components/shadcn/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetOrganization } from "@/src/requests/organizations/GetOrganization";
import useGetOrgSlug from "@/src/utilities/useGetOrgSlug";
import { UpdateApplication } from "@/src/requests/applications/UpdateApplication";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/Form";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  note: z.string().optional(),
  linkedInUrl: z.string().url().optional(),
  resume: z.any().optional(),
  resumeName: z.any().optional(),
  coverLetter: z.any().optional(),
  coverLetterName: z.any().optional(),
  usAuthorized: z.boolean().optional(),
  availableStartDate: z.string().optional(),
  eeocRace: z.string().optional(),
  eeocVeteranStatus: z.string().optional(),
  eeocDisabilityStatus: z.string().optional(),
  eeocGender: z.string().optional(),
});

interface ApplicationUpdateFormProps {
  applicationId: string;
}

const ApplicationUpdateFormCopy = ({
  applicationId,
}: ApplicationUpdateFormProps) => {
  const token = useGetToken();
  const slug = useGetOrgSlug();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const [replaceResume, setReplaceResume] = useState<boolean>(false);
  const [replaceCoverLetter, setReplaceCoverLetter] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      note: undefined,
      phone: undefined,
      address: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
      linkedInUrl: undefined,
      usAuthorized: undefined,
      availableStartDate: undefined,
      eeocRace: undefined,
      eeocVeteranStatus: undefined,
      eeocDisabilityStatus: undefined,
      eeocGender: undefined,
      resume: undefined,
      resumeName: undefined,
      coverLetter: undefined,
      coverLetterName: undefined,
    },
  });

  const [gender, setGender] = useState<string>("");

  const { data: application, isLoading } = useQuery<Application>(
    GetApplication,
    { applicationId: "2unqgXefAKHM" },
    { enabled: !!token }
  );
  const { data: organization, isLoading: isLoadingOrg } =
    useQuery<Organization | null>(
      GetOrganization,
      { slug },
      { enabled: !!slug }
    );

  useEffect(() => {
    if (!!application) {
      form.reset({
        firstName: application?.firstName || "",
        lastName: application?.lastName || "",
        note: application?.note || undefined,
        phone: application?.phone || undefined,
        address: application?.address || undefined,
        city: application?.city || undefined,
        state: application?.state || undefined,
        zip: application?.zip || undefined,
        linkedInUrl: application?.linkedInUrl || undefined,
        usAuthorized: application?.usAuthorized || undefined,
        availableStartDate: application?.availableStartDate || undefined,
        eeocRace: application?.eeocRace || undefined,
        eeocVeteranStatus: application?.eeocVeteranStatus || undefined,
        eeocDisabilityStatus: application?.eeocDisabilityStatus || undefined,
        eeocGender: application?.eeocGender || undefined,
        resume: undefined,
        resumeName: undefined,
        coverLetter: undefined,
        coverLetterName: undefined,
      });
    }
  }, [application]);

  useEffect(() => {
    console.log("RUNNING", application);
    if (application) {
      console.log("HERE");
      setGender(application?.eeocGender || "");
    }
  }, [application]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      await UpdateApplication({
        body: values,
        applicationId,
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
    setIsPending(false);
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div>
      {organization?.genderEnabled && <></>}
      <div>app gender: {application?.eeocGender}</div>
      <div>gender: {gender}</div>
      {organization?.genderEnabled && (
        <div>
          <Label>Gender</Label>
          <Select
            onValueChange={setGender}
            value={gender}
            defaultValue={gender}
          >
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
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5"
        ></form>
      </Form>
    </div>
  );
};

export default ApplicationUpdateFormCopy;
