import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ExerciesResType } from "@/types/components/libraries";
import useParam1Store from "@/store/state-lb";

type Option = {
  value: string;
  label: string;
  subOptions: string[];
};

const options: Option[] = [
  {
    value: "target",
    label: "Target",
    subOptions: [
      "pectorals",
      "abs",
      "lats",
      "hamstrings",
      "triceps",
      "delts",
      "forearms",
      "calves",
      "cardiovascular system",
      "quads",
      "biceps",
      "upper back",
      "glutes",
      "traps",
      "spine",
    ],
  },
  {
    value: "bodyPart",
    label: "Body Part",
    subOptions: [
      "waist",
      "back",
      "chest",
      "upper legs",
      "upper arms",
      "shoulders",
      "lower arms",
      "lower legs",
      "cardio",
    ],
  },
  {
    value: "equipment",
    label: "Equipment",
    subOptions: [
      "body weight",
      "cable",
      "leverage machine",
      "assisted",
      "barbell",
      "medicine ball",
      "stability ball",
      "dumbbell",
      "ez barbell",
      "kettlebell",
      "weighted",
      "sled machine",
      "smith machine",
      "band",
    ],
  },
];

type ExerciseType = {
  name: string;
  id: number;
};

export default function ExercisesLibrary() {
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const { setFirstParam, setSecondParam, firstParam, secondParam } =
    useParam1Store();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>(
    []
  );

  const handleAddExercise = (ex: ExerciseType) => {
    setSelectedExercises([...selectedExercises, ex]);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);
    setSelectedSubOption("");
    setShowSubOptions(true);
  };

  const handleSubOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubOption(event.target.value);
  };

  const fetchData = async (
    firstParam: string,
    secondParam: string,
    page: number
  ) => {
    try {
      let url = "http://localhost:3001/activity?page=" + page;
      if (firstParam && secondParam) {
        url = `http://localhost:3001/activity/filter/${firstParam}/${secondParam}?page=${page}`;
      }
      const { data } = await axios(url);
      setRndExercises(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setFirstParam(selectedOption);
    setSecondParam(selectedSubOption);
    setCurrentPage(1);
    fetchData(selectedOption, selectedSubOption, currentPage);
  };

  useEffect(() => {
    fetchData(firstParam, secondParam, currentPage);
  }, [currentPage, firstParam, secondParam]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  console.log("soy Param1", firstParam);

  return (
    <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed  backdrop-blur-sm">
      <div className="h-auto pt-[72px]">
        <div className="mx-auto w-full flex justify-around px-36 py-8  bg-gray-800 bg-opacity-50">
          <div>
            <label className="pr-0" htmlFor="option-select">
              Select an option:
            </label>
            <select
              className="pl-0"
              id="option-select"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {showSubOptions && (
            <div>
              <label htmlFor="sub-option-select">Select a sub-option:</label>
              <select
                id="sub-option-select"
                value={selectedSubOption}
                onChange={handleSubOptionChange}
              >
                <option value="">Select a sub-option</option>
                {options
                  .find((option) => option.value === selectedOption)
                  ?.subOptions.map((subOption) => (
                    <option key={subOption} value={subOption}>
                      {subOption}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <button onClick={handleButtonClick}>Filter</button>
        </div>
        <div className="flex ">
          <p>Mis ejercicios:</p>
          <ul>
            {selectedExercises &&
              selectedExercises.map((ex) => <li key={ex.id}>{ex.name}</li>)}
          </ul>
        </div>

        <div className="flex justify-between items-center w-full py-[115px] px-36">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Anterior
          </button>
          <div className="text-xl font-bold">{currentPage}</div>
          <button
            onClick={nextPage}
            disabled={rndExercises.length === 0}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Siguiente
          </button>
        </div>
        <div className="flex flex-wrap gap-5">
          <ul className="grid grid-cols-4 mx-auto">
            {rndExercises.slice(0, 30).map((ex) => {
              return (
                <li className="w-auto rounded-lg p-4 m-5 bg-black">
                  <Link
                    href={"/trainer/exercise/" + ex.id}
                    replace
                    key={ex.id}
                    className="rounded-sm bg-slate-500"
                  >
                    <p>
                      {firstParam ? `${firstParam}:` : "Body Part:"}{" "}
                      {secondParam ? secondParam : ex.bodyPart}
                    </p>
                    <Image
                      className="filter invert"
                      src={ex.gifUrl}
                      alt=""
                      width={300}
                      height={300}
                    />
                    <p>Name: {ex.name}</p>
                  </Link>
                  <button onClick={() => handleAddExercise(ex)}>Add</button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between items-center w-full py-[115px] px-36">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Anterior
          </button>
          <div className="text-xl font-bold">{currentPage}</div>
          <button
            onClick={nextPage}
            disabled={rndExercises.length === 0}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
