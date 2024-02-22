import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import Head from "next/head";
import { cn } from "@/src/utilities/cn";
import { Toaster } from "@/src/components/shadcn/toaster";
import { GetOrganization } from "@/src/requests/organizations/useGetOrganization";
import AuthWrapper from "@/src/components/wrappers/AuthWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [organization, setOrganization] = useState<any>();
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (subdomain: string) => {
      try {
        const response = await GetOrganization({ slug: subdomain });

        setOrganization(response);
      } catch (error) {
        setSlug(undefined);
      }
    };

    if (typeof window !== "undefined") {
      const host = window.location.host;
      const domainParts = host.split(".");
      if (domainParts.length > 1) {
        fetchData(domainParts[0]);
        setSlug(domainParts[0]);
      }
    }
    setMounted(true);
  }, []);

  if (!slug && mounted) return <div>404 - Page not found</div>;

  return (
    <>
      <Head>
        <title>{organization?.title}</title>
      </Head>
      <main className={cn("font-sans", inter.variable)}>
        <QueryClientProvider client={queryClient}>
          <AuthWrapper>
            <Component {...pageProps} />
            <ReactQueryDevtools />
            <Toaster />
          </AuthWrapper>
        </QueryClientProvider>
      </main>
    </>
  );
}
