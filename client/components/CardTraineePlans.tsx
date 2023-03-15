import { useState } from "react";
import logoImg from "@/assets/images/placeholder-logo.png";
import { FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { HealthTrainee } from "@/pages/trainer/trainee/[id]";

type Props = {
  first_name: string;
  last_name: string;
  imgURL: string;
  trainee: HealthTrainee;
};

export default function CardTraineePlans(props: Props): JSX.Element {
  const { first_name, last_name, imgURL, trainee } = props;
  const [Details, setDetails] = useState(false);

  const {
    weight,
    height,
    neck,
    torso,
    chest,
    waist,
    arm,
    wrist,
    hip,
    butt,
    thig,
    calf,
    allergies,
    surgeries,
    smoke,
    drinker,
    drugs,
    roids,
    water,
    lesions
  } = trainee;

  const handleClick = () => {
    setDetails(!Details);
  };

  return (
    <div>
      <ul
        className="max-w-md rounded-md divide-y bg-[url('/tail-imgs/1zLe.gif')] bg-no-repeat bg-cover bg-bottom divide-gray-200 bg-gray-800 m-2 "
        onClick={handleClick}
      >
        <li className="pb-3 sm:pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full"
                src={imgURL}
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate ">
                {first_name}
              </p>
              <p className="text-sm text-white truncate ">{last_name}</p>
            </div>

            <div className="bg-gray-50 border opacity-90 pr-10  flex flex-col border-gray-300 text-gray-900 text-sm rounded-lg    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
              {Details && (
                <div className="p-5  items-center space-x-5 ">
                  <p>weight: {weight}</p>
                  <p>height: {height}</p>
                  <p>neck: {neck}</p>
                  <p>torso: {torso}</p>
                  <p>chest: {chest}</p>
                  <p>waist: {waist}</p>
                  <p>arm: {arm}</p>
                  <p>wrist: {wrist}</p>
                  <p>hip: {hip}</p>
                  <p>butt: {butt}</p>
                  <p>thig: {thig}</p>
                  <p>calf: {calf}</p>
                  <p>allergies: {allergies}</p>
                  <p>surgeries: {surgeries}</p>
                  <p>smoke: {smoke ? <FaCheck /> : <FaTimes />}</p>
                  <p>drinker: {drinker ? <FaCheck /> : <FaTimes />}</p>
                  <p>drugs: {drugs ? <FaCheck /> : <FaTimes />}</p>
                  <p>roids: {roids ? <FaCheck /> : <FaTimes />}</p>
                  <p>water: {water}</p>
                  <p>lesions: {lesions}</p>
                </div>
              )}
            </div>

            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <Image
                src={logoImg}
                alt={`link of the whole app`}
                className="inline-block mt-2  align-bottom sm:w-[100px] sm:h-[40px]"
              />
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
