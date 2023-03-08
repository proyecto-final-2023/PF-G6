import React from "react";
import UserCard from "./UserCard";
const trainee = {
  id: 1,
  name: "John Doe",
  email: "",
};

const fakeTrainees = Array(10).fill(trainee);

export default function UsersContainer() {
  return (
    <div>
      <h2>Trainees</h2>
      <div className="w-4/5 mx-auto bg-red-900 rounded grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {fakeTrainees.map((trainee) => (
          <UserCard
            key={trainee.id}
            name={trainee.name}
            id={trainee.id}
            email={trainee.email}
          />
        ))}
      </div>
    </div>
  );
}
