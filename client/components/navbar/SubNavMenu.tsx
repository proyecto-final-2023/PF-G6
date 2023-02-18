import {
  ReturnVoidOrJsx,
  SubNavMenuProps,
  UrlMapping,
} from "@/types/components";
import Link from "next/link";
import React from "react";

// outside to avoid creating it on every re-render, since will never change
const optionsUrlMapping: UrlMapping = {
  // guest routes
  imc: "/guest/imc-calculator",
  dietplanning: "/guest/diet-planning",
  register: "/login/register",
  login: "/login",
  // trainee routes
  diets: "/trainee/diets-list",
  trainer: "/trainee",
  programs: "/trainee",
  logout: "SUPPOSED TO JUST BE A FUNCTION TO LOG OUT KEK",
};

export default function SubNavMenu(props: SubNavMenuProps): ReturnVoidOrJsx {
  const { optionsList, singOutHandler, id } = props;

  // must return null to be a valid JSX child
  if (singOutHandler) {
    singOutHandler(id);
    return null;
  }

  return (
    <ul className="absolute left-0 w-[115px] flex flex-col bg-gray-600 border-gray-200 rounded-lg shadow-lg ease-in-out duration-500">
      {optionsList.map((option) => {
        const urlKey = option.replace(" ", "").toLowerCase() || "diets";
        // TS needed this to be happy, since I modifed the key before using it
        const url = optionsUrlMapping[urlKey as keyof UrlMapping];

        return (
          <li key={option}>
            <Link href={url}>
            <button type="button" className="inline-block px-6 py-2.5 bg-transparent font-medium text-xs leading-tight uppercase hover:bg-gray-600 hover:text-orange-500 w-[115px] rounded-lg ease-in-out duration-300">{option}</button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
