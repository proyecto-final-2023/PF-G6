import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getCookie, setCookie } from "@/utils/cookieHandler";

// crear los planes para trainees
export default function CreatePlansTrainee() {
  //token user
  const key = getCookie("token");
  console.log(key);

  const [formData, setFormData] = useState([
    {
      name: "",
      cost: "",
      description: "",
    },
  ]);
  console.log(formData);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/plans/trainee`, formData, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        window.alert("Error in" + error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label>
        <input
          className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="name"
          name="name"
          placeholder="Name...."
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        <input
          className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          name="cost"
          placeholder="Cost...."
          value={formData.cost}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        <input
          className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="description"
          placeholder="Description..."
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />

      <button
        className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4  ffont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        type="submit"
      >
        create
      </button>
    </form>
  );
}
