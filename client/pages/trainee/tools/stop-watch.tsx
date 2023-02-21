import React, { useState, useRef } from "react";

type StoppedTimes = { time: number; timestamp: number };

export default function StopWatch() {
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
    <div className="flex justify-center items-center h-[82.5vh]">
      <div className="flex flex-col w-[20vw] h-[82.5vh] items-center mx-auto my-auto">
        <div className="border border-amber-700 w-full h-[25vh] my-auto py-10">
        <h1 className="text-center" >Cronómetro</h1>
      <p className="text-center">Tiempo transcurrido: {timeElapsed / 1000}Segundo</p>
      {!isRunning && timeElapsed === 0 && (
        <button onClick={handleStart} className="items-center block mx-auto">Iniciar</button>
      )}
      {isRunning && <button onClick={handlePause} className="items-center block mx-auto" >Pausa</button>}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStart} className="items-center block mx-auto">Continuar</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStop} className="items-center block mx-auto">Detener</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={() => setTimeElapsed(0)} className="items-center block mx-auto">Reiniciar</button>
      )}
      <h2 className="text-center">Tiempos detenidos:</h2>
      <ul>
        {stoppedTimes.map((e) => (
          <li key={e.timestamp} className="text-center" >{e.time / 1000} Segundo</li>
        ))}
      </ul>

        </div> 
      </div>   
    </div>
  );
}
