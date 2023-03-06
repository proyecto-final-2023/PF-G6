import React from "react";
type UserCardProps = {
  id: number;
  name: string;
  email: string;
};
export default function UserCard(props: UserCardProps) {
  const { id, name, email } = props;
  return <div>UserCard</div>;
}
