// Libraries
// Types
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export type DayProps = {
  // later do a join of all the days of the week
  dayData: { name: string; number: number; desc: string };
};

export default function Day({ dayData }: DayProps) {
  return <div>Day</div>;
}
