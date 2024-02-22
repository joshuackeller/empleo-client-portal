import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import useRequestLink from "@/src/requests/auth/useRequestLink";
import { CheckCircle2Icon, CircleDashedIcon } from "lucide-react";
import { useRouter } from "next/router";

const formSchema = z.object({
  email: z.string(),
});

const RequestLinkForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: requestLink, isPending, isSuccess } = useRequestLink();

  const { asPath } = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!isPending) {
      requestLink({
        body: {
          ...values,
          returnRoute: asPath,
        },
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center">
        <CheckCircle2Icon className="h-6 w-6" />
        <div className="text-lg font-bold mt-1">Email Sent!</div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="bob@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button disabled={isPending} type="submit" className="w-full">
            Send Link
            {isPending && (
              <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RequestLinkForm;
