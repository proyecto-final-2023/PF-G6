import React from "react";

function OptionMenu() {
  return (
    <div className="flex flex-col bg-gray-500 text-white h-screen w-52">
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2">Users</button>
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2">Trainers</button>
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2" >Trainees</button>
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2" >Memberships</button>
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2" >All trainers plans</button>
      <button className="w-full hover:bg-gray-700 p-4 border-solid border-2" >Currency movements</button>
    </div>
  );
}

export default OptionMenu;
