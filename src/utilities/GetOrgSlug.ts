import { headers } from "next/headers";

const GetOrgSlug = () => {
  const slug = headers().get("x-slug");
  if (slug) {
    return slug;
  }
};

export default GetOrgSlug;
