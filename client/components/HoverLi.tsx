import { HoverLiProps } from "@/types/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HoverLi(props: HoverLiProps) {
  const { imgUrl, text, isHover, hoverEventHandler } = props;

  // if it has imgUrl then render an LI with Image
  if (imgUrl)
    return (
      <li
        onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
        onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
      >
        <Link href="#">
          <Image src={imgUrl} width={45} alt="logo img" />
        </Link>
        {isHover && "KEKW"}
      </li>
    );

  // otherwise render an LI only with text
  return (
    <li
      onMouseEnter={() => hoverEventHandler({ type: "enter", key: text })}
      onMouseLeave={() => hoverEventHandler({ type: "leave", key: text })}
    >
      <Link href="#">{text}</Link>
      {isHover && "KEKW"}
    </li>
  );
}
