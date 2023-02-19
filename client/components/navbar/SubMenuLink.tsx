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
          <li key={option.toString()}>
            <Link href={option.url || "/"}>{option.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
