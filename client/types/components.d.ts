import { StaticImageData } from "next/image";

export type HoverLiProps = {
  imgUrl?: StaticImageData;
  text: string;
  isHover: boolean;
  hoverEventHandler: ({}: HoverState) => void;
  optionsList: string[];
};

export type SubNavMenuProps = {
  optionsList: string[];
};

export interface NavbarStates {
  hovers: { type: "enter" | "leave"; key: "tools" | "user" };
}
