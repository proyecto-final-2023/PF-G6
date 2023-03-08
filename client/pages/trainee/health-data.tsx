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

export default function BodyMeasurements() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
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
    <div className="bg-[url('/bgs/contact.jpg')] -z-10">
      <div className="bg-[#6f6f70]/60 border-pink-400">
        <div className="border-white border-1">
          <h1 className="text-center">Health Data Form</h1>
          <div className="">
            <label>
              Weight:
              <input
                type="number"
                className=""
                value={additionalInfo.weight}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    weight: Number(e.target.value)
                  })
                }
              />
            </label>

            <label>
              Height:
              <input
                type="number"
                className=""
                value={additionalInfo.height}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    height: Number(e.target.value)
                  })
                }
              />
            </label>

            <label>
              Allergies:
              <input
                type="text"
                className=""
                value={additionalInfo.allergies.join(", ")}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    allergies: e.target.value.split(", ")
                  })
                }
              />
            </label>

            <label>
              Surgeries:
              <input
                type="text"
                className=""
                value={additionalInfo.surgeries.join(", ")}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    surgeries: e.target.value.split(", ")
                  })
                }
              />
            </label>

            <label>
              Smoking:
              <input
                type="checkbox"
                checked={additionalInfo.smoking}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    smoking: e.target.checked
                  })
                }
              />
            </label>

            <label>
              Alcohol Consumption:
              <input
                type="checkbox"
                checked={additionalInfo.alcoholConsumption}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    alcoholConsumption: e.target.checked
                  })
                }
              />
            </label>

            <label>
              Drug Consumption:
              <input
                type="checkbox"
                className=""
                checked={additionalInfo.drugConsumption}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    drugConsumption: e.target.checked
                  })
                }
              />
            </label>

            <label>
              Steroid Consumption:
              <input
                type="checkbox"
                className=" "
                checked={additionalInfo.steroidConsumption}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    steroidConsumption: e.target.checked
                  })
                }
              />
            </label>

            <label>
              Water Consumption (in litres):
              <input
                type="number"
                className=""
                value={additionalInfo.waterConsumption}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    waterConsumption: Number(e.target.value)
                  })
                }
              />
            </label>

            <label>
              Injuries:
              <input
                type="text"
                className=""
                value={additionalInfo.injuries.join(", ")}
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    injuries: e.target.value.split(", ")
                  })
                }
              />
            </label>
          </div>
          <div className="">
            <h1 className="">Body Measurements</h1>
            <div className="">
              {bodyParts.map((bodyPart) => (
                <button
                  className=""
                  key={bodyPart.name}
                  onClick={() => handleBodyPartClick(bodyPart.name)}
                >
                  {bodyPart.name}
                </button>
              ))}
            </div>
            {selectedBodyPart && (
              <form className="" onSubmit={(event) => handleSubmit(event)}>
                <label className="">
                  Measurement for {selectedBodyPart}:
                  <input
                    className=""
                    type="number"
                    value={measurement || ""}
                    onChange={(event) => handleMeasurementChange(event)}
                  />
                </label>

                <button className="bg-gray-800 border-white" type="submit">
                  Save Measurement
                </button>
                <div>
                  <button className="bg-gray-800 border-white" type="submit">
                    Submit Form
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#6f6f70]/60 -z-10">
        <Image
          className="h-[80vh] p-6"
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
