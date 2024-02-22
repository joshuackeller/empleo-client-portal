import React from "react";
import useGetOrganization from "@/src/requests/organizations/useGetOrganization";
import { Button } from "@/src/components/shadcn/Button";
import { Separator } from "@/src/components/shadcn/Separator";
import { Layout } from "@/src/utilities/interfaces";
import LimitedListingCards from "@/src/components/tables/LimitedListingCards";

const HomePage = () => {
  const { data: organization } = useGetOrganization();
  const isLayoutOne = organization?.layout === Layout.one;
  const isLayoutTwo = organization?.layout === Layout.two;
  const isLayoutThree = organization?.layout === Layout.three;
  const isLayoutFour = organization?.layout === Layout.four;
  const isLayoutFive = organization?.layout === Layout.five;

  return (
    // Layout #1
    isLayoutOne ? (
      <div
        style={{
          backgroundColor: organization?.primaryColor || "",
          minHeight: "100vh",
        }}
      >
        <div className="flex justify-between items-center p-2">
          <img
            src={organization?.logo?.url}
            alt="Organization Logo"
            className="w-16 h-16"
          />
          <div>
            <a href="/" className="mr-4">
              <Button
                variant="outline"
                className="mr-4"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                About
              </Button>
            </a>
            <a href="/listings" className="mr-4">
              <Button
                variant="outline"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                Job Listings
              </Button>
            </a>
          </div>
        </div>

        <Separator
          className="w-full mb-2"
          style={{ backgroundColor: organization?.accentColor || "" }}
        />

        <div className="relative">
          <img
            src={organization?.banner?.url}
            alt="Organization Banner"
            className="w-full h-48 object-cover"
          />
          <header
            className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-white mx-auto`}
          >
            <h1>{organization?.title}</h1>
            <p style={{ marginTop: "4px" }}>{organization?.description}</p>
          </header>
        </div>

        <Separator
          className="w-full mt-2"
          style={{ backgroundColor: organization?.accentColor || "" }}
        />

        <main className="container mx-auto mt-4 text-center">
          <section>
            <h2 className={`text-2xl font-bold text-${organization?.bodyFont}`}>
              Current Job Openings
            </h2>
            <div className="text-left">
              <LimitedListingCards limit={2} />
            </div>
            <a href="/listings">
              <Button
                className="!mt-2"
                style={{ backgroundColor: organization?.secondaryColor || "" }}
                type="button"
              >
                View All Job Listings
              </Button>
            </a>
          </section>
        </main>
        <footer
          className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
        >
          <p className={`text-sm`}>
            &copy; {new Date().getFullYear()} {organization?.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    ) : // Layout #2
    isLayoutTwo ? (
      <div
        style={{
          backgroundColor: organization?.primaryColor || "",
          minHeight: "100vh",
        }}
      >
        <div>
          <div className="relative flex justify-between items-center p-2">
            <img
              src={organization?.logo?.url}
              alt="Organization Logo"
              className="w-16 h-16"
            />
            <div
              className="absolute inset-0 flex justify-center items-center"
              style={{ pointerEvents: "none" }}
            >
              <h1
                className={`text-${organization?.bodyFont}`}
                style={{ pointerEvents: "auto" }}
              >
                {organization?.title}
              </h1>
            </div>
            <div>
              <a href="/" className="mr-4">
                <Button
                  variant="outline"
                  className="mr-4"
                  style={{
                    borderColor: organization?.accentColor || undefined,
                  }}
                >
                  About
                </Button>
              </a>
              <a href="/listings" className="mr-4">
                <Button
                  variant="outline"
                  style={{
                    borderColor: organization?.accentColor || undefined,
                  }}
                >
                  Job Listings
                </Button>
              </a>
            </div>
          </div>
        </div>

        <Separator
          className="w-full mb-2"
          style={{ backgroundColor: organization?.accentColor || "" }}
        />

        <div className="relative">
          <img
            src={organization?.banner?.url}
            alt="Organization Banner"
            className="w-full h-48 object-cover"
          />
          <header
            className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-white mx-auto`}
          >
            <h4 style={{ marginTop: "4px" }}>{organization?.description}</h4>
          </header>
        </div>

        <Separator
          className="w-full mt-2"
          style={{ backgroundColor: organization?.accentColor || "" }}
        />

        <main className="container mx-auto mt-4 text-center">
          <section>
            <h2 className={`text-2xl font-bold text-${organization?.bodyFont}`}>
              Current Job Openings
            </h2>
            <div className="text-left">
              <LimitedListingCards limit={2} />
            </div>
            <a href="/listings">
              <Button
                className="!mt-2"
                style={{ backgroundColor: organization?.secondaryColor || "" }}
                type="button"
              >
                View All Job Listings
              </Button>
            </a>
          </section>
        </main>
        <footer
          className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
        >
          <p className={`text-sm`}>
            &copy; {new Date().getFullYear()} {organization?.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    ) : // Layout #3
    isLayoutThree ? (
      <div
        style={{
          backgroundColor: organization?.primaryColor || "",
          minHeight: "100vh",
        }}
      >
        <div className="flex justify-between items-center p-2">
          <img
            src={organization?.logo?.url}
            alt="Organization Logo"
            className="w-16 h-16"
          />
          <div>
            <a href="/" className="mr-4">
              <Button
                variant="outline"
                className="mr-4"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                About
              </Button>
            </a>
            <a href="/listings" className="mr-4">
              <Button
                variant="outline"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                Job Listings
              </Button>
            </a>
          </div>
        </div>

        <Separator
          className="w-full mb-2"
          style={{ backgroundColor: organization?.accentColor || "" }}
        />

        <header className="text-center">
          <h1 className="mb-0">{organization?.title}</h1>
          <p style={{ marginTop: "4px" }}>{organization?.description}</p>
        </header>

        <section className="flex flex-col items-center justify-center mt-16">
          <h2 className={`text-2xl font-bold text-${organization?.bodyFont}`}>
            Current Job Openings
          </h2>
          <div className="text-left w-5/6">
            <LimitedListingCards limit={2} />
          </div>
          <a href="/listings">
            <Button
              className="!mt-2"
              style={{ backgroundColor: organization?.secondaryColor || "" }}
              type="button"
            >
              View All Job Listings
            </Button>
          </a>
        </section>
        <footer
          className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
        >
          <p className={`text-sm`}>
            &copy; {new Date().getFullYear()} {organization?.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    ) : // Layout #4
    isLayoutFour ? (
      <div
        style={{
          backgroundColor: organization?.primaryColor || "",
          minHeight: "100vh",
        }}
      >
        <div className="flex justify-between items-center p-2">
          <img
            src={organization?.logo?.url}
            alt="Organization Logo"
            className="w-12 h-12"
          />
          <div>
            <a href="/" className="mr-4">
              <Button
                variant="outline"
                className="mr-4"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                About
              </Button>
            </a>
            <a href="/listings" className="mr-4">
              <Button
                variant="outline"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                Job Listings
              </Button>
            </a>
          </div>
        </div>

        <Separator
          className="w-full mb-2"
          style={{
            backgroundColor: organization?.accentColor || "",
          }}
        />

        <div className="relative">
          <img
            src={organization?.banner?.url}
            alt="Organization Banner"
            className="w-full h-48 object-cover"
          />
          <header
            className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center`}
            style={{ color: "black", margin: "auto" }}
          >
            <h1>{organization?.title}</h1>
          </header>
        </div>

        <Separator
          className="w-full mt-2"
          style={{
            backgroundColor: organization?.accentColor || "",
          }}
        />

        <main className="container mx-auto mt-1 text-center">
          <section>
            <p style={{ marginTop: "4px" }}>"{organization?.description}"</p>

            <h2
              className={`mt-10 text-2xl font-bold text-${organization?.bodyFont}`}
            >
              Current Job Openings
            </h2>
            <div className="text-left">
              <LimitedListingCards limit={2} />
            </div>
            <a href="/listings">
              <Button
                className="!mt-2"
                style={{
                  backgroundColor: organization?.secondaryColor || "",
                }}
                type="button"
              >
                View All Job Listings
              </Button>
            </a>
          </section>
        </main>
        <footer
          className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
        >
          <p className={`text-sm`}>
            &copy; {new Date().getFullYear()} {organization?.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    ) : // Layout #5
    isLayoutFive ? (
      <div
        style={{
          backgroundColor: organization?.primaryColor || "",
          minHeight: "100vh",
        }}
      >
        <div className="flex justify-between items-center p-2">
          <img
            src={organization?.logo?.url}
            alt="Organization Logo"
            className="w-12 h-12"
          />
          <div>
            <a href="/" className="mr-4">
              <Button
                variant="outline"
                className="mr-4"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                About
              </Button>
            </a>
            <a href="/listings" className="mr-4">
              <Button
                variant="outline"
                style={{ borderColor: organization?.accentColor || undefined }}
              >
                Job Listings
              </Button>
            </a>
          </div>
        </div>

        <Separator
          className="w-full mb-2"
          style={{
            backgroundColor: organization?.accentColor || "",
          }}
        />

        <header style={{ color: "white" }} className="text-center mb-8 mt-8">
          <h1 className="mb-0">{organization?.title}</h1>
          <p style={{ marginTop: "4px" }}>{organization?.description}</p>
        </header>

        <Separator
          className="w-full mb-2"
          style={{
            backgroundColor: organization?.accentColor || "",
          }}
        />

        <section className="flex flex-col items-center justify-center mt-4">
          <h2 className={`text-2xl font-bold text-${organization?.bodyFont}`}>
            Current Job Openings
          </h2>
          <div className="text-left w-5/6">
            <LimitedListingCards limit={2} />
          </div>
          <a href="/listings">
            <Button
              className="!mt-2"
              style={{
                backgroundColor: organization?.secondaryColor || "",
              }}
              type="button"
            >
              View All Job Listings
            </Button>
          </a>
        </section>
        <footer
          className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
        >
          <p className={`text-sm`}>
            &copy; {new Date().getFullYear()} {organization?.title}. All rights
            reserved.
          </p>
        </footer>
      </div>
    ) : null
  );
};

export default HomePage;
