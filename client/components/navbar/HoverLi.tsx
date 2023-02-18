import Image from "next/image";
import Link from "next/link";
import { HoverLiProps } from "@/types/components";
import SubNavMenu from "./SubNavMenu";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, href, text, isHover, hoverEventHandler, optionsList } = props;

  const USER_ID = "777-www";

  return (

    <li className=""
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <Link {...{ href }} replace className="w-[115px]">
        {/* if imgUrl render Image: else render text */}
        {/* make text upper case, cuz' of hoverState's key */}
        {imgUrl ? (
          <button
            type="button"
            className="inline-block px-6 font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out"
          >
            <Image src={imgUrl} alt={`link of ${text}`} />
          </button>
        ) : (
          <button
            type="button"
            className="inline-block px-6  font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out"
          >
            {" "}
            {text[0].toUpperCase() + text.slice(1)}
          </button>
        )}
      </Link>
      {isHover && (
        <div className="absolute  px-2 py-2 w-[115px] ">

          <SubNavMenu {...{ optionsList }} id={USER_ID} />
        </div>
      )}
    </li>
  );
}
//<SubNavMenu {...{ optionsList }} id={USER_ID} />
