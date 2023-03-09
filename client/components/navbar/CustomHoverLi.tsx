import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HoverLiProps } from "@/types/components";
import SubNavMenu from "./SubNavMenu";
import { className } from "./Navbar";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, href, text, isHover, hoverEventHandler, optionsList, vw } =
    props;

  const USER_ID = "777-www";

  return (
    <li
      className="justify-center flex items-center z-10 relative"
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <div className="flex flex-col items-center p-2 sm:p-0">
        <Link href="/trainee/tools" replace className={className}>
          {/* if imgUrl render Image: else render text */}
          {/* make text upper case, cuz' of hoverState's key */}
          {imgUrl ? (
            <Image src={imgUrl} alt={`link of ${text}`} />
          ) : (
            text[0].toUpperCase() + text.slice(1)
          )}
        </Link>

        {(isHover || vw < 800) && (
          <div className="static sm:absolute top-5 px-2 py-4 w-[115px]">
            <SubNavMenu {...{ optionsList }} id={USER_ID} />
          </div>
        )}
      </div>
    </li>
  );
}
//<SubNavMenu {...{ optionsList }} id={USER_ID} />
