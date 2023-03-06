import { useState } from "react";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

export default function CalculateCalories() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [goal, setGoal] = useState("lose");
  const [result, setResult] = useState(0);
  const [user, setUser] = useAuthState(auth)

  const calculate = () => {
    // amountt of energy needed to survive (BMR)
    let BasalMetabR = 0;

    if (gender === "male") {
      BasalMetabR = 66 + 6.23 * +weight + 12.7 * +height - 6.8 * +age;
    } else {
      BasalMetabR = 655 + 4.35 * +weight + 4.7 * +height - 4.7 * +age;
    }

    // extra daily eenergy use (TDEE)
    let PlusEnergyEx = BasalMetabR * parseFloat(activityLevel);

    if (goal === "lose") {
      PlusEnergyEx -= 500;
    } else {
      PlusEnergyEx += 500;
    }

    setResult(PlusEnergyEx);
  };
  if (!user) {
    return(
    <div>
    <h1 className="flex flex-col justify-center text-xl text-center h-[100vh]">Ops!Debes iniciar sesión para ver esta página</h1>;
    </div>
  )}

  return (
    <div className="h-[89.8vh] flex justify-center bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className="bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 w-[30vw] m-auto text-m">
        <div className="grid grid-cols-1 gap-1 justify-items-center h-[70vh] py-11">
          <h1 className="text-4xl font-bold px-1">Calories-Calculator</h1>
          <h2 className="text-2xl font-bold px-1">Enter your data in the following formulary</h2>
          <div className="pl-16">
            <label className="text-xl">Age: </label>
            <input
              className="rounded-md"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="text-xl">Weight (kg): </label>
            <input
              className="rounded-md"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>
          <div>
            <label className="text-xl">Height (cm): </label>
            <input
              className="rounded-md"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
            />
          </div>
          <div>
            <label className="text-xl">Gender: </label>
            <select
              className="rounded-md"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="text-xl">Activity Level: </label>
            <select
              className="rounded-md"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="1.2">Sedentary</option>
              <option value="1.375">Lightly Active</option>
              <option value="1.55">Moderately Active</option>
              <option value="1.725">Very Active</option>
              <option value="1.9">Extremely Active</option>
            </select>
          </div>
          <div>
            <label className="rounded-md text-xl">Goal: </label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="lose">Lose Weight</option>
              <option value="gain Weight">Gain Weight</option>
            </select>
          </div>
          <button
            onClick={calculate}
            className="text-lg hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300"
          >
            Calculate
          </button>
          <div className="text-2xl">Result: {result} calories/day</div>
          <Link
            href="/trainee/tool/tools"
            className="inline-block px-6  font-medium text-xs text-center leading-tight h-[20px] w-[115px] mx-auto uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out border"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
