import { buttonVariants } from "@/src/components/shadcn/Button";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="text-center my-10">
      <div>
        <h2>Not Found</h2>
        <p className="!-mt-2">Could not find requested resource</p>
      </div>
      <div className="mt-5">
        <Link href="/" className={cn(buttonVariants())}>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
