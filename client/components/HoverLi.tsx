import Image from "next/image";
import Link from "next/link";
import { HoverLiProps } from "@/types/components";
import SubNavMenu from "./SubNavMenu";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, text, isHover, hoverEventHandler, optionsList } = props;

  return (
    <li
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <Link href="#">
        {/* if imgUrl render Image: else render text */}
        {/* text stuff to make it upper case, needs to be done because of hoverState's key */}
        {imgUrl ? (
          <Image src={imgUrl} alt={`link of ${text}`} width={34} />
        ) : (
          text[0].toUpperCase() + text.slice(1)
        )}

        {isHover && <SubNavMenu {...{ optionsList }} />}
      </Link>
    </li>
  );
}
