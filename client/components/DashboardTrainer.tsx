import NavbarTrainer from "@/components/navbar/NavbarTrainer";
import ProgressBar from "@/components/Progressbar";
import TablePlans from "@/components/TablePlans";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import axios from "axios";
import CreatePlansTrainee from "./CreatePlansTrainee";

export default function Dashboard() {
  
  const key = getCookie("token");
 

  const [plans, setPlans] = useState([]);
  const [logo, setLogo] = useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:3001/user/perfil`, null, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        
        setPlans(data.data.membership);
        setLogo(data.data.membership.trainer.logo);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="grid grid-rows-1 grid-flow-col  min-h-full max-w-full">
      <div className="row-span-2 ">
        <NavbarTrainer />
      </div>

      <div className=" flex items-center justify-center m-20 gap-2  ">
        <div className=" flex flex-col w-auto h-auto border-2  border-gray-200 border-double rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3  ">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Start <br />
                {plans.startDate}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-700">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Finish
                <br />
                {plans.finishDate}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <img
                className="rounded-lg justify-items-center"
                src={logo}
                alt="logo"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="flex items-center justify-center h-50 mb-4  rounded bg-gray-50 dark:bg-gray-800">
            <div className="m-20">
              {" "}
              <TablePlans />
            </div>
          </div>
          <div className="flex items-center justify-center  h-80 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div className="m-auto">
              <h2 className="text-gray-300 text-xl  ">Create Plans Trainee</h2>
              <br />
              <CreatePlansTrainee />
            </div>
            <ProgressBar />
          </div>

          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div className=" text-gray-400 dark:text-gray-500"> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
