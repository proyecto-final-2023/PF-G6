// import dynamic from "next/dynamic";
// // Dynamic imports for icons & disabled SSR, dunno
// const FaUserAlt = dynamic(
//   () => import("react-icons/fa").then((mod) => mod.FaUserAlt),
//   { ssr: false }
// );

import { useState, useEffect } from "react";
import axios from "axios";
import DataView from "./DataView";
// please dont break T.T
import { GiBanknote, GiBank } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";

interface AxiosData {
  data: Data;
}

interface MembershipCounts {
  countMerbership: number;
  countTraineeMembership: {
    [key: string]: number;
  };
  countTrainerMembership: {
    [key: string]: number;
  };
}

interface BestPlans {
  Trainer: {
    id_planTrainer: string;
    name: string;
    cost: string;
    category: string;
    description: string;
    cantTrainees: string;
  };
  Trainee: any[]; // Array of Trainee plans
}

interface Data {
  money: {
    moneyTotal: number;
    moneyMes: number;
  };
  user: {
    cantUser: number;
    cantTrainer: number;
    cantTrainee: number;
  };
  membership: MembershipCounts;
  bestPlans: BestPlans;
}

function DataViewContainer() {
  const [dataset, setDataset] = useState<Data>();

  useEffect(() => {
    axios("https://fp-server-cg2b.onrender.com/data")
      .then((res: AxiosData) => setDataset(res.data))
      .catch((err) => console.log(err));
  }, []);

  let money1 = dataset?.money?.moneyTotal || 0;
  let moneyMes = dataset?.money?.moneyMes || 0;

  return (
    <div className="flex justify-around">
      <div
        className={
          "bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white cursor-default"
        }
      >
        <GiBank />
        <DataView money={money1} title={"Bank"} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white cursor-default">
        <GiBanknote />
        <DataView title={"Month"} money={moneyMes} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <HiUserGroup />
        <DataView title={"Active Trainers"} money={dataset?.user?.cantTrainer ?? 0} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <FaUserAlt />
        <DataView title={"Active Trainee"} money={dataset?.user?.cantTrainee ?? 0} />
      </div>
    </div>
  );
}

export default DataViewContainer;
