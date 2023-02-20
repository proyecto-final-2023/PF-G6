// Libraries
import { useState, useRef } from "react";
// Types
// Components/Assets

type StoppedTimes = { time: number; timestamp: number };

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
    <div>
      <h1>Cronómetro</h1>
      <p>Tiempo transcurrido: {timeElapsed / 1000}Segundo</p>
      {!isRunning && timeElapsed === 0 && (
        <button onClick={handleStart}>Iniciar</button>
      )}
      {isRunning && <button onClick={handlePause}>Pausa</button>}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStart}>Continuar</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={handleStop}>Detener</button>
      )}
      {!isRunning && timeElapsed > 0 && (
        <button onClick={() => setTimeElapsed(0)}>Reiniciar</button>
      )}
      <h2>Tiempos detenidos:</h2>
      <ul>
        {stoppedTimes.map((e) => (
          <li key={e.timestamp}>{e.time / 1000} Segundo</li>
        ))}
      </ul>
    </div>
  );
}
