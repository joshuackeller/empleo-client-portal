"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/Form";
import { Input } from "../shadcn/Input";
import { Button } from "../shadcn/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "../shadcn/Textarea";
import { Label } from "../shadcn/Label";
import useQuery from "@/src/utilities/useQuery";
import { Application, Organization } from "@/src/utilities/interfaces";
import { GetApplication } from "@/src/requests/applications/GetApplication";
import useGetToken from "@/src/utilities/useGetToken";
import { UpdateApplication } from "@/src/requests/applications/UpdateApplication";
import { Skeleton } from "../shadcn/Skeleton";
import { FolderUpIcon } from "lucide-react";
import { GetOrganization } from "@/src/requests/organizations/GetOrganization";
import useGetOrgSlug from "@/src/utilities/useGetOrgSlug";
import DatePicker from "../shadcn/DatePicker";
import { Separator } from "../shadcn/Separator";
import YesNoQuestion from "../fields/YesNoQuestion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/Select";
import { toast, useToast } from "../shadcn/use-toast";

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
});

interface ApplicationUpdateFormProps {
  applicationId: string;
}

const ApplicationUpdateForm = ({
  applicationId,
}: ApplicationUpdateFormProps) => {
  const slug = useGetOrgSlug();
  const { toast } = useToast();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const [replaceResume, setReplaceResume] = useState<boolean>(false);
  const [replaceCoverLetter, setReplaceCoverLetter] = useState<boolean>(false);

  const [eeocRace, setEeocRace] = useState<string | undefined>(undefined);
  const [eeocVeteranStatus, setEeocVeteranStatus] = useState<
    string | undefined
  >(undefined);
  const [eeocDisabilityStatus, setEeocDisabilityStatus] = useState<
    string | undefined
  >(undefined);
  const [eeocGender, setEeocGender] = useState<string | undefined>(undefined);

  const token = useGetToken();

  const { data: application, isLoading } = useQuery<Application>(
    GetApplication,
    { applicationId },
    { enabled: !!token }
  );
  const { data: organization, isLoading: isLoadingOrg } =
    useQuery<Organization | null>(
      GetOrganization,
      { slug },
      { enabled: !!slug }
    );

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
      resume: undefined,
      resumeName: undefined,
      coverLetter: undefined,
      coverLetterName: undefined,
    },
  });

  useEffect(() => {
    if (!!application) {
      setEeocRace(application?.eeocRace || undefined);
      setEeocVeteranStatus(application?.eeocVeteranStatus || undefined);
      setEeocDisabilityStatus(application?.eeocDisabilityStatus || undefined);
      setEeocGender(application?.eeocGender || undefined);
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
        resume: undefined,
        resumeName: undefined,
        coverLetter: undefined,
        coverLetterName: undefined,
      });
    }
  }, [application]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      description: "Your application has been updated",
    });
    setIsPending(true);
    try {
      await UpdateApplication({
        body: {
          ...values,
          eeocRace,
          eeocVeteranStatus,
          eeocDisabilityStatus,
          eeocGender,
        },
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
      <Form {...form}>
        <form className="space-y-2.5">
          <div className="grid grid-cols-2 gap-x-5">
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {application?.listing?.addressEnabled && (
            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.cityEnabled && (
            <div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.stateEnabled && (
            <div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.zipEnabled && (
            <div>
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.phoneEnabled && (
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.linkedInUrlEnabled && (
            <div>
              <FormField
                control={form.control}
                name="linkedInUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.availableStartDateEnabled && (
            <div>
              <FormField
                control={form.control}
                name="availableStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Start Date</FormLabel>
                    <FormControl>
                      <div>
                        <DatePicker
                          {...field}
                          onChange={(date) => {
                            form.setValue(
                              "availableStartDate",
                              date?.toISOString()
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {application?.listing?.resumeEnabled && (
            <div>
              <Label>Resume</Label>
              {!application?.resume || replaceResume ? (
                <div className="relative">
                  <Input
                    type="file"
                    className="cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      var file = e.target?.files?.[0];
                      if (file) {
                        form.setValue("resumeName", file.name);
                        let reader = new FileReader();
                        reader.onloadend = function () {
                          const dataUrl = reader.result;
                          form.setValue("resume", dataUrl);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div
                    onClick={() => setReplaceResume(false)}
                    className="absolute right-2 top-0 h-full cursor-pointer flex items-center text-xs font-semibold"
                  >
                    Cancel
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center gap-x-5 border rounded pl-3 pr-4 py-2.5">
                  <div className="flex gap-x-2 items-center">
                    <div className="text-sm font-semibold whitespace-nowrap">
                      Current File
                    </div>
                    <a
                      href={application?.resume?.url}
                      target="_blank"
                      rel="noreferer"
                      className="muted-text text-ellipsis whitespace-nowrap overflow-hidden w-80"
                    >
                      {application?.resume.name}
                    </a>
                  </div>
                  <div
                    onClick={() => setReplaceResume(true)}
                    className="cursor-pointer"
                  >
                    <FolderUpIcon className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              )}
            </div>
          )}

          {application?.listing?.coverLetterEnabled && (
            <div>
              <Label>Cover Letter</Label>
              {!application?.coverLetter || replaceCoverLetter ? (
                <div className="relative">
                  <Input
                    type="file"
                    className="cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      var file = e.target?.files?.[0];
                      if (file) {
                        form.setValue("coverLetterName", file.name);
                        let reader = new FileReader();
                        reader.onloadend = function () {
                          const dataUrl = reader.result;
                          form.setValue("coverLetter", dataUrl);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div
                    onClick={() => setReplaceCoverLetter(false)}
                    className="absolute right-2 top-0 h-full cursor-pointer flex items-center text-xs font-semibold"
                  >
                    Cancel
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center gap-x-5 border rounded pl-3 pr-4 py-2.5">
                  <div className="flex gap-x-2 items-center">
                    <div className="text-sm font-semibold whitespace-nowrap">
                      Current File
                    </div>
                    <a
                      href={application?.coverLetter?.url}
                      target="_blank"
                      rel="noreferer"
                      className="muted-text text-ellipsis whitespace-nowrap overflow-hidden w-80"
                    >
                      {application?.coverLetter?.name}
                    </a>
                  </div>
                  <div
                    onClick={() => setReplaceCoverLetter(true)}
                    className="cursor-pointer"
                  >
                    <FolderUpIcon className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              )}
            </div>
          )}

          {application?.listing?.usAuthorizedEnabled && (
            <div>
              <FormField
                control={form.control}
                name="usAuthorized"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are you authorized to work in the United States?
                    </FormLabel>
                    <FormControl>
                      <YesNoQuestion {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {application?.listing?.noteEnabled && (
            <div>
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Feel free to add anything else we should know!
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
      </Form>

      {organization?.eeocEnabled && (
        <>
          <Separator className="!my-8" />
          <h3>Voluntary Questions</h3>
          <div className="muted-text">
            In addition to the information required to consider your candidacy
            we invite you to voluntarily provide your gender and race/ethnicity.
            This information ensures we meet certain regulatory reporting
            obligations and also further supports the development, refinement,
            and execution of our diversity efforts and programs. Information
            will be kept confidential, used only for legitimate business
            purposes, and will never be used in making any employment decisions,
            including hiring decisions.
          </div>
          <div className="space-y-2.5 py-2">
            {organization?.raceEnabled && (
              <div>
                <Label>Race</Label>
                <Select
                  onValueChange={setEeocRace}
                  defaultValue={eeocRace}
                  value={eeocRace}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-">I choose not to disclose</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="black_or_african_american">
                      Black or African American
                    </SelectItem>
                    <SelectItem value="hispanic_or_latino">
                      Hispanic or Latino
                    </SelectItem>
                    <SelectItem value="native_american_or_alaska_native">
                      Native American or Alaska Native
                    </SelectItem>
                    <SelectItem value="native_american_or_pacific_islander">
                      Native Hawaiian or Other Pacific Islander
                    </SelectItem>
                    <SelectItem value="white">White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {organization?.genderEnabled && (
              <div>
                <Label>Gender</Label>
                <Select
                  onValueChange={setEeocGender}
                  value={eeocGender}
                  defaultValue={eeocGender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefer_not_to_say">
                      Prefer Not To Say
                    </SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {organization?.veteranEnabled && (
              <div>
                <Label>Veteran Status</Label>
                <Select
                  onValueChange={setEeocVeteranStatus}
                  defaultValue={eeocVeteranStatus}
                  value={eeocVeteranStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-">I choose not to disclose</SelectItem>
                    <SelectItem value="protected">
                      I identify as one or more of the classifications of
                      protected veteran listed.
                    </SelectItem>
                    <SelectItem value="other">Other veteran</SelectItem>
                    <SelectItem value="not_protected">
                      I am not a protected veteran
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {organization?.disabilityEnabled && (
              <div>
                <Label>Disability Status</Label>
                <Select
                  onValueChange={setEeocDisabilityStatus}
                  defaultValue={eeocDisabilityStatus}
                  value={eeocDisabilityStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None Selected" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-">I choose not to disclose</SelectItem>
                    <SelectItem value="disabled">
                      Yes, I have a disability, or have had one in the past
                    </SelectItem>
                    <SelectItem value="no_disabled">
                      No, I do not have a disability and have not had one in the
                      past
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex justify-end mt-3">
        <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
          Update Application
        </Button>
      </div>

      {/* {isSuccess === true && (
        <p className="text-green-500 text-sm">
          Application updated successfully.
        </p>
      )} */}
      {isSuccess === false && (
        <p className="text-red-500 text-sm">
          Could not update application. Please refresh page and try again.
        </p>
      )}
    </div>
  );
};

export default ApplicationUpdateForm;
