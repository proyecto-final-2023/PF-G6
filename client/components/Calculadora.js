import React, { useState } from "react";

const CalculateCalories = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [goal, setGoal] = useState("lose");
  const [result, setResult] = useState(0);

  const calculate = () => {
    let BMR = 0;

    if (gender === "male") {
      BMR = 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
    } else {
      BMR = 655 + 4.35 * weight + 4.7 * height - 4.7 * age;
    }

    let TDEE = BMR * parseFloat(activityLevel);

    if (goal === "lose") {
      TDEE -= 500;
    } else {
      TDEE += 500;
    }

    setResult(TDEE);
  };

  return (
    <div>
      <div>
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>Weight (kg):</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
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
      <button onClick={calculate}>Calculate</button>
      <div>
        Result: {result} calories/day
      </div>
    </div>
  );
};

export default CalculateCalories;


