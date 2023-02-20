// Libraries
import Link from "next/link";
// Types
import { SubMenuTextProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function SubMenuLink(props: SubMenuTextProps) {
  const { optionsList } = props;

  return (
    <ul className="absolute left-0 w-[115px] flex flex-col bg-gray-600 border-gray-200 rounded-lg shadow-lg ease-in-out duration-500 cursor-pointer">
      {optionsList.map((option) => {
        return (
          <li key={option.title}>
            <Link
              href={option.url || "/"}
              className="font-medium text-xs uppercase rounded hover:text-orange-500 transition duration-300 ease-in-out"
            >
              {option.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
