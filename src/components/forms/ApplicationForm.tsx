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
import { Button, buttonVariants } from "../shadcn/Button";
import { CreateApplication } from "@/src/requests/applications/CreateApplication";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../shadcn/Textarea";
import { Label } from "../shadcn/Label";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  note: z.string().optional(),
  linkedInUrl: z.string().url().optional(),
  resume: z.any().optional(),
  coverLetter: z.any().optional(),
});

interface ApplicationFormProps {
  listingId: string;
}

const ApplicationForm = ({ listingId }: ApplicationFormProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      note: undefined,
      phone: undefined,
      resume: "",
      coverLetter: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      await CreateApplication({
        body: values,
        listingId,
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
    setIsPending(false);
  };

  if (isSuccess === true) {
    return (
      <div>
        <h3>Application Submitted</h3>
        <Link href="/applications" className={cn("mt-3", buttonVariants())}>
          View Application
        </Link>
      </div>
    );
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
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
      {isSuccess === false && (
        <p className="text-red-500 text-sm">
          Could not submit application. Please refresh page and try again.
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;