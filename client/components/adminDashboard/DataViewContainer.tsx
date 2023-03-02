import React from "react";
import DataView from "./DataView";
import { GiBanknote } from "react-icons/gi";
import { BiDollar } from "react-icons/bi";

const value: string = "100";

function DataViewContainer() {
  return (
    <div className="flex justify-around">
      <div className="flex-col justify-center border-8 rounded bg-slate-400 text-7xl w-1/6 h-48 mt-20">
        <div className="mx-auto">
        <GiBanknote />
        </div>
        <div>
        <DataView />
        </div>
      </div>
      <div className="border-8 rounded bg-slate-400 text-7xl w-1/6 h-48 mt-20 align-middle ">
        <GiBanknote />
        <DataView />
      </div>
      <div className="border-8 rounded bg-slate-400 text-7xl w-1/6 h-48 mt-20 align-middle ">
        <GiBanknote />
        <DataView />
      </div>
      <div className="border-8 rounded bg-slate-400 text-7xl w-1/6 h-48 mt-20 align-middle ">
        <GiBanknote />
        <DataView />
      </div>
    </div>
  );
}

export default DataViewContainer;
