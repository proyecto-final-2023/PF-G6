import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import { useState } from "react";

/**
 * todo: list :D
 * handles backend call to fetch memberships
 * handles search (may add later)
 */
export default function MembershipsContainer() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <p></p>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
    </div>
  );
}
