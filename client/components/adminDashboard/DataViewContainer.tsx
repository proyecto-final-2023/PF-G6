import React from "react";
import DataView from "./DataView";
import { GiBanknote, GiBank } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";

import axios from "axios";
import { useState, useEffect } from "react";

interface AxiosData {
  data: Data;
}

interface MembershipCounts {
  countMerbership: number;
  countsTrainee: {
    [key: string]: number;
  };
  countsTrainer: {
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
    moneyMes:number;
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
  let moneyMes = dataset?.money?.moneyMes || 0;
  let activeTrainers:number[] = Object.values(dataset?.membership?.countsTrainer || {});
  let sum:number=0;
  if(activeTrainers.length){
    sum= activeTrainers?.reduce((anterior, siguiente)=> anterior + siguiente);
  }
  let activeTrainees:number[] = Object.values(dataset?.membership?.countsTrainee || {});
  let sum2:number=0;
  if(activeTrainers.length){
    sum2= activeTrainees?.reduce((anterior, siguiente)=> anterior + siguiente);
  }
  

  return (
    <div className="flex justify-around">
      <div className={divStyle}>
        <GiBank />
        <DataView money={money1} title={"Bank"} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white cursor-default">
        <GiBanknote />
        <DataView money={moneyMes} title={"Month"}  />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <HiUserGroup />
        <DataView money={sum} title={"Active Trainers"} />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center rounded border-2 border-white">
        <FaUserAlt />
        <DataView money={sum2} title={"Active Trainee"}/>
      </div>
    </div>
  );
}

export default DataViewContainer;
