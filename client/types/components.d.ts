import { StaticImageData } from "next/image";

export type HoverLiProps = {
  imgUrl: StaticImageData;
  text: HoverState["key"];
  isHover: boolean;
  hoverEventHandler: ({}: HoverState) => void;
};

export interface NavbarStates {
  hovers: { type: "enter" | "leave"; key: "tools" | "user" };
}
