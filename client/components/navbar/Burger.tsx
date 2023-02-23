import { BurgerProps } from "@/types/components";

const sharedStyles =
  "w-8 h-1 bg-orange-600 relative lg:hidden rounded transition ease transform duration-300";

export default function Burger({ isBurgerActive, burgerHandler }: BurgerProps) {
  return (
    <button
      type="button"
      className={`fixed bg-gray-600/30 w-11 h-10 z-30 pointer m-2 right-0 border border-black/90 rounded-sm p-1`}
      onClick={burgerHandler}
    >
      <div
        className={`${sharedStyles} -top-2 ${
          isBurgerActive && "rotate-45 translate-y-3"
        }`}
      ></div>
      <div
        className={`${sharedStyles} ${
          isBurgerActive && "-translate-x-3 opacity-0"
        }`}
      ></div>
      <div
        className={`${sharedStyles} top-2 ${
          isBurgerActive && "-rotate-45 -translate-y-3"
        }`}
      ></div>
    </button>
  );
}
