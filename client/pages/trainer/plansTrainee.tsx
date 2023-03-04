import React, { useState } from "react";
import axios from "axios"
import Link from "next/link";
import { getCookie, setCookie } from "@/utils/cookieHandler";


// crear los planes para trainees
export default function createPlans() {
  //token user
  const key=getCookie('token')
  console.log(key)
 
  const [formData, setFormData] = useState([{
     
  	 name:'',
     cost :'',
     description :'',
     
}]);
 console.log(formData)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios
      .post("http://localhost:3001/plans/trainee",formData,{headers:{'x-access-token': key}})
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
    <div className=""> 
      <div className="row-span-3 ">
      
      </div>
      
    <form className="col-span-2 pt-60" onSubmit={handleSubmit}>
         
      
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
    <div className="row-span-2 col-span-2  m-auto">
    <Link href="/trainer" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">Dashboard</span>
    </Link>
    
     </div>
    </div>
  );
}

