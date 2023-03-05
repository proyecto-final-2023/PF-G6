import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import axios from "axios";
import CardPlans from "@/components/CardPlans";

import ReactStars from "react-stars";

export default function TraineeDetails() {
  const [user, setUser] = useAuthState(auth);

  console.log(user?.photoURL)

  const [userData, setUserData] = useState([]);
  const [plans, setPlan] = useState([]);
  console.log(userData);
  const router = useRouter();
  console.log(router.query.id);
  const id = router.query.id;
  useEffect(() => {
    // make call to backend to fetch user data
    axios(`https://fp-server-cg2b.onrender.com/user/${id}`)
      .then(({ data }) => {
        console.log(data);
        setUserData(data);
        setPlan(data.membership.trainer.planTrainees);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(userData);
  return (
    <div className="flex flex-nowrap bg-[url('/tail-imgs/trainer.jpg')] bg-no-repeat bg-cover bg-right   ">
    <div className="w-80 m-20 bg-white border opacity-60 hover:opacity-80    border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className=" flex justify-center ">
            <img className="p-8  rounded-full" src={userData.imgURL||user?.photoURL} alt="product image" width={200}  height={100}/>
        </div>
        <div className="px-5 pb-5">
            <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{userData.first_name}</h5>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{userData.last_name}</h5>
            </div>
            <div className="flex items-center mt-2.5 mb-5">
               <ReactStars count={5} size={20} color2={"#b96607"} />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{userData.role}</span>  
                <div className="flex items-center justify-between">
           </div>
                
            </div>
            < button  onClick={()=>{router.push("/plansTrainee")}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
        </div>
    </div>
    <div className="w-px m-20   rounded-lg shadow   opacity-80 hover:opacity-90 ">
             <div className="flex  justify-center  justify-between">
              <span className="  text-3xl font-bold text-gray-900 dark:text-white">Plans</span>  
          
            </div>
        <div className="px-10 pb-10   ">
            <div className=" flex flex-row gap-2   w-40">
            {plans &&
            plans.map((e) => (
              <CardPlans
                key={e.name}
                idPlans={e.id_PlanTrainee}
                name={e.name}
                cost={e.cost}
                description={e.description}
                category={e.category}
              />
            ))}
            </div>
  
        </div>
    </div>
       
    </div>
  );
}