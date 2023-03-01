import { User, UserDetails } from "@/types/components/dashboard";
import { useState } from "react";
import NavigationBtns from "../trainterLibraries/NavigationBtns";

export type UserContainerProps = {
  basicData: User;
  fullData: UserDetails;
};

export default function UserContainer(props: UserContainerProps[]) {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  return (
    <div>
      <NavigationBtns
        length={10}
        {...{ nextPage }}
        {...{ prevPage }}
        currentPage={page}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {/* HERE GOES THE MAP */}
      </div>
      <NavigationBtns
        length={10}
        {...{ nextPage }}
        {...{ prevPage }}
        currentPage={page}
      />
    </div>
  );
}
