import {
  ReturnVoidOrJsx,
  SubNavMenuProps,
  UrlMapping,
} from "@/types/components";
import Link from "next/link";
import React from "react";

// outside to avoid creating it on every re-render, since will never change
const optionsUrlMapping: UrlMapping = {
  // Tools hover
  caloriescalculator: "/trainee/tools/calculator",
  fatcalculator: "/trainee/tools/fat-calculator",
  stopwatch: "/trainee/tools/stop-watch",
  // User guest hover
  register: "/login/register",
  login: "/login",
  // User logged in hover
  diets: "/trainee/eating-plans",
  trainerprograms: "/trainee/training-plans",
  logout: () => {
    console.log("Discord kitte FTW");
  },
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
        const urlKey = option.replace(" ", "").toLowerCase();
        // TS needed this to be happy, since I modifed the key before using it
        const urlOrFunc = optionsUrlMapping[urlKey as keyof UrlMapping];

        return (
          <li key={option.toString()}>
            {typeof urlOrFunc === "string" ? (
              <Link href={urlOrFunc}>{option}</Link>
            ) : (
              <button onClick={urlOrFunc}>{option}</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
