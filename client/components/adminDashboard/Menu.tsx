import React, { useState } from "react";
import NavigationBtns from "../trainterLibraries/NavigationBtns";
import PlansContainer from "./PlansContainer";
import UserContainer from "./UserContainer";

export default function Menu() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const someIf = true;

  return (
    <div>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      {someIf ? <PlansContainer /> : <UserContainer />}
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
    </div>
  );
}
