import { useState,useReducer } from "react";
import axios from "axios";
import neck from "@/assets/imgMeasuresForm/neck.jpg";
import torso from "@/assets/imgMeasuresForm/torso.jpg";
import Image, { StaticImageData } from "next/dist/client/image"
import chest from "@/assets/imgMeasuresForm/chest.jpg";
import waist from "@/assets/imgMeasuresForm/waist.jpg";
import arm from "@/assets/imgMeasuresForm/arm.jpg";
import wrist from "@/assets/imgMeasuresForm/wrist.jpg";
import hip from "@/assets/imgMeasuresForm/hip.jpg";
// import glutes from "@/assets/imgMeasuresForm/glutes.jpg";
import thigh from "@/assets/imgMeasuresForm/thigh.jpg";
import calf from "@/assets/imgMeasuresForm/calf.jpg";

interface BodyMeasurement {
  bodyPart: string;
  measurement: number;
}

interface BodyPart {
  name: string;
  img: StaticImageData;
}

type BodyMeasurementsAction =
  | { type: "ADD_MEASUREMENT"; bodyPart: string; measurement: number };

// Define the reducer function to handle state updates
function bodyMeasurementsReducer(
  state: BodyMeasurement[],
  action: BodyMeasurementsAction
) {
  switch (action.type) {
    case "ADD_MEASUREMENT":
      const existingMeasurementIndex = state.findIndex(
        (measurement) => measurement.bodyPart === action.bodyPart
      );
      if (existingMeasurementIndex >= 0) {
        // If a measurement for this body part already exists, update it
        const updatedMeasurements = [...state];
        updatedMeasurements[existingMeasurementIndex] = {
          bodyPart: action.bodyPart,
          measurement: action.measurement,
        };
        return updatedMeasurements;
      } else {
        // If no measurement for this body part exists, add a new one
        const newBodyMeasurement = {
          bodyPart: action.bodyPart,
          measurement: action.measurement,
        };
        return [...state, newBodyMeasurement];
      }
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const BodyMeasurements = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [bodyMeasurements, dispatch] = useReducer(
    bodyMeasurementsReducer,
    [] as BodyMeasurement[]
  );

  const handleBodyPartClick = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
  };

  const handleMeasurementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMeasurement(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedBodyPart || measurement === null) {
      return;
    }

    dispatch({
      type: "ADD_MEASUREMENT",
      bodyPart: selectedBodyPart,
      measurement: measurement,
    });

    setSelectedBodyPart("");
    setMeasurement(null);
  };
  console.log(bodyMeasurements);
  const bodyParts: BodyPart[] = [
    { name: "neck", img: neck },
    { name: "torso", img: torso },
    { name: "chest", img: chest },
    { name: "waist", img: waist },
    { name: "arm", img: arm },
    { name: "wrist", img: wrist },
    { name: "hip", img: hip },
    // { name: "glutes", img: glutes },
    { name: "thigh", img: thigh },
    { name: "calf", img: calf },
  ];
  return (
    <div className="h-[100vh] mt-20 ">
      <h1 className="text-center">Body Measurements</h1>
      <div className="mt-2 flex   flex-wrap justify-center">
        {bodyParts.map((bodyPart) => (
          <button
            className="border-2 ml-2 p-2 rounded-lg bg-gray-800 border-white"
            key={bodyPart.name}
            onClick={() => handleBodyPartClick(bodyPart.name)}
          >
            {bodyPart.name}
          </button>
        ))}
      </div>
      {selectedBodyPart && (
        <form className="flex flex-col content-center" onSubmit={(event)=>handleSubmit(event)}>
          <label className="text-center mt-4">
            Measurement for {selectedBodyPart}:
            <input
              className="w-20"
              type="number"
              value={measurement || ""}
              onChange={(event)=>handleMeasurementChange(event)}
            />
          </label>
          <Image
            className="self-center w-[50vw]"
            src={bodyParts.find((b) => b.name === selectedBodyPart.toString())?.img || ""}
            alt={selectedBodyPart}
          />
          <button
            className="self-center border-2 ml-2 p-2 rounded-lg bg-gray-800 border-white w-fit "
            type="submit"
          >
            Save Measurement
          </button>
        </form>
      )}
</div>)}

export default BodyMeasurements