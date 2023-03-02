import React from "react";
import DataView from "./DataView";
import { GiBanknote } from "react-icons/gi";
// import { BiDollar } from "react-icons/bi";

const value: string = "100";

function DataViewContainer() {
  return (
    <div className="flex justify-around">
      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center">
        <GiBanknote />
        <DataView />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center">
        <GiBanknote />
        <DataView />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center">
        <GiBanknote />
        <DataView />
      </div>

      <div className="bg-slate-400 text-7xl mt-20 w-1/5 flex flex-col justify-center items-center">
        <GiBanknote />
        <DataView />
      </div>
    </div>
  );
}

export default DataViewContainer;
