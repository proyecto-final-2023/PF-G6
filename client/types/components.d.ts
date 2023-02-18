import { StaticImageData } from "next/image";
import React from "react";

// ? interfaces only for components states
// ? types for almost everything

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

// @ CarouselItem
export interface CarouselItemProps {
  imgData: { title: string; image: StaticImageData };
  isModalOpen: boolean;
  imgClickHandler?: () => void;
  indicators: { current: number; total: number };
}

// @ register-inputs-data
export type InputData = {
  label: string;
  name: string;
  type: "text" | "password" | "number" ;
};
