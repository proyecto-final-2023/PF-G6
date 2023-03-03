import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CardPlans from "@/components/CardPlans";

export default function TraineeDetails() {
  const [userData, setUserData] = useState([]);
  console.log(userData)
  const router = useRouter();
  console.log( router.query.id);
  const id=router.query.id
  useEffect(() => {
    // make call to backend to fetch user data
    axios(`http://localhost:3001/user/${id}`)
      .then(({ data }) => setUserData(data))
      .catch((error) => console.log(error));

  },[]);
  console.log(userData.membership.trainer.planTrainees)
 

  return( 
    <div>
          <div className="content-center justify-items-center pt-40">
          <img src={userData.imgURL} alt='none' width={200}  height={100}/>

          <h2>first name: {userData.first_name}</h2>
          <h2>last name: {userData.last_name}</h2>
          <p>Role- {userData.role}</p>
        </div>
        <div>
          {/* {
             userData.membership.trainer.planTrainees&&
             userData.membership.trainer.planTrainees.map()
                        
          } */}
       
        </div>
    </div>
  ) 
}
