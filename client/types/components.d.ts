import { StaticImageData } from "next/image";

// ? interfaces only for components states
// ? types for almost everything

// @ HoverLi
export type HoverLiProps = {
  imgUrl?: StaticImageData|string
  href: string;
  text: string;
  isHover: boolean;
  hoverEventHandler: ({}: HoverState) => void;
  optionsList: string[];
  vw: number;
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

  
  dashboard:()=> void|string|Promise;
  logout: () => void|string
};

// @ SubNavMenu
export type ReturnVoidOrJsx = null | React.ReactElement;

// @ Navbar
export interface NavbarStates {
  hovers: { type: "enter" | "leave"; key: "tools" | "user" };
}

// @ CarouselComp
// export interface CarouselCompProps {
//   slidesArr: Array<{
//     title: string;
//     image: StaticImageData;
//     hoverText: string;
//     hoverText2: string;
//   }>;
// }

// // @ CarouselItem
// export type CarouselImg = {
//   title: string;
//   image: StaticImageData;
//   hoverText: string;
//   hoverText2: string;
// };

// // @ CarouselItem
// export interface CarouselItemProps {
//   prevImg: CarouselImg;
//   currImg: CarouselImg;
//   nextImg: CarouselImg;
//   isModalOpen: boolean;
//   imgClickHandler: () => void;
//   isTriple: boolean;
//   indicators: { current: number; total: number };
// }

// // @ SingleImageCarousel
// export interface SingleImageCarouselProps {
//   currImg: CarouselImg;
//   indicators: { current: number; total: number };
// }

// @ register-inputs-data
export type InputData = {
  first_name: string;
  last_name: string;
  nick_name: string;
  password: string;
  password_confirmation:string,
  email: string;
  phone: string;
  cell: string;
  imgURL: string;
  imgFile: File;
  gender: "male" | "female" | "other";
  role: "admin" | "trainee" | "trainer";
};
export interface TripleImageCarouselProps {
  prevImg: CarouselImg;
  currImg: CarouselImg;
  nextImg: CarouselImg;
}

// @ SwiperCarousel
export interface SwiperCarouselProps {
  slidesArr: Array<{
    title: string;
    image: StaticImageData;
    hoverText: string;
    hoverText2: string;
  }>;
}

//@generic-inputs

export interface GenericInputProps extends BasicInputsProps {
  register: UseFormRegister<InputData>;
}

export interface ContactInputProps extends BasicInputsProps {
  register: UseFormRegister<ContactData>;
}
type ValidatePasswordConfirmation = (value: string) => boolean | string 
export type BasicInputsProps = {
  label: string;
  options: { required: boolean; pattern?: RegExp; validate:ValidatePasswordConfirmation|null };
  err: FieldError | undefined;
  name: string;
  type: "text" | "number" | "password" | "email" | "textarea" |"password_confirmation";
};



// @ Components/Navbar/Burger
export type BurgerProps = {
  isBurgerActive: boolean;
  burgerHandler: () => void;
};

// @ Components/CardPlans
export type CardPlansProps = {
  idPlans: string;
  name: string;
  cost: number;
  category: string;
  description: string;
  // idUser:number;
};

// @ components/PaypalButton
export type PaypalButtonProps = {
  amountToPay: number;
  serviceName: string;
  idPlans: string;
  idUser: number;
};
