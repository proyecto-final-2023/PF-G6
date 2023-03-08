import neck from "@/assets/imgMeasuresForm/neck.png";
import torso from "@/assets/imgMeasuresForm/torso.png";
import Image from "next/dist/client/image";
import chest from "@/assets/imgMeasuresForm/chest.png";
import waist from "@/assets/imgMeasuresForm/waist.png";
import arm from "@/assets/imgMeasuresForm/arm.png";
import wrist from "@/assets/imgMeasuresForm/wrist.png";
import hip from "@/assets/imgMeasuresForm/hip.png";
// import glutes from "@/assets/imgMeasuresForm/glutes.png";
// import thigh from "@/assets/imgMeasuresForm/thigh.png";
// import calf from "@/assets/imgMeasuresForm/calf.png";
// import { useState } from "react";
// import { AdditionalInfo } from "./health-data";
// import { SubmitHandler, useForm } from "react-hook-form";
// import NumberInput from "@/components/inputs/NumberInput";
// import TextInput from "@/components/inputs/TextInput";
// import CheckboxInput from "@/components/inputs/CheckboxInput";
// import axios from "axios";

// const bodyParts = [
//   { name: "neck", img: neck },
//   { name: "torso", img: torso },
//   { name: "chest", img: chest },
//   { name: "waist", img: waist },
//   { name: "arm", img: arm },
//   { name: "wrist", img: wrist },
//   { name: "hip", img: hip },
//   // { name: "glutes", img: glutes },
//   { name: "thigh", img: thigh },
//   { name: "calf", img: calf }
// ];

export default function Baka() {
  return(
    <div>Hola</div>
  )
}
//   const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
//   const [measurement, setMeasurement] = useState<number | null>(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     getValues,
//     formState: { errors }
//   } = useForm<AdditionalInfo>({
//     mode: "onChange",
//     defaultValues: {
//       weight: 0,
//       height: 0,
//       allergies: [],
//       surgeries: [],
//       smoking: false,
//       alcoholConsumption: false,
//       drugConsumption: false,
//       steroidConsumption: false,
//       waterConsumption: 0,
//       injuries: []
//     }
//   });

//   const onSubmit: SubmitHandler<AdditionalInfo> = async (data) => {
//     console.log("SUBMIT", data);
//   };

//   return (
//     <div className="bg-[url('/bgs/contact.jpg')] -z-10">
//       <div className="bg-[#6f6f70]/60 pt-20 px-[5vw] border-purple-400 border-8">
//         <h1 className="text-center text-2xl">Health Data Form</h1>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="border-red-800 border-4 flex flex-col justify-center"
//         >
//           <div className="wrap-per border-purple-500 border-4 flex flex-col-reverse md:flex-row gap-3">
//             <div className="border-green-500 border-2 flex-1 flex flex-col items-center">
//               <CheckboxInput
//                 {...{ register }}
//                 label="Smoking"
//                 name="smoking"
//                 options={{ required: false }}
//                 err={errors.smoking}
//               />

//               <CheckboxInput
//                 {...{ register }}
//                 label="Alcohol Consumption"
//                 name="alcoholConsumption"
//                 options={{ required: false }}
//                 err={errors.alcoholConsumption}
//               />

//               <NumberInput
//                 {...{ register }}
//                 label="Enter your Weight"
//                 name="weight"
//                 options={{ required: false }}
//                 err={errors.weight}
//               />

//               <NumberInput
//                 {...{ register }}
//                 label="Enter your Height"
//                 name="height"
//                 options={{ required: false }}
//                 err={errors.height}
//               />

//               <TextInput
//                 {...{ register }}
//                 label="Enter your Allergies"
//                 name="allergies"
//                 options={{ required: false }}
//                 err={errors.allergies}
//               />
//             </div>

//             <div className="border-green-500 border-2 flex-1 flex flex-col items-center">
//               <CheckboxInput
//                 {...{ register }}
//                 label="Drug Consumption"
//                 name="drugConsumption"
//                 options={{ required: false }}
//                 err={errors.drugConsumption}
//               />

//               <CheckboxInput
//                 {...{ register }}
//                 label="Steroid Consumption"
//                 name="steroidConsumption"
//                 options={{ required: false }}
//                 err={errors.steroidConsumption}
//               />

//               <NumberInput
//                 {...{ register }}
//                 label="Water Consumption"
//                 name="waterConsumption"
//                 options={{ required: false }}
//                 err={errors.waterConsumption}
//               />

//               <TextInput
//                 {...{ register }}
//                 label="Enter your Injuries"
//                 name="injuries"
//                 options={{ required: false }}
//                 err={errors.injuries}
//               />

//               <TextInput
//                 {...{ register }}
//                 label="Enter your Surgeries"
//                 name="surgeries"
//                 options={{ required: false }}
//                 err={errors.surgeries}
//               />
//             </div>
//             <div className="your-shitty-img-here bg-red-600/50 flex-1">uwu</div>
//           </div>

//           <button className="bg-red-600 p-2 rounded-md"> SUBMIT TO </button>
//         </form>
//       </div>
//     </div>
//   );
// }
