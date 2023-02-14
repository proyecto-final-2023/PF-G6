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
    <ul className="flex flex-col gap-1 bg-slate-500">
      {optionsList.map((option) => {
        const urlKey = option.replace(" ", "").toLowerCase() || "diets";
        // TS needed this to be happy, since I modifed the key before using it
        const url = optionsUrlMapping[urlKey as keyof UrlMapping];

        return (
          <li key={option}>
            <Link href={url}>{option}</Link>
          </li>
        );
      })}
    </ul>
  );
}
