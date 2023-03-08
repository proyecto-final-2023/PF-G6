import { getCookie } from "@/utils/cookieHandler";
import { ComponentType, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const WithPrivateRouter = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P & Props> => {
  const PrivateRouteWrapper = (props: P & Props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const key = getCookie("token");
      setUser(key);
    }, []);

    if (user ==="null") {
      return (
        <div className="flex flex-col h-[100vh] w-[100vw] justify-center">
          <h1 className="text-center">Oops! You must be logged in to see this page</h1>
        </div>
      );
    }

    return <Component {...props} />;
  };

  return PrivateRouteWrapper;
};

export default WithPrivateRouter;
