import React from "react";
import GraficUTT from "./GraficUTT";

function GrapContainer() {
  const label1="Usuarios";
  const scores1 = [500, 200, 300];
  const labels1 = ["Users", "Trainers", "Trainees"];
  const label2 = "Trainees"
  const scores2 = [30, 25, 17];
  const labels2 = ["Juan", "Pedro", "Terencio"];
  const label3 = "Membresia"
  const scores3 = [500, 400, 300];
  const labels3 = ["Gold", "Plate", "Bronce"];
  return (
    <div className="flex justify-between m-20">
      <GraficUTT scores={scores1}  labels={labels1} label={label1}/>
      <GraficUTT scores={scores2} labels={labels2} label={label2} />
      <GraficUTT scores={scores3} labels={labels3} label= {label3}/>
    </div>
  );
}

export default GrapContainer;
