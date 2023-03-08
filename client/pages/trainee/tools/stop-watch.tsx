import React, { useState, useRef } from "react";
import WithPrivateRouter from "@/components/WithPrivateRoute";




type StoppedTimes = { time: number; timestamp: number };

function StopWatch() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stoppedTimes, setStoppedTimes] = useState<StoppedTimes[]>([]);
  const intervalRef = useRef<number>(0);

  function handleStart() {
    if (isRunning) return;

    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 100);
    }, 100);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setStoppedTimes((prevTimes) => [
      ...prevTimes,
      {
        time: timeElapsed,
        timestamp: Date.now(),
      },
    ]);
    setTimeElapsed(0);
    setIsRunning(false);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setIsRunning(false);
  }

  return (
    <div className="h-[89.8vh] flex justify-center bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className=" bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 w-[60rem] md:w-[30rem] m-auto text-m">
        <div className="grid grid-cols-1 gap-1 justify-items-center h-[70vh] py-11">
        <h1 className="text-center text-4xl font-bold" >Stop watch</h1>
      <p className="text-center text-xl">Time elapsed:
      </p>
        <div className="flex-col justify-self-center border-8 border-yellow-300 rounded-full h-60 w-60">
        <p className="font-crono self-center text-6xl text-center mt-20">
        
          {(timeElapsed / 1000)}
          <span className="text-2xl"> Sec</span>
        </p>
      
      
      </div>
      {!isRunning && timeElapsed === 0 && (
        <button onClick={handleStart} className=" hover:text-yellow-300 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300">Begin</button>
      )}
      {isRunning && <button onClick={handlePause} className=" hover:text-yellow-300 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300" >Pause</button>}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStart} className=" hover:text-yellow-300 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300">Continue</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStop} className=" hover:text-yellow-300 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300">Stop</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={() => setTimeElapsed(0)} className=" hover:text-yellow-300 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300">Reset</button>
      )}
      <h2 className="text-center">Times stopped:</h2>
      <div className="overflow-y-scroll h-20 w-40">
        {stoppedTimes.map((e) => (
          <li key={e.timestamp} className="text-center text-xl" >{e.time / 1000} Sec</li>
        ))}
      </div>

        </div> 
      </div>   
    </div>
  );
}

export default WithPrivateRouter(StopWatch)