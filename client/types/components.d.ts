// ? interfaces only for components states
// ? types for almost everything
// Libraries
import { StaticImageData } from "next/image";
// Types
// Components/Assets

// @ Home
type ConfirmationState = "ok" | "error" | "loading";

// @ Navbar
export type HiddenOption = {
  title: string;
  url?: string;
  handler?: () => void;
};

export type OptionsUrlMapping = {
  loggedInUser: HiddenOption[];
  loggedOutUser: HiddenOption[];
  tools: HiddenOption[];
};

// @ HoverImageLi
export type HoverImageLiProps = {
  imgUrl: StaticImageData | string;
  isClicked: boolean;
  optionsList: HiddenOption[];
  clickEventHandler: () => void;
};

// @ HoverTextLi
export type HoverTextLiProps = {
  text: string;
  isClicked: boolean;
  optionsList: HiddenOption[];
  clickEventHandler: () => void;
};

// @
export type ResType = {
  bodyPart: string;
  equipement: string;
  gifUrl: string;
  id: number;
  name: string;
  target: string;
};

// @ SubMenuText
export type SubMenuTextProps = {
  optionsList: HiddenOption[];
};

// @ SubMenuBnt
export type SubMenuBtnProps = {
  optionsList: HiddenOption[];
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
  clicked: { type: "enter" | "leave"; key: "tools" | "user" };
}

// @ contact
export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// @ newCarousel/Carousel
export type SingleCarouselProps = {
  slides: Array<{ title: string; image: StaticImageData; hoverText: string }>;
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

// @ SwiperCarousel
export interface SwiperCarouselProps {
  slidesArr: Array<{
    title: string;
    image: StaticImageData;
    hoverText: string;
  }>;
}

// @ CarouselItem
export type CarouselImg = {
  title: string;
  image: StaticImageData;
  hoverText: string;
};

export type CarouselIndicatorProps = {
  current: number;
  total: number;
};

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
  imgURL:string
  imgFile: File;
  gender: "male" | "female" | "other";
  role: "admin" | "trainee" | "trainer";
};
export interface TripleImageCarouselProps {
  prevImg: CarouselImg;
  currImg: CarouselImg;
  nextImg: CarouselImg;
}

// @ GenericInputs
export type BasicInputsProps = {
  label: string;
  options: { required: boolean; pattern?: RegExp };
  err: FieldError | undefined;
  name: string;
  type: "text" | "number" | "password" | "email";
};

export interface GenericInputProps extends BasicInputsProps {
  register: UseFormRegister<InputData>;
}

export interface ContactInputProps extends BasicInputsProps {
  register: UseFormRegister<ContactData>;
}

// @ ImageInput
export interface ImageInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  name: string;
  options: { required: boolean; regex?: RegExp };
  err: FieldError | undefined;
}

// @ TextareaInput
export interface TextareaInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  name: string;
  options: { required: boolean; regex?: RegExp };
  err: FieldError | undefined;
}

// @SelectInput
export interface SelectInputProps {
  register: UseFormRegister<InputData>;
  label: string;
  name: string;
  selectOptions: string[];
  options: { required: boolean; regex?: RegExp };
  err: FieldError | undefined;
}
