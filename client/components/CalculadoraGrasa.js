import React, { useState } from "react";

const CalculateFatPercentage = () => {
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(0);

  const calculate = () => {
    let bodyFatPercentage = 0;

    if (gender === "male") {
      bodyFatPercentage =
        86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bodyFatPercentage =
        163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    setResult(bodyFatPercentage);
  };

  return (
    <div>
      <div>
        <label>Neck circumference (cm):</label>
        <input
          type="text"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
        />
      </div>
      <div>
        <label>Waist circumference (cm):</label>
        <input
          type="text"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
        />
      </div>
      <div>
        <label>Hip circumference (cm):</label>
        <input type="text" value={hip} onChange={(e) => setHip(e.target.value)} />
      </div>
      <div>
        <label>Height (cm):</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button onClick={calculate}>Calculate</button>
      <div>
        Result: {result} %
      </div>
    </div>
  );
};

export default CalculateFatPercentage;
