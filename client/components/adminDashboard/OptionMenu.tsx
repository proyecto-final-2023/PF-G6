import React from 'react';

function OptionMenu() {
  return (
    <div className="flex flex-col bg-gray-500 text-white h-screen w-52">
        <button className="w-full hover:bg-gray-700">Users</button>
        <button className="w-full hover:bg-gray-700">Trainers</button>
        <button className="w-full hover:bg-gray-700">Trainees</button>
        <button className="w-full hover:bg-gray-700">Memberships</button>
        <button className="w-full hover:bg-gray-700">All trainers plans</button>
        <button className="w-full hover:bg-gray-700">Currency movements</button>
    </div>
  )
}

export default OptionMenu;