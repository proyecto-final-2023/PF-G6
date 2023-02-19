// Libraries
// Types
// Components/Assets

import { DayProps } from "./Day";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export type WeekProps = {
  daysArr: DayProps[];
};

export default function Week({ daysArr }: WeekProps) {
  return <div>Week</div>;
}
