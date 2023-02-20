// Libraries
// Types
import { SubMenuBtnProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function SubMenuBtn(props: SubMenuBtnProps) {
  const { optionsList } = props;

  return (
    <ul className="absolute left-0 w-[115px] flex flex-col bg-gray-600 border-gray-200 rounded-lg shadow-lg ease-in-out duration-500">
      {optionsList.map((option) => {
        return (
          <li key={option.title}>
            <button
              onClick={option.handler}
              className="inline-block px-6 py-2.5 bg-transparent font-medium text-xs leading-tight uppercase hover:bg-gray-600 hover:text-orange-500 rounded w-[115px] transition duration-300 ease-in-out"
              type="button"
            >
              {option.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
