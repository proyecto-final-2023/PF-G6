import React, { useState } from "react";
import axios from "axios";
import NavbarTrainer from "@/components/navbar/NavbarTrainer";
import { getCookie, setCookie } from "@/utils/cookieHandler";

// crear los planes para trainees
export default function createPlans() {
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
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3 ">
        <NavbarTrainer />
      </div>

      <form className="col-span-2 pt-60" onSubmit={handleSubmit}>
        <h2 className="text-gray-300 text-xl  ">Create plans trainee</h2>
        <label>
          <input
            className="m-4  bg-gray-200 shadow-2xl rounded-md"
            type="name"
            name="name"
            placeholder="name...."
            value={formData[0].name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            className="m-4  bg-gray-200 shadow-2xl rounded-md"
            type="number"
            name="cost"
            placeholder="cost...."
            value={formData[0].cost}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            className="m-3  bg-gray-200 rounded-md "
            type="text"
            name="description"
            placeholder="description..."
            value={formData[0].description}
            onChange={handleChange}
          />
        </label>
        <br />

        <button className="button " type="submit">
          create
        </button>
      </form>
      <div className="row-span-2 col-span-2  m-auto"></div>
    </div>
  );
}
