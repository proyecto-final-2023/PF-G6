import React, { useState, useRef } from "react";

function Chronometer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [stoppedTimes, setStoppedTimes] = useState([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStoppedTimes((prevTimes) => [
      ...prevTimes,
      {
        time: timeElapsed,
        timestamp: Date.now(),
      },
    ]);
    setTimeElapsed(0);
    setRunning(false);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  }

  return (
    <div>
      <h1>Cronómetro</h1>
      <p>Tiempo transcurrido: {timeElapsed / 1000}Segundo</p>
      {!running && timeElapsed === 0 && (
        <button onClick={handleStart}>Iniciar</button>
      )}
      {running && <button onClick={handlePause}>Pausa</button>}
      {!running && timeElapsed > 0 && (
        <button onClick={handleStart}>Continuar</button>
      )}
      {!running && timeElapsed > 0 && (
        <button onClick={handleStop}>Detener</button>
      )}
      {!running && timeElapsed > 0 && (
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

export default Chronometer;
