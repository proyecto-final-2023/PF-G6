import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import CardPlans from "@/components/CardPlans";
import ReactStars from "react-stars";
import { getCookie } from "@/utils/cookieHandler";

type PlansType = {
  id: number;
  name: string;
  photo: string;
  first_name: string;
  last_name: string;
  imgURL: string;

  
};
type UserType = {
  first_name: string;
  last_name: string;
  role: string;
  membership: {
  trainer: { logo: string;
     planTrainees: PlansType[]; };};
  };

interface tUser {
  id: string;
  status: boolean;
  first_name: string;
  last_name: string;
  nickname: string;
  role: string;
  gender: string;
  phone: string;
  imgURL: string;
  membership:{
    trainer:{
      logo:string;
    }
  }
}

interface tPlan {
  id_PlanTrainee: string;
  name: string;
  cost: number;
  description: string;
  category: string;
}


export default function TraineeDetails() {
  const key =getCookie('token')
 

  const [userData, setUserData] = useState<tUser>();
  const [plans, setPlan] = useState<tPlan[]>([]);
  const[rating,setRating]=useState();
  const[certificates,setCertificate]=useState([]);
  const[dd,setDd]=useState();

  const router = useRouter();
  
  const id = router.query.id;
  useEffect(() => {

    // make call to backend to fetch user data
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
      .then(({ data }) => {
      
        setUserData(data);
        setDd(data.membership.trainerIdTrainer)
        setPlan(data.membership.trainer.planTrainees);
        ratinn(data.membership.trainerIdTrainer)
      })
      .catch((error) => console.error(error));

     
    
    
  }, []);



 const ratinn=(id:any)=> {
  try {
    // set rating 
   
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/rating/${id}`,{headers: { "x-access-token": key }})
    .then(({ data }) => {
     
      setRating(data);
  
    })
    
  } catch (error) {
    console.error(error)
  }
 }
    
  
  

  
 







  return (
    <div className="flex flex-nowrap  bg-[url('/tail-imgs/trainer.jpg')] bg-no-repeat bg-cover  bg-bottom  ">
    <div className="w-80 m-20 bg-white border opacity-60 hover:opacity-80    border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className=" flex justify-center ">
            <img className="p-8  rounded-full" src={userData?.membership?.trainer?.logo} alt="product image" width={200}  height={100}/>
        </div>
        <div className="px-5 pb-5">
          <div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {userData?.first_name}
            </h5>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {userData?.last_name}
            </h5>
          </div>
          <div className="flex items-center mt-2.5 mb-5">
            <ReactStars count={5} value={rating?.rating} size={20} color2={"#b96607"} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {userData?.role}
            </span>
            <div className="flex items-center justify-between"></div>
          </div>
          <button
            onClick={() => {
              router.push("/plansTrainee");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back
          </button>
          <h1>certificate</h1>
          <div>
             {

             }
          </div>
        </div>
      </div>
       <div className="w-px m-20   rounded-lg shadow   opacity-80 hover:opacity-90 ">
             <div className="flex  justify-center">
              <span className="  text-3xl font-bold text-gray-900 dark:text-white">Plans</span>  
          
            </div>
        <div className="px-10 pb-10 h-screen m-20 ">
            <div className=" flex flex-row gap-2 m-20  w-40">
            {plans &&
            plans.map((e:any) => (
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
