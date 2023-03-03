import React, { useEffect, useState } from "react";
import GraficUTT from "./GraficUTT";
import GraficBar from "./GraficBar";
import axios from "axios";

interface Data {
  user: {
    countUser: number;
    countTrainer: number;
    countTrainee: number;
  };
  membership: {
    countMerbership: number;
    countTraineeMembership: Record<string, number>;
    countTrainerMembership: Record<string, number>;
  };
  bestPlans: {
    Trainer: {
      id_planTrainer: string;
      name: string;
      cost: string;
      category: string;
      description: string;
      cantTrainees: string;
    };
    Trainee: any[];
  };
}

interface AxiosData {
  data: Data;
}

function GraphContainer() {
  const [dataset, setDataset] = useState<Data>();

  useEffect(() => {
    axios("https://fp-server-cg2b.onrender.com/data")
      .then((res: AxiosData) => setDataset(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(dataset?.membership.countTrainerMembership);
  //---------------------------------------------------------------------------------------------
  const label1 = "User";
  let scores1:any = [];
  if (scores1.every(Boolean))
    scores1 = [
      dataset?.user.countUser,
      dataset?.user.countTrainer,
      dataset?.user.countTrainee,
    ];
  else scores1 = [1];
  const labels1 = ["Users", "Trainers", "Trainees"];

  //-----------------------------------------------------------------------------------------------
  
  const result = dataset?.membership?.countTrainerMembership;
  let labels2: string[] = [];
  if (result) labels2 = Object.keys(result);
  else labels2 = ["Waiting data"];
  let scores2:number[] = [];
  if(result) scores2= Object.values(result);
  else scores2=[0];
  const label2:string = "Trainers";
  //---------------------------------------------------------
  const label3 = "Membresia";
  const scores3 = [500, 400, 300];
  const labels3 = ["Gold", "Plate", "Bronce"];
  const title1 = "Cantidad de usuarios Trainer/Trainees";
  const title2 = "hola 2";
  const title3 = "hola 3";

  return (
    <div className="flex justify-around flex-wrap pt-20 gap-8">
      <GraficBar
        scores={scores1}
        labels={labels1}
        label={label1}
        title={title1}
      />
      <GraficUTT
        scores={scores2}
        labels={labels2}
        label={label2}
        title={title2}
      />
      <GraficUTT
        scores={scores3}
        labels={labels3}
        label={label3}
        title={title3}
      />
    </div>
  );
}

export default GraphContainer;
