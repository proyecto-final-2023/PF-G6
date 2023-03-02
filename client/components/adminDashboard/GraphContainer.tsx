import React from "react";
import GraficUTT from "./GraficUTT";

function GraphContainer() {
  const label1 = "Usuarios";
  const scores1 = [500, 200, 300];
  const labels1 = ["Users", "Trainers", "Trainees"];
  const label2 = "Trainees";
  const scores2 = [30, 25, 17];
  const labels2 = ["Juan", "Pedro", "Terencio"];
  const label3 = "Membresia";
  const scores3 = [500, 400, 300];
  const labels3 = ["Gold", "Plate", "Bronce"];
  const title1= "hola 1";
  const title2= "hola 2";
  const title3= "hola 3";
  return (
    <div className="flex justify-center flex-wrap pt-20 gap-8">
      <GraficUTT scores={scores1} labels={labels1} label={label1} title={title1} />
      <GraficUTT scores={scores2} labels={labels2} label={label2} title={title2}/>
      <GraficUTT scores={scores3} labels={labels3} label={label3} title={title3}/>
    </div>
  );
}

export default GraphContainer;
