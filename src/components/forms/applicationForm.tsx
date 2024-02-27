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
import { AddApplication } from "@/src/requests/applications/useAddApplication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shadcn/Select";
import { Gender } from "@/src/utilities/interfaces";
import YesNoQuestion from "../fields/YesNoQuestion";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  usCitizen: z.boolean(),
  workVisa: z.boolean().optional(),
  languages: z.string().optional(),
  availableStartDate: z.string().optional(),
  note: z.string().optional(),
  relocate: z.boolean().optional(),
});

interface ApplicationFormProps {
  listingId: string;
}

const ApplicationForm = ({ listingId }: ApplicationFormProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      languages: "",
      availableStartDate: "",
      note: "",
      usCitizen: undefined,
    },
  });

  const [usCitizen, setUsCitizen] = useState<boolean | undefined>();
  const [workVisa, setWorkVisa] = useState<boolean | undefined>();
  const [relocate, setRelocate] = useState<boolean | undefined>();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    AddApplication({
      body: {
        ...values,
        usCitizen,
        workVisa,
        relocate,
      },
      listingId,
    });
    setIsPending(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => form.setValue("gender", val)}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value={Gender.female}>Female</SelectItem>
                          <SelectItem value={Gender.male}>Male</SelectItem>
                          <SelectItem value={Gender.prefer_not_to_say}>
                            Prefer Not To Say
                          </SelectItem>
                          <SelectItem value={Gender.other}>Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           */}
          <div>
            <FormField
              control={form.control}
              name="usCitizen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are you a U.S. Citizen?</FormLabel>
                  <FormControl>
                    <YesNoQuestion {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button disabled={isPending} type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
