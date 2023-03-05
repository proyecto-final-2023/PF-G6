type TraineeCardProps = {
  name: string;
  img: string;
  user_id: string;
  clickHandler: (id: string) => void;
};

export default function TraineeCard(props: TraineeCardProps) {
  const { name, img, user_id, clickHandler } = props;

  return (
    <button onClick={() => clickHandler(user_id)}>
      {name}
      <img src={img} alt={name} />
    </button>
  );
}
