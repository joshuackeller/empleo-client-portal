import axios from "axios";

const useEmpleoApi = () => {
  let slug;

  if (typeof window !== "undefined") {
    const host = window.location.host;
    const domainParts = host.split(".");
    if (domainParts.length > 1) {
      slug = domainParts[0];
    }
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Organization: slug || undefined,
    },
  });

  return api;
};

export default useEmpleoApi;
