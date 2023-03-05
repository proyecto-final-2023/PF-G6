import React from "react";

type TraineeCardProps = {
  name: string;
  img: string;
  user_id: string;
  clickHandler: (id: string) => void;
};

export default function TraineeCard(props: TraineeCardProps) {
  return <div>TraineeCard</div>;
}
