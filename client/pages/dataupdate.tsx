import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";
import { FormEvent, ChangeEvent } from "react";

type UserData = {
  first_name: string;
  last_name: string;
  nickname: string;
  imgURL: string;
  gender: string;
  phone: string;
};

const UpdateUserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    nickname: "",
    imgURL: "",
    gender: "",
    phone: ""
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('datos')
    try {
      const key = getCookie("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/data`,
        userData,
        {
          headers: {
            "x-access-token": key
          }
        }
      );
      alert('Data updated');
      window.history.back()
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-[89.5vh] bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed">
      <div className="flex flex-col w-[20%] font-semibold bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 m-auto text-m p-10">
          <form onSubmit={handleSubmit}>
            <label className="text-white">
              First Name:
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputChange}
                className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
                className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Nickname:
              <input
                type="text"
                name="nickname"
                value={userData.nickname}
                onChange={handleInputChange}
                className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="imgURL"
                value={userData.imgURL}
                onChange={handleInputChange}
                className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
              />
            </label>
            <label>
              Gender:
              <select name="gender" className="my-3 ml-2 rounded-md" onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-xl hover:text-orange-500 border-4 bg-slate-600 items-center w-[10vw] self-center rounded-xl hover:w-60 ease-in-out duration-300 mt-5"
              >
                Submit
              </button>
            </div>
          </form>        
      </div>
    </div>
  );
};

export default UpdateUserForm;
