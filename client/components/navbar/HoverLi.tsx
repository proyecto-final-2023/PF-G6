import Image from "next/image";
import Link from "next/link";
import { HoverLiProps } from "@/types/components";
import SubNavMenu from "./SubNavMenu";
import { linkStyles } from "./Navbar";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, href, text, isHover, hoverEventHandler, optionsList } = props;

  const USER_ID = "777-www";

  return (
    <li
      className="justify-center flex items-center"
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <Link {...{ href }} replace className={linkStyles}>
        {/* if imgUrl render Image: else render text */}
        {/* make text upper case, cuz' of hoverState's key */}
        {imgUrl ? (
          <Image src={imgUrl} alt={`link of ${text}`} />
        ) : (
          text[0].toUpperCase() + text.slice(1)
        )}
      </Link>
      {isHover && (
        <div className="absolute  px-2 py-2 w-[115px] z-10">
          <SubNavMenu {...{ optionsList }} id={USER_ID} />
        </div>
      )}
    </li>
  );
}
//<SubNavMenu {...{ optionsList }} id={USER_ID} />
