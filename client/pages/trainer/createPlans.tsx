import React, { useState } from "react";
import axios from "axios";

export default function createPlans() {
  const[idTrain,setId]=useState('3ecd5a1a-f6bc-49f4-99ab-971003de134a');
  const [formData, setFormData] = useState({
     idTrainer:'67a65040-1a57-496a-9c7e-162fa672e18d',
  	 name:'',
     cost :'',
     description :'',
     
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios
      .post("http://localhost:3001/plans/trainee",formData)
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
    <div>
    <form className=" pt-20  flex flex-col" onSubmit={handleSubmit}>
         
      <p> El ID del tranier: {idTrain}</p>
      <h2 className="text-gray-300 text-xl  ">Create plans trainee</h2>
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
   
      
      <button className="button " type="submit">
        create
      </button>
    </form>
    <div></div>
    </div>
  );
}
