import React, { useState } from "react";
import NavigationBtns from "../trainterLibraries/NavigationBtns";
import PlansContainer from "./PlansContainer";
import UserContainer from "./UserContainer";

export default function GridContainer() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const someIf = true;

  return (
    <div className="w-4/5 mx-[10%]">
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <div className="my-6">
        {someIf ? (
          <div className="grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <PlansContainer />
          </div>
        ) : (
          <div className="grid gap-x-2 gap-y-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <UserContainer />
          </div>
        )}
        <NavigationBtns
          currentPage={page}
          {...{ nextPage }}
          {...{ prevPage }}
        />
      </div>
    </div>
  );
}
