import NavbarTrainer from "@/components/navbar/NavbarTrainer";
import ProgressBar from "@/components/Progressbar";
import TablePlans from "@/components/TablePlans";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import axios from "axios";
import CreatePlansTrainee from "@/components/CreatePlansTrainee";

type PlansDash = {
  startDate: string;
  finishDate: string;
  trainer: {
    logo: string;
  };
};

export default function Dashboard() {
  const key = getCookie("token");

  const [plans, setPlans] = useState<PlansDash>();
import Dashboard from '@/components/DashboardTrainer'
import WithPrivateRouter from '@/components/WithPrivateRoute';

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key }
      })
      .then((data) => {
        setPlans(data.data.membership);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <nav className=" grid grid-cols-2  absolute  w-90 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <NavbarTrainer />
        </div>
      </nav>

      <div className=" flex flex-col bg-black pt-20 h-screen m-auto sm:ml-64">
        <div className="p-4  ">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                {plans?.startDate}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                {plans?.finishDate}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <img
                src={plans?.trainer?.logo}
                className="rounded-full"
                width={90}
                height={90}
              />
            </div>
          </div>
          <div className="flex items-center justify-center h-60 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div>
              <TablePlans />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-80 dark:bg-gray-800">
              <div>
                <CreatePlansTrainee />
              </div>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-80 dark:bg-gray-800">
              <div>
                <ProgressBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WithPrivateRouter(index)