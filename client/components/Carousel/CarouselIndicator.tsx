// Libraries
import { BsCircle, BsCircleFill } from "react-icons/bs";
// Types
import { CarouselIndicatorProps } from "@/types/components";
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function CarouselIndicator(props: CarouselIndicatorProps) {
  const { current, total } = props;

  return (
    <div className="flex m-5 justify-center">
      {Array(total)
        .fill(0)
        .map((e, i) => {
          if (i + 1 === current) return <BsCircleFill key={i} />;
          else return <BsCircle key={i} />;
        })}
    </div>
  );
}
