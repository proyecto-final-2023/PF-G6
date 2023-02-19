// Libraries
import Image from "next/image";
// Types
import { HoverImageLiProps } from "@/types/components";
import SubMenuLink from "./SubMenuLink";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function HoverImageLi(props: HoverImageLiProps) {
  const { imgUrl, isClicked, clickEventHandler, optionsList } = props;

  return (
    <li onClick={clickEventHandler} className="cursor-pointer">
      <div className="inline-block px-6 font-medium text-xs leading-tight h-[70px] w-[115px] uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out">
        <Image
          src={imgUrl}
          alt={`missing unknown image`}
          width={30}
          height={30}
        />
      </div>

      {isClicked && (
        <div className="absolute  px-2 py-2 w-[115px] ">
          <SubMenuLink {...{ optionsList }} />
        </div>
      )}
    </li>
  );
}
