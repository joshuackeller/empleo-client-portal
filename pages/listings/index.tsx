import { PageComponent } from "../_app";
import { useState } from "react";
import ListingsCards from "@/src/components/tables/ListingsCards";

const ListingsPage: PageComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        <h2>Job Listings</h2>
        <ListingsCards />
      </div>
    </div>
  );
};

export default ListingsPage;
