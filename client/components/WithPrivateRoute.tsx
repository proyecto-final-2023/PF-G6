import { getCookie } from "@/utils/cookieHandler";
import { ComponentType } from "react";

interface Props {
  children: React.ReactNode;
}

const WithPrivateRouter = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P & Props> => {
  const PrivateRouteWrapper = (props: P & Props) => {
    const key = getCookie("token");

    if (!key) {
      return (
        <>
          <h1 className="h-[100vh] w-[100vw] z-40">Página prohibida</h1>
        </>
      );
    }

    return <Component {...props} />;
  };

  return PrivateRouteWrapper;
};

export default WithPrivateRouter;
