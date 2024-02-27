"use client";

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
import { RequestLink } from "@/src/requests/auth/useRequestLink";
import { CheckCircle2Icon, CircleDashedIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Turnstile from "react-turnstile";
import { useState } from "react";

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

  const pathname = usePathname();

  const [cloudflareToken, setCloudflareToken] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isPending) {
      setIsPending(true);
      try {
        await RequestLink({
          body: {
            ...values,
            cloudflareToken,
            returnRoute: pathname,
          },
        });
      } catch {
        setIsPending(false);
      }
      setIsSuccess(true);
      setIsPending(false);
    }
  };
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center mt-5">
        <CheckCircle2Icon className="h-6 w-6" />
        <div className="text-lg font-bold mt-1">Email Sent!</div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
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
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
          onVerify={(token: any) => {
            setCloudflareToken(token);
          }}
        />

        <div>
          <Button disabled={isPending} type="submit" className="w-full">
            Send Link
            {isPending && (
              <CircleDashedIcon className="h-4 w-4 animate-spin ml-2" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RequestLinkForm;
