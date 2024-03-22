import "@/styles/globals.css";
import { GetOrganization } from "@/src/requests/organizations/GetOrganization";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { buttonVariants } from "@/src/components/shadcn/Button";
import GetOrgSlug from "@/src/utilities/GetOrgSlug";
import { ReactNode } from "react";
import { Toaster } from "@/src/components/shadcn/toaster";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const slug = GetOrgSlug();
  if (!slug) {
    throw Error("Not Found");
  }

  const organization = await GetOrganization({ slug });
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{organization?.title}</title>
        <meta
          name="description"
          content={
            organization?.description
              ? organization.description
              : "Job Listings Website"
          }
        />
        <style>
          {`
            .org-primary {
             background-color: ${organization.primaryColor};
            }
            .org-secondary {
            background-color: ${organization.secondaryColor};
            }
            .radial-gradient-primary {
              background: linear-gradient(243.35deg, ${organization.primaryColor} 32.29%, ${organization.accentColor} 47.31%, ${organization.primaryColor} 75.34%);
              opacity: 0.12;
              filter: blur(128px);
            }
            .radial-gradient-accent {
              background: linear-gradient(243.35deg, ${organization.accentColor} 32.29%, ${organization.primaryColor} 47.31%, ${organization.accentColor} 75.34%);
              opacity: 0.12;
              filter: blur(128px);
            }
            `}
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Patua+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="py-2 px-5 min-h-screen flex flex-col justify-between !m-0">
        <main className="max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <Link href="/">
              {organization?.logo?.url ? (
                <Image
                  src={organization?.logo?.url}
                  height={50}
                  width={50}
                  alt={organization?.title || "Organization Logo"}
                  className="object-contain"
                />
              ) : (
                <div className="font-black text-lg ">{organization?.title}</div>
              )}
            </Link>
            <div className="flex gap-x-5">
              <Link
                href="/listings"
                className={cn("!p-0", buttonVariants({ variant: "link" }))}
              >
                Jobs
              </Link>
              <Link
                href="/applications"
                className={cn("!p-0", buttonVariants({ variant: "link" }))}
              >
                My Applications
              </Link>
            </div>
          </div>
          {children}
          <Toaster />
        </main>
        <footer className="flex justify-between items-center mt-20 mb-5 max-w-4xl mx-auto w-full">
          <div className="text-sm font-semibold">
            &copy; {new Date().getFullYear()} {organization.title}. All rights
            reserved.
          </div>
          <Link
            href="/applications"
            className={cn("!p-0", buttonVariants({ variant: "link" }))}
          >
            My Applications
          </Link>
        </footer>
      </body>
    </html>
  );
}
