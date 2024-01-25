import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [organization, setOrganization] = useState<any>();
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (subdomain: string) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${subdomain}`,
        );

        setOrganization(response?.data);
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
    <div>
      <div>{organization?.title}</div>
    </div>
  );
}
