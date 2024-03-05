import { headers } from "next/headers";

// Should only be used in server components

const GetOrgSlug = () => {
  const slug = headers().get("x-slug");
  if (slug) {
    return slug;
  }
};

export default GetOrgSlug;
