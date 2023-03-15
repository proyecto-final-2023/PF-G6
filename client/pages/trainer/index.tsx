import NavbarTrainer from "@/components/navbar/NavbarTrainer";
import ProgressBar from "@/components/Progressbar";
import TablePlans from "@/components/TablePlans";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import axios from "axios";
import CreatePlansTrainee from "@/components/CreatePlansTrainee";
import WithPrivateRouter from "@/components/WithPrivateRoute";
import { pl } from "date-fns/locale";

// {plans?.plantrainer?.name}
// {plans?.plantrainer?.category}
// {plans?.plantrainer?.cantTrainees}

// {plans?.startDate}
// {plans.finishDate}
// src={plans?.trainer?.logo}

type PlanTrainer = {
  name: string;
  category: string;
  cantTrainees: number;
  startDate: string;
  finishDate: string;
  trainer: {
    logo: string;
  };
  plantrainer: {
    name: string;
    category: string;
    cantTrainees: number;
  };
};

function PlanHelp(props: { plan: PlanTrainer }) {
  const { plan } = props;

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="flex items-center justify-center h-24 rounded bg-gray-800 ">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          {plan.plantrainer.name}
        </p>
      </div>
      <div className="flex items-center justify-center h-24 rounded bg-gray-800 ">
        <p className="text-2xl text-white dark:text-gray-500">
          {plan.plantrainer.category}
        </p>
      </div>
      <div className="flex items-center justify-center h-24 rounded bg-gray-800  ">
        <p className="text-2xl text-white dark:text-gray-500">
          CantTrainees:{plan.plantrainer.cantTrainees}
        </p>
      </div>
      <div className="flex items-center justify-center h-24 rounded bg-gray-800  ">
        <p className="text-2xl text-white dark:text-gray-500">
          {plan.startDate}
        </p>
      </div>
      <div className="flex items-center justify-center h-24 rounded bg-gray-800  ">
        <p className="text-2xl text-white dark:text-gray-500">
          {plan.finishDate}
        </p>
      </div>
      <div className="flex items-center justify-center h-24 rounded bg-gray-800 ">
        <img
          src={plan.trainer.logo}
          className="rounded-full"
          width={90}
          height={90}
          alt="#"
        />
      </div>
    </div>
  );
}

function Dashboard(): JSX.Element {
  const key = getCookie("token");

  const [plans, setPlans] = useState<PlanTrainer[]>([
    {
      name: "",
      category: "",
      cantTrainees: 0,
      startDate: "",
      finishDate: "",
      trainer: {
        logo: ""
      },
      plantrainer: {
        name: "",
        category: "",
        cantTrainees: 0
      }
    }
  ]);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key }
      })
      .then((data) => {
        setPlans([data.data.membership]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-between">
      <nav className="">
        <div className="p-3 bg-gray-800 flex-row">
          <NavbarTrainer />
        </div>
      </nav>

      <div className="flex bg-[url('/bgs/contact.jpg')] bg-no-repeat bg-cover pt-20 grow">
        <div className="p-4">
          {plans?.map((plan) => (
            <PlanHelp plan={plan} key={plan.name} />
          ))}

          <div className="flex items-center justify-center h-60 mb-4 rounded bg-gray-800 ">
            <div>
              <TablePlans />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex items-center justify-center rounded bg-gray-800 h-80">
              <div>
                <CreatePlansTrainee />
              </div>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-800 h-80">
              <div>
                <ProgressBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithPrivateRouter(Dashboard);
