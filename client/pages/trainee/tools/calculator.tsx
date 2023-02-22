import { useState } from "react";
import Link from "next/link";
import { GrClose } from "react-icons/gr";

export default function CalculateCalories() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [goal, setGoal] = useState("lose");
  const [result, setResult] = useState(0);

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

  return (
    <div className="h-[82.5vh] bg-[url('/bgs/imgCalculator.png')] bg-no-repeat bg-cover backdrop-blur-sm">
      <div className="bg-[#6f6f70]/80  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 w-[30vw] m-auto text-m">
    <div className="grid grid-cols-1 gap-1 justify-items-center h-[82.5vh] py-11">
      <h1 className="text-xl font-bold">Calories-Calculator</h1>
      <div>
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)
          }
          placeholder='Enter your age'
        />
      </div>
      <div>
        <label>Weight (kg):</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder='Enter your weight'
        />
      </div>
      <div>
        <label>Height (cm):</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder='Enter your height'
        />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Activity Level:</label>
        <select
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
        <label>Goal:</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="lose">Lose Weight</option>
          <option value="gain Weight">Gain Weight</option>
        </select>
      </div>
      <button onClick={calculate} className='text-lg border-4 w-96 h-10 rounded-md bg-slate-600'>Calculate</button>
      <div>Result: {result} calories/day</div>
      <Link replace href="/guest/trainning-list">
          <button type="button" className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">Volver</button>
      </Link>
    </div>
    </div>
    </div>
  );
}
