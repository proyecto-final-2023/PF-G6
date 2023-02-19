// Libraries
// Types
import { HoverTextLiProps } from "@/types/components";
import SubMenuBtn from "./SubMenuBtn";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function HoverTextLi(props: HoverTextLiProps) {
  const { isClicked, clickEventHandler, optionsList, text } = props;

  return (
    <li onClick={clickEventHandler}>
      {text}
      {isClicked && (
        <div className="absolute  px-2 py-2 w-[115px] ">
          <SubMenuBtn {...{ optionsList }} />
        </div>
      )}
    </li>
  );
}
