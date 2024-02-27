import "@/styles/globals.css";
import { GetOrganization } from "@/src/requests/organizations/useGetOrganization";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { buttonVariants } from "@/src/components/shadcn/Button";
import GetOrgSlug from "@/src/utilities/GetOrgSlug";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      </head>
      <body className="max-w-4xl mx-auto py-2 px-5 min-h-screen flex flex-col justify-between">
        <main>
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
            <div className="flex">
              <Link
                href="/listings"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                Jobs
              </Link>
              <Link
                href="/applications"
                className={cn("!pr-0", buttonVariants({ variant: "link" }))}
              >
                My Applications
              </Link>
            </div>
          </div>
          {children}
        </main>
        <footer className="flex justify-between items-center mt-20 mb-5">
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
