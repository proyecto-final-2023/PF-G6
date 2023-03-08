import { useState, useReducer } from "react";
import neck from "@/assets/imgMeasuresForm/neck.png";
import torso from "@/assets/imgMeasuresForm/torso.png";
import Image, { StaticImageData } from "next/dist/client/image";
import chest from "@/assets/imgMeasuresForm/chest.png";
import waist from "@/assets/imgMeasuresForm/waist.png";
import arm from "@/assets/imgMeasuresForm/arm.png";
import wrist from "@/assets/imgMeasuresForm/wrist.png";
import hip from "@/assets/imgMeasuresForm/hip.png";
// import glutes from "@/assets/imgMeasuresForm/glutes.png";
import thigh from "@/assets/imgMeasuresForm/thigh.png";
import calf from "@/assets/imgMeasuresForm/calf.png";
import fondo from "/public/bgs/contact.jpg";

interface BodyMeasurement {
  bodyPart: string;
  measurement: number;
}

interface BodyPart {
  name: string;
  img: StaticImageData;
}

type BodyMeasurementsAction = {
  type: "ADD_MEASUREMENT";
  bodyPart: string;
  measurement: number;
};

export type AdditionalInfo = {
  weight: number;
  height: number;
  allergies: string[];
  surgeries: string[];
  smoking: boolean;
  alcoholConsumption: boolean;
  drugConsumption: boolean;
  steroidConsumption: boolean;
  waterConsumption: number;
  injuries: string[];
};

// Define the reducer function to handle state updates
function bodyMeasurementsReducer(
  state: BodyMeasurement[],
  action: BodyMeasurementsAction
) {
  const options = "ADD_MEASUREMENT";

  switch (options) {
    case "ADD_MEASUREMENT":
      const existingMeasurementIndex = state.findIndex(
        (measurement) => measurement.bodyPart === action.bodyPart
      );
      if (existingMeasurementIndex >= 0) {
        // If a measurement for this body part already exists, update it
        const updatedMeasurements = [...state];
        updatedMeasurements[existingMeasurementIndex] = {
          bodyPart: action.bodyPart,
          measurement: action.measurement
        };
        return updatedMeasurements;
      } else {
        // If no measurement for this body part exists, add a new one
        const newBodyMeasurement = {
          bodyPart: action.bodyPart,
          measurement: action.measurement
        };
        return [...state, newBodyMeasurement];
      }
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export const BodyMeasurements = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<any>("");
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [bodyMeasurements, dispatch] = useReducer(
    bodyMeasurementsReducer,
    [] as BodyMeasurement[]
  );
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    weight: 0,
    height: 0,
    allergies: [],
    surgeries: [],
    smoking: false,
    alcoholConsumption: false,
    drugConsumption: false,
    steroidConsumption: false,
    waterConsumption: 0,
    injuries: []
  });

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
      measurement: measurement
    });

    setSelectedBodyPart("");
    setMeasurement(null);
  };
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
    { name: "calf", img: calf }
  ];
  return (
    <div className="grid grid-cols-2 bg-[url('/bgs/contact.jpg')]">
    <div className="h-[100vh] pt-20 max-sm:pt-0 text-white leading-10">
      <div className="py-10 ml-5 max-sm:py-0  max-sm:w-[55vw] mt-10 w-[48vw] -z-10 h-[80-vh] bg-slate-800 opacity-80 ">
      <h1 className="text-center z-30 font-bold">Health Data Form</h1>
      <div className="flex flex-col px-[5vw]">
        <div className="flex flex-row">
<label className="flex flex-row items-center">
  Weight:
  <input type="number" 
  className="ml-2 h-[3vh] w-[4ch]"
  value={additionalInfo.weight} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, weight: Number(e.target.value)})} />
</label>

<label className="ml-2 flex flex-row items-center">
  Height:
  <input type="number" 
  className="ml-2 h-[3vh] w-[4ch]"
  value={additionalInfo.height} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, height: Number(e.target.value)})} />
</label>
</div>
<div className="flex flex-col">
<label className="flex flex-row items-center">
  Allergies:
  <input type="text" 
  className="ml-2 h-[3vh] w-[20vw]"
  value={additionalInfo.allergies.join(", ")} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, allergies: e.target.value.split(", ")})} />
</label>

<label className="flex flex-row items-center">
  Injuries:
  <input type="text" 
  className="ml-2 h-[3vh] w-[20vw]"
  value={additionalInfo.injuries.join(", ")} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, injuries: e.target.value.split(", ")})} />
</label>

<label className="flex flex-row items-center">
  Surgeries:
  <input type="text" 
  className="ml-2 h-[3vh] w-[20vw]"
  value={additionalInfo.surgeries.join(", ")} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, surgeries: e.target.value.split(", ")})} />
</label>
</div>
<div className="flex flex-row max-sm:flex-col">
<h1 className="font-bold">Consumption: </h1>
<label className="ml-1 flex flex-row w-[8vw]">
  Smoking:
  <input type="checkbox" 
  className="ml-1 w-[2ch]"
  checked={additionalInfo.smoking} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, smoking: e.target.checked})} />
</label>

<label className="ml-1 flex flex-row w-[8vw]">
  Alcohol:
  <input type="checkbox" 
   className="ml-1 w-[2ch]"
  checked={additionalInfo.alcoholConsumption} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, alcoholConsumption: e.target.checked})} />
</label>

<label className="ml-1 flex flex-row w-[8vw]">
  Drugs:
  <input type="checkbox" 
   className="ml-1 w-[2ch]"
  checked={additionalInfo.drugConsumption} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, drugConsumption: e.target.checked})} />
</label>

<label className="ml-1 flex flex-row w-[8vw]">
  Steroids:
  <input type="checkbox" 
  className="ml-1 w-[2ch]"
  checked={additionalInfo.steroidConsumption} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, steroidConsumption: e.target.checked})} />
</label>
</div>

<label className="flex flex-row items-center">
  Water (in liters):
  <input type="number" 
  className="ml-1 h-[3vh] w-[4ch]"
  value={additionalInfo.waterConsumption} 
  onChange={(e) => setAdditionalInfo({...additionalInfo, waterConsumption: Number(e.target.value)})} />
</label>


</div>
      <div className="flex flex-col pl-[4.8vw]">
      <h1 className="font-bold text-left">Body Measurements</h1>
      <div className="mt-2 flex   flex-wrap ">
        {bodyParts.map((bodyPart) => (
          <button
            className="h-[5vh] justify-evenly border-2 ml-2  px-2 rounded-lg bg-gray-800 border-white"
            key={bodyPart.name}
            onClick={() => handleBodyPartClick(bodyPart.name)}
          >
            {bodyPart.name}
          </button>
        ))}
      </div>
      {selectedBodyPart && (
        <form
          className="flex flex-col"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div>
          <label className=" h-[5vh]">
            Measurement for {selectedBodyPart}:
            <input
              className="ml-1 h-[3vh] w-[5ch]"
              type="number"
              value={measurement || ""}
              onChange={(event) => handleMeasurementChange(event)}
            />
          </label>
         
          <button
            className="self-start text-xs justify-start border-2 ml-2 p-1 rounded-lg bg-gray-800 border-white w-fit "
            type="submit"
          >
            Save Measurement
          </button>
          </div>
          <div>
            <div className="flex flex-row items-center h-[15vh] justify-center">
           <button
            className=" border-2 -ml-[8vw] p-1 rounded-lg bg-gray-800 border-white w-fit "
            type="submit"
          >
            Submit Form
          </button>
          </div>
          </div>
        </form>
      )}
      </div>
    </div>
    </div>
      <div className="flex flex-row pt-[8vh] justify-center">
      <Image
        className=" ml-4 self-center  md:h-[80vh] w-[auto] max-sm:h-[40vh]"
        src={
          bodyParts.find((b) => b.name === selectedBodyPart.toString())
            ?.img || ""
        }
        alt={selectedBodyPart}
      />
      </div>
    </div>
  );
}
