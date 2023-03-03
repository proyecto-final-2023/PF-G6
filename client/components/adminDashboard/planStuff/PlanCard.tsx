import { Plan } from "./PlanContainer";

// ? more readable
type PlanCardProps = {
  price: Plan["price"];
  name: Plan["name"];
  logo: Plan["logo"];
  index: number;
  clickHandler: (id: number) => void;
};

export default function PlanCard(props: PlanCardProps) {
  const { price, name, logo, clickHandler, index } = props;

  return (
    <button
      className="bg-slate-700 rounded cursor-pointer px-2 py-8"
      onClick={() => clickHandler(index)}
    >
      <p>Price {price}</p>
      <p>Name {name}</p>
      <p>Logo {logo}</p>
    </button>
  );
}
