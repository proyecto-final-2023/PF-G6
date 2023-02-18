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
    <ul className="absolute left-0 w-[115px] flex flex-col bg-gray-600 border-gray-200 rounded-lg shadow-lg ease-in-out duration-500">
      {optionsList.map((option) => {
        const urlKey = option.replace(" ", "").toLowerCase();
        // TS needed this to be happy, since I modifed the key before using it
        const urlOrFunc = optionsUrlMapping[urlKey as keyof UrlMapping];

        return (
          <li key={option.toString()}>
            {typeof urlOrFunc === "string" ? (
              <Link href={urlOrFunc}>{option}</Link>
            ) : (
              <button
                onClick={urlOrFunc}
                className="inline-block px-6 py-2.5 bg-transparent font-medium text-xs leading-tight uppercase hover:bg-gray-600 hover:text-orange-500 rounded w-[115px] transition duration-300 ease-in-out"
                type="button"
              >
                {option}
              </button>
            )}

          </li>
        );
      })}
    </ul>
  );
}
