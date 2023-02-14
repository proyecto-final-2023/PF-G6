import Image from "next/image";
import Link from "next/link";
import { HoverLiProps } from "@/types/components";
import SubNavMenu from "./SubNavMenu";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, href, text, isHover, hoverEventHandler, optionsList } = props;

  const USER_ID = "777-www";

  return (
    <li
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <Link {...{ href }} replace>
        {/* if imgUrl render Image: else render text */}
        {/* make text upper case, cuz' of hoverState's key */}
        {imgUrl ? (
          <Image src={imgUrl} alt={`link of ${text}`} width={34} />
        ) : (
          text[0].toUpperCase() + text.slice(1)
        )}
      </Link>
      {isHover && <SubNavMenu {...{ optionsList }} id={USER_ID} />}
    </li>
  );
}
