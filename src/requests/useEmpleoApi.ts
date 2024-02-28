import axios from "axios";
import { AUTH_TOKEN } from "../components/wrappers/RestrictedContentWrapper";

const useEmpleoApi = (slug?: string) => {
  let token;
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const domainParts = host.split(".");
    if (domainParts.length > 1) {
      slug = domainParts[0];
    }

    token = localStorage.getItem(AUTH_TOKEN);
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token || undefined,
      Organization: slug || undefined,
    },
  });

  return api;
};

export default useEmpleoApi;
