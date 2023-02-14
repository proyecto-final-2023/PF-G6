import { SubNavMenuProps } from "@/types/components";
import Link from "next/link";
import React from "react";

export default function SubNavMenu({ optionsList }: SubNavMenuProps) {
  return (
    <div className="flex flex-col gap-1 bg-slate-500">
      {optionsList.map((option) => (
        <li>
          <Link href={"#"}>{option}</Link>
        </li>
      ))}
    </div>
  );
}
