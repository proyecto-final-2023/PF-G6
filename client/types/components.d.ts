import { StaticImageData } from "next/image";
import React from "react";

// ? types for almost everything
// ? interfaces only for components states

// @ HoverLi
export type HoverLiProps = {
  imgUrl?: StaticImageData;
  href: string;
  text: string;
  isHover: boolean;
  hoverEventHandler: ({}: HoverState) => void;
  optionsList: string[];
};

// @ SubNavMenu
export type SubNavMenuProps = {
  optionsList: string[];
  singOutHandler?: (id: string) => void;
  id: string;
};

// @ SubNavMenu
export type UrlMapping = {
  imc: string;
  dietplanning: string;
  register: string;
  login: string;
  diets: string;
  trainer: string;
  programs: string;
  logout: string;
};

// @ SubNavMenu
export type ReturnVoidOrJsx = null | React.ReactElement;

// @ Navbar
export interface NavbarStates {
  hovers: { type: "enter" | "leave"; key: "tools" | "user" };
}
