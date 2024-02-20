const ApplicationQueryKeys = {
  all: ["applications"],
  single: (applicationId: string) => [
    ...ApplicationQueryKeys.all,
    applicationId,
  ],
  //   applications: (applicationId: string) => [
  //     ...ApplicationQueryKeys.single(applicationId),
  // "applications",
  //],
};

export default ApplicationQueryKeys;
