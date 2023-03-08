import Link from "next/link";
import { useState } from "react";
import WithPrivateRouter from "@/components/WithPrivateRoute";




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

    setResult(Math.round(bodyFatPercentage));
  };
 

  return (
    <div className="h-[100vh] bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className="flex flex-col h-[100vh]">
        <div className="bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 w-[22rem] md:w-[30rem] p-14 md:p-24 m-auto text-m">
          <div className="text-center">
            <h1 className="text-4xl font-bold mt-4 text-center">
              Fat-Calculator
            </h1>
            <h2 className="text-2xl font-bold text-center">
              Enter your measures to calculate your fat percentage
            </h2>

            <div className="">
              <label className="text-xl">Neck circumference (cm): </label>
              <input
                className="w-[15vw] h-7 rounded-md"
                type="number"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                placeholder="Enter your neck circumference in cm"
              />
            </div>
            <div className="">
              <label className="text-xl">Waist circumference (cm): </label>
              <input
                className="w-[15vw] h-7 rounded-md"
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Enter your waist circumference in cm"
              />
            </div>
            <div className="">
              <label className="text-xl">Hip circumference (cm): </label>
              <input
                className="w-[15vw] h-7 rounded-md"
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="Enter yout hip circumference in cm"
              />
            </div>
            <div className="">
              <label className="text-xl">Height (cm): </label>
              <input
                className="w-[15vw] h-7 rounded-md "
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter your height in cm"
              />
            </div>

            <div>
              <label className="text-xl">Gender:</label>
              <select
                className="h-7 rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              className="text-xl hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300"
              onClick={calculate}
            >
              Calculate
            </button>
            <div className="text-xl">Result: {result} %</div>

            <Link
              href="/trainee/tool/tools"
              className="mb-4 inline-block px-6  font-medium text-xs leading-tight h-[20px] w-[115px] mx-auto uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out border text-center"
            >
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )}

  



export default WithPrivateRouter(CalculateFatPercentage)
