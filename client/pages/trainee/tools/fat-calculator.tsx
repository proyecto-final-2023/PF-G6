import Link from "next/link";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

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
        86.01 * Math.log10(+waist - +neck) -
        70.041 * Math.log10(+height) +
        36.76;
    } else {
      bodyFatPercentage =
        163.205 * Math.log10(+waist + +hip - +neck) -
        97.684 * Math.log10(+height) -
        78.387;
    }

    setResult(bodyFatPercentage);
    
  
    
  };

  return (
    <div className="h-[82.5vh] bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className="w-[32vw] m-auto">
       <div className="flex-col justify-items-center gap-1 w-full h- text-white m-2 bg-[#6f6f70]/80  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex dark:focus:ring-[#4285F4]/55 my-40 mx-auto">
      <h1 className="text-xl">Fat-Calculator</h1>
      <div>
        <label>Neck circumference (cm):</label>
        <input
          className="w-64"
          type="number"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          placeholder='Enter your neck circumference in cm'
        />
      </div>
      <div>
        <label>Waist circumference (cm):</label>
        <input
          className="w-64"
          type="number"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          placeholder='Enter your waist circumference in cm'
        />

      </div>
      <div>
        <label>Hip circumference (cm):</label>
        <input
          className="w-64"
          type="number"
          value={hip}
          onChange={(e) => setHip(e.target.value)}
          placeholder = 'Enter yout hip circumference in cm'
        />
     
      </div>
      <div>
        <label>Height (cm):</label>
        <input
          className="w-64"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder='Enter your height in cm'
        />
      </div>
      
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      
      </div>
      <button className="text-lg border-4 bg-slate-600 items-center" onClick={calculate}>Calculate</button>
      <div className="text-lg">Result: {result} %</div>
      <Link replace href="/guest/trainning-list">
          <button type="button" className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] mx-auto uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">Volver</button>
      </Link>
    
      
      
    </div>
    </div>
    </div>
   
  );
};

export default CalculateFatPercentage;
