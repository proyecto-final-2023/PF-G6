import { StaticImageData } from "next/image";

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
  caloriescalculator: string;
  fatcalculator: string;
  stopwatch: string;

  register: string;
  login: string;

  diets: string;
  trainerprograms: string;
  logout: () => void;
};

// @ SubNavMenu
export type ReturnVoidOrJsx = null | React.ReactElement;

// @ Navbar
export interface NavbarStates {
  hovers: { type: "enter" | "leave"; key: "tools" | "user" };
}

// @ CarouselComp
export interface CarouselCompProps {
  slidesArr: Array<{
    title: string;
    image: StaticImageData;
    hoverText: string;
  }>;
}

// @ CarouselItem
export type CarouselImg = { title: string; image: StaticImageData;hoverText:string};

// @ CarouselItem
export interface CarouselItemProps {
  prevImg: CarouselImg;
  currImg: CarouselImg;
  nextImg: CarouselImg;
  isModalOpen: boolean;
  imgClickHandler: () => void;
  isTriple: boolean;
  indicators: { current: number; total: number };
}

// @ SingleImageCarousel
export interface SingleImageCarouselProps {
  currImg: CarouselImg;
  indicators: { current: number; total: number };
}

// @ register-inputs-data
export type InputData = {
  first_name: string;
  last_name: string;
  nick_name: string;
  password: string;
  email: string;
  phone: string;
  cell: string;
  imgFile: File;
  gender: "male" | "female" | "other";
  role: "admin" | "trainee" | "trainer";
};
export interface TripleImageCarouselProps {
  prevImg: CarouselImg;
  currImg: CarouselImg;
  nextImg: CarouselImg;
}

//@generic-inputs

export interface GenericInputProps extends BasicInputsProps {
  register: UseFormRegister<InputData>;
}

export interface ContactInputProps extends BasicInputsProps {
  register: UseFormRegister<ContactData>;
}

export type BasicInputsProps = {
  label: string;
  options: { required: boolean; pattern?: RegExp };
  err: FieldError | undefined;
  name: string;
  type: "text" | "number" | "password" | "email" | "textarea" ;
}
