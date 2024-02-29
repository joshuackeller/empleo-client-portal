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
import { Application } from "@/src/utilities/interfaces";
import { GetApplication } from "@/src/requests/applications/GetApplication";
import useGetToken from "@/src/utilities/useGetToken";
import { UpdateApplication } from "@/src/requests/applications/UpdateApplication";
import { Skeleton } from "../shadcn/Skeleton";
import { XIcon } from "lucide-react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  note: z.string().optional(),
  linkedInUrl: z.string().url().optional(),
  resume: z.any().optional(),
  coverLetter: z.any().optional(),
});

interface ApplicationUpdateFormProps {
  applicationId: string;
}

const ApplicationUpdateForm = ({
  applicationId,
}: ApplicationUpdateFormProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const [replaceResume, setReplaceResume] = useState<boolean>(false);

  const token = useGetToken();
  const { data: application, isLoading } = useQuery<Application>(
    GetApplication,
    { applicationId },
    { enabled: !!token }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      linkedInUrl: "",
      note: undefined,
      phone: undefined,
      resume: undefined,
    },
  });

  useEffect(() => {
    if (!!application) {
      form.reset({
        firstName: application?.firstName || "",
        lastName: application?.lastName || "",
        linkedInUrl: application?.linkedInUrl || undefined,
        note: application?.note || undefined,
        phone: application?.phone || undefined,
        resume: undefined,
      });
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
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

          <div>
            <Label>Resume</Label>
            {!application?.resume || replaceResume ? (
              <div className="relative">
                <Input
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    var file = e.target?.files?.[0];
                    if (file) {
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
                  className="absolute right-2 top-0 h-full cursor-pointer flex items-center"
                >
                  <XIcon className="h-5 w-5" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-x-5 border rounded pl-3 pr-2 py-2.5">
                <div className="flex gap-x-2 items-center">
                  <div className="text-sm font-semibold whitespace-nowrap">
                    Current File
                  </div>
                  <div className="muted-text  text-ellipsis whitespace-nowrap overflow-hidden">
                    {application?.resume.url}...
                  </div>
                </div>
                <div
                  onClick={() => setReplaceResume(true)}
                  className="cursor-pointer"
                >
                  <XIcon className="h-5 w-5" />
                </div>
              </div>
            )}
          </div>
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
          <div className="flex justify-end mt-3">
            <Button disabled={isPending} type="submit">
              Update Application
            </Button>
          </div>
        </form>
      </Form>

      {isSuccess === true && (
        <p className="text-green-500 text-sm">
          Application updated successfully.
        </p>
      )}
      {isSuccess === false && (
        <p className="text-red-500 text-sm">
          Could not update application. Please refresh page and try again.
        </p>
      )}
    </div>
  );
};

export default ApplicationUpdateForm;
