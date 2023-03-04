import React from "react";
import DataView from "./DataView";
import { GiBanknote } from "react-icons/gi";
// import { BiDollar } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";

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
  };
  user: {
    countUser: number;
    countTrainer: number;
    countTrainee: number;
  };
  membership: MembershipCounts;
  bestPlans: BestPlans;
}

const value: string = "100";

const divStyle =
  "bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white cursor-default";

function DataViewContainer() {
  const [dataset, setDataset] = useState<Data>();

  useEffect(() => {
    axios("https://fp-server-cg2b.onrender.com/data")
      .then((res: AxiosData) => setDataset(res.data))
      .catch((err) => console.log(err));
  }, []);

  let money1 = dataset?.money?.moneyTotal || 0;

  return (
    <div className="flex justify-around">
      <div className={divStyle}>
        <GiBanknote />
        <DataView money={money1} title={"Bank"} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white cursor-default">
        <GiBanknote />
        <DataView />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <GiBanknote />
        <DataView />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <GiBanknote />
        <DataView />
      </div>
    </div>
  );
}

export default DataViewContainer;
