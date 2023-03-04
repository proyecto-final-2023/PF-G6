import React, { useState } from "react";
import axios from "axios";
//crear los planes de los trainer
export default function createPlans() {
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    description: "",
    cantTrainees: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/plans/trainers", formData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        window.alert("Error in" + error);
      });
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form className=" pt-20  flex flex-col" onSubmit={handleSubmit}>
        <h2 className="text-gray-300 text-xl  ">Create plans trainers</h2>
        <label>
          <input
            className="m-4  bg-gray-200 shadow-2xl rounded-md"
            type="name"
            name="name"
            placeholder="name...."
            value={formData.name}
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
            value={formData.cost}
            onChange={handleChange}
          />
        </label>
        <br />

        <br />
        <label>
          <input
            className="m-3  bg-gray-200 rounded-md "
            type="text"
            name="description"
            placeholder="description..."
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            className="m-3  bg-gray-200 rounded-md "
            type="text"
            name="cantTrainees"
            placeholder="cantTrainees..."
            value={formData.cantTrainees}
            onChange={handleChange}
          />
        </label>
        <br />

        <button className="button " type="submit">
          create
        </button>
      </form>
      <div></div>
    </div>
  );
}
