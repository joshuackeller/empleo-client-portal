import { PageComponent } from "@/pages/_app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "../shadcn/Skeleton";
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
import useAddApplication from "@/src/requests/applications/useAddApplication";
import { useToast } from "../shadcn/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

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
  usCitizen: z.boolean().optional(),
  usAuthorized: z.boolean().optional(),
  prevEmployee: z.boolean().optional(),
  nonCompete: z.boolean().optional(),
  olderThan18: z.boolean().optional(),
  race: z.string().optional(),
  hispanicOrLatino: z.boolean().optional(),
  veteranStatus: z.string().optional(),
  disabilityStatus: z.string().optional(),
  workVisa: z.boolean().optional(),
  languages: z.string().optional(),
  availableStartDate: z.string().optional(),
  note: z.string().optional(),
  relocate: z.boolean().optional(),
  userId: z.string().optional(),
  // resumeUrl: z.string().optional(),
  // coverLetterUrl: z.string().optional(),
});

const ApplicationForm: PageComponent = () => {
  const { mutate: addApplication, isPending } = useAddApplication();
  const [open, setOpen] = useState<boolean>(false);

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
      usCitizen: false,
      usAuthorized: false,
      prevEmployee: false,
      nonCompete: false,
      olderThan18: false,
      race: "",
      hispanicOrLatino: false,
      veteranStatus: "",
      disabilityStatus: "",
      workVisa: false,
      relocate: false,
      languages: "",
      availableStartDate: "",
      note: "",
      userId: "",
      // resumeUrl: "",
      // coverLetterUrl: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addApplication(
      { 
        body: {
          ...values,
          coverLetterUrl: "", // Add the coverLetterUrl property with an initial value
          olderThan18: values.olderThan18 || false, // Ensure olderThan18 is of type boolean
          usCitizen: values.usCitizen || false, // Ensure usCitizen is of type boolean
          usAuthorized: values.usAuthorized || false, // Ensure usAuthorized is of type boolean
          prevEmployee: values.prevEmployee || false, // Ensure prevEmployee is of type boolean
          nonCompete: values.nonCompete || false, // Ensure nonCompete is of type boolean
          hispanicOrLatino: values.hispanicOrLatino || false, // Ensure hispanicOrLatino is of type boolean
          workVisa: values.workVisa || false, // Ensure workVisa is of type boolean
          relocate: values.relocate || false, // Ensure relocate is of type boolean
          userId: values.userId || "", // Ensure userId is of type string
        }
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div>
          <h3>Application</h3>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usCitizen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>U.S Citizen?</FormLabel>
                      <FormControl>
                        <input type="checkbox" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-3">
                  <Button disabled={isPending} type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
