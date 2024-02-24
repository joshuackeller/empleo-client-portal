import { headers } from "next/headers";

const getSlug = () => {
  const host = headers().get("x-forwarded-host");

  if (host) {
    const splitHost = host.split(".");
    if (splitHost.length > 0) {
      return splitHost[0];
    }
  }

  return null;
};

export default getSlug;
