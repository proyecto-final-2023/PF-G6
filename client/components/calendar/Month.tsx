// Libraries
// Types
// Components/Assets

import { DayProps } from "./Day";
import { WeekProps } from "./Week";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
type MonthProps = {
  weeksData: DayProps[];
};

export default function Month({ weeksData }: MonthProps) {
  return <div>Month</div>;
}
