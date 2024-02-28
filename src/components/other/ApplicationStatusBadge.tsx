import { cn } from "@/src/utilities/cn";
import { Status } from "@/src/utilities/interfaces";

interface ApplicationStatusBadgeProps {
  status?: Status;
}

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  const baseStatusClass = "rounded py-0.5 px-2 text-xs";
  const getStatus = () => {
    switch (status) {
      case "new":
        return (
          <p className={cn(baseStatusClass, "bg-gray-100 text-gray-800")}>
            Pending Review
          </p>
        );
      case "in_review":
        return (
          <p className={cn(baseStatusClass, "bg-blue-100 text-blue-800")}>
            In Review
          </p>
        );
      case "rejected":
        return (
          <p className={cn(baseStatusClass, "bg-red-100 text-red-800")}>
            Not Selected
          </p>
        );
      case "interview":
        return (
          <p className={cn(baseStatusClass, "bg-purple-100 text-purple-800")}>
            Interview
          </p>
        );
      case "offer_pending":
        return (
          <p className={cn(baseStatusClass, "bg-blue-800 text-gray-100")}>
            Offer Pending
          </p>
        );
      case "offer_accepted":
        return (
          <p className={cn(baseStatusClass, "bg-green-100 text-green-800")}>
            Offer Accepted
          </p>
        );
      case "offer_rejected":
        return (
          <p className={cn(baseStatusClass, "bg-gray-100 text-gray-800")}>
            Offer Rejected
          </p>
        );
      default:
        return (
          <p className={cn(baseStatusClass, "bg-gray-100 text-gray-800")}>
            Unknown
          </p>
        );
    }
  };

  return <div>{getStatus()}</div>;
};

export default ApplicationStatusBadge;
