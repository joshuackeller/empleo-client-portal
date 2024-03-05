// Should only be used in client components

const useGetOrgSlug = () => {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const domainParts = host.split(".");
    if (domainParts.length > 1) {
      return domainParts[0];
    }
  }
  return "";
};

export default useGetOrgSlug;
