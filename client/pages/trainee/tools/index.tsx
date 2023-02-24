import Link from "next/dist/client/link";
import React from "react";

export default function ToolsIndex() {
  return (
    <div className="h-[89.8vh] flex justify-center bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm]">
      <div className="w-[78vw] m-auto text-m">
        <div className="flex justify-around ">
          <Link replace href="/trainee/tools/stop-watch">
            <div className="bg-[url('/bgs/tools/SW.webp')] h-[40vh] w-[20vw] bg-cover text-center rounded-md hover: transition duration-300 ease-in-out hover:scale-105">
              <div className="flex justify-center h-[40vh] items-center bg-slate-800/1 text-transparent hover:text-yellow-300 hover:bg-slate-800/90 rounded-md text-2xl font-bold">
                Stop Watch
              </div>
            </div>
          </Link>
          <Link replace href="/trainee/tools/calculator">
            <div className="bg-[url('/bgs/tools/CaC.jpg')] h-[40vh] w-[20vw] bg-cover text-center rounded-md hover: transition duration-300 ease-in-out hover:scale-105">
              <div className="flex justify-center h-[40vh] items-center bg-slate-800/1 text-transparent hover:text-yellow-300 hover:bg-slate-800/90 rounded-md text-2xl font-bold">
                Calories Calculator
              </div>
            </div>
          </Link>
          <Link
            replace
            href="/trainee/tools/fat-calculator"
          >
            <div className="bg-[url('/bgs/tools/FatC.jpg')] h-[40vh] w-[20vw] bg-cover text-center rounded-md hover: transition duration-300 ease-in-out hover:scale-105">
              <div className="flex justify-center h-[40vh] items-center bg-slate-800/1 text-transparent hover:text-yellow-300 hover:bg-slate-800/90 rounded-md text-2xl font-bold">
                Fat Calculator
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}