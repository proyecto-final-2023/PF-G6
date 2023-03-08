import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, momentLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getCookie } from "@/utils/cookieHandler";
// import ProgressBar from "@/components/TraineeProgressbar";
import Rating from "@/components/StarRating";
import { SyntheticEvent } from "react";
import { FiEdit } from "react-icons/fi";
import moment from 'moment'
import { loginHandler } from "@auth0/nextjs-auth0/dist/auth0-session";
import Modal from "react-modal";
import { id } from "date-fns/locale";
import { ExerciesResType } from "@/types/components/libraries";
import { CardData } from "@/components/Food";
import WithPrivateRouter from "@/components/WithPrivateRoute";
import Image from "next/image";
 

function Index() {
  const [user, setUser] = useAuthState(auth);
  const photo = user?.photoURL;
  const name = user?.displayName;
  const key = getCookie("token");
  const [user1, setUser1] = useState<any>();
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState()
  const [idAliment, setIdAliment] = useState<Array<selectedAliments>>([]);
  const [idExercise, setIdExercise] = useState<Array<selectedExers>>([])
  const [dates, setDates] = useState([]);
  const [sortedAliments, setSortedAliments] = useState<any>([]);
  const [sortedExercises, setSortedExercises] = useState<any>([]);
  const [verRutina, setVerRutina] = useState<any>([])
  const [verFood, setVerFood] = useState <any>([])
  const [events, setEvents] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [urlset, setUrl] = useState (false)
  const [getIdRoutines, setGetIdRoutines] = useState<any>([])
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [rndFoods, setrndFoodsData] = useState<CardData[]>([]);

  console.log(
    modalIsOpen
  );
  console.log(rndFoods);
  console.log(rndExercises);
  
  
  
  interface selectedExers {
    datePlan: string,
    idActivities: number,
    series: number,
    repetitions: number
  }

  interface selectedAliments {
    datePlan: string,
    id: number,
    portion: string,
    name: string
  }
     
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const comment = {
      comment: feedback
    };

    console.log(comment);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/trainees/comment`, comment, {
        headers: { "x-access-token": key }
      })
      .then((response) => {
        alert("Feedback sent");
        setFeedback("");
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending the feedback, try again");
      });
  } 

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key }
      })
      .then((res) => {
        setUser1({
          display_name: ` ${res.data.first_name}  ${res.data.last_name}`,
          userImage: res.data.imgURL,
          trainer: ` ${res.data.membership.planTrainee.trainer.membership.user.first_name} ${res.data.membership.planTrainee.trainer.membership.user.last_name}`,
          planStart: `Plan starting date: ${res.data.membership.startDate}`,
          planEnd: `Plan finishing date: ${res.data.membership.finishDate}`,
          trainerPhone:
            res.data.membership.planTrainee.trainer.membership.user.phone
        }),
        setData(res.data);
      })

  }, []);
  

  useEffect(() => {
    if (data) {
      extractIds(data)
    }
    
  }, [data])

  useEffect (() => {
    if(idAliment && idExercise){
    groupByDate(setSortedAliments(idAliment)),
   groupByDateExer(setSortedExercises(idExercise))}
  }, [idAliment, idExercise])

  
  useEffect(() => {
    const exerciseEvents = verRutina.map((day: any) => {
      const { date, activities } = day;

      const start = moment(`${date}T00:00:00Z`).toDate();
      const end = moment(`${date}T00:00:00Z`).toDate();
      return {
        title: 'Rutina',
        start,
        end,
        activities
      };
    });

    const FoodEvents = verFood.map((day: any) => {
      const { date, meals } = day;

      const start = moment(`${date}T00:00:00Z`).toDate();
      const end = moment(`${date}T00:00:00Z`).toDate();
      return {
        title: 'Diet',
        start,
        end,
        meals
      };
    });

    const allEventos = FoodEvents.concat(exerciseEvents)
    setEvents(allEventos);
  }, [verRutina, verFood]);



  const extractIds = async(data: any) => {
    const datos = await data.membership.trainee.plans.map((e: any) => e)
    const selectedExercises = await datos.map((plan: any) => {
    const activities =  plan.ActivitiesPlans.map((activity: any) => ({
    datePlan: plan.datePlan,
    idActivities: activity.idActivity,
    series: activity.series,
    repetitions: activity.repetitions
  }));
  return activities;
});

setIdExercise(selectedExercises);


const selectedAliments = await datos.map((plan: any) => {
   const aliments = plan.AlimentsPlans.map((aliment: any) => ({
    datePlan: plan.datePlan,
    id: aliment.idAliment,
    portion: aliment.portion,
    time: aliment.time }));
  return aliments;
});
setIdAliment(selectedAliments);

  };
  
 const groupByDate = async(data : any) => {
  const data1 = await idAliment;
  const groupedData = new Map();
  
  data1?.forEach((day: any) => {
    day.forEach((meal:any) => {
      if (groupedData.has(meal.datePlan)) {
        const existingDay = groupedData.get(meal.datePlan);
        existingDay.push({
          id: meal.id,
          portion: meal.portion,
          time: meal.time
        });
      } else {
        groupedData.set(meal.datePlan, [{
          id: meal.id,
          portion: meal.portion,
          time: meal.time
        }]);
      }
    });
  });

  const result = Array.from(groupedData, ([date, meals]) => ({ date, meals }));

   setVerFood(result);
 }
  
const groupByDateExer = async (data : any) => {
  const data2 = await idExercise;
  const groupedData = new Map();
  data2?.forEach((day: any) => {
    day.forEach((activity: any) => {
      if (groupedData.has(activity.datePlan)) {
        const existingDay = groupedData.get(activity.datePlan);
        existingDay.push({
          idActivities: activity.idActivities,
          series: activity.series,
          repetitions: activity.repetitions
        });
      } else {
        groupedData.set(activity.datePlan, [{
          idActivities: activity.idActivities,
          series: activity.series,
          repetitions: activity.repetitions
        }]);
      }
    });
  });

  const result = Array.from(groupedData, ([date, activities]) => ({ date, activities }));
 setVerRutina(result);
}

  const fetchDataModal = async () => {
    try {
      let url = urlset ? `${process.env.NEXT_PUBLIC_API_URL}/activity` : `${process.env.NEXT_PUBLIC_API_URL}/aliment`
      console.log(url);
      console.log(getIdRoutines);
     
      if(url == `${process.env.NEXT_PUBLIC_API_URL}/activity`) {
        let exercisesArray: any = []
      
        for( let i = 0; i < getIdRoutines.length; i++) {
          await axios (`${url}/${getIdRoutines[i].idActivities}`, {headers : {"x-access-token": key}})
          .then((data) => exercisesArray.push(data.data));
          
        }
        console.log(exercisesArray);
        
        setRndExercises(exercisesArray)
      }  

      else if (url == `${process.env.NEXT_PUBLIC_API_URL}/aliment` ) {
        let FoodArray : any = []; 
        for( let i = 0; i < getIdRoutines.length; i++) {
          await axios( `${url}/${getIdRoutines[i].id}`, {headers : {"x-access-token": key}})
          .then((data) => FoodArray.push(data.data))
        }
        setrndFoodsData(FoodArray)

      }
          
    
    }
   catch (error) {
    console.log(error);
    
  }
  }
 useEffect(() => {

    fetchDataModal()

 }
     , [modalIsOpen === true])

  const localizer = momentLocalizer(moment)

  function handleFeedbackChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(event.target.value);
  } 
  const handleSelectCalendar = (event : any) => {
    if (event.title === 'Rutina') {
      const rutinaReturn = event.activities
      setUrl(true)
      setModalIsOpen(true)
      setGetIdRoutines(rutinaReturn)
    } else if (event.title === 'Diet'){
      const ComidaReturn = event.meals
      console.log(ComidaReturn)
      setUrl(false)
      setModalIsOpen(true)
      setGetIdRoutines(ComidaReturn)
    }
  } 
  
  return (
    <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed -z-20">
      <div className="mt-20 bg-black/60 -z-10 border-transparent border-2">
        <div>
          <Link
            href="/dataupdate"
            className="lg:left-[55vw] absolute left-[70vw] top-[17rem]"
          >
            <FiEdit size={20} />
          </Link>
        </div>
        {/* <ProgressBar /> deshabilitada temporalmente*/}
        <div className=" border-transparent border-2  h-[40rem] mt-10">
          <img
            className="rounded-full w-40 h-40"
            src={user1?.userImage}
            alt=""
            style={{ margin: "0 auto" }}
          ></img>
          <div className=" border-transparent mt-5 border-2 h-[20-vh] text-center">
            <h1 className="text-3xl font-medium border-400">
              {user1?.display_name}
            </h1>
            <h3 className="text-lg font-medium">{user1?.planStart}</h3>
            <h3 className="text-lg font-medium">{user1?.planEnd}</h3>
          </div>
          <Link
            href="/trainee/health-data"
            className="lg:left-[55vw] flex flex-row justify-center underline"
          >
            Click here to complete all your stats
          </Link>
          <div className="top-0 right-0 border-transparent flex flex-col items-center mt-10">
            <h2 className="text-3xl font-medium ">Trainer: {user1?.trainer}</h2>
            <Rating />
            <div className="mb-4 bg-black/50 backdrop-blur-md rounded-lg p-6">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <label
                  className="block font-bold mb-2 pt-6 text-white"
                  htmlFor="feedback"
                >
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Write your feedback here."
                  className="resize-none w-[15vw]"
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
            <a
              className="underline"
              href={`https://wa.me/${user1?.trainerPhone}`}
            >
              Click here to contact me via WhatsApp!
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/food`}
            className=" text-center mb-10 mt-10 text-xl hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300 "
          >
            Food Library
          </Link>
          <div className="bg-gradient-to-r from-gray-800 via-orange-500 to-gray-800">
            <div className="bg-[url('/bgs/logoblack.png')] bg-contain bg-no-repeat bg-center ">
              <Calendar
                localizer={localizer}
                events={events.map((event: any) => ({
                  start: new Date(event.start),
                  end: new Date(event.end),
                  title: event.title,
                  meals: event.meals ? event.meals : '',
                  activities: event.activities ? event.activities : ''
                }))}
                onSelectEvent={handleSelectCalendar}
                style={{ height: 500, margin: "50px" }}
                defaultView="agenda"
                views={{ month: false, week: false, day: true, agenda: true }}
                className="text-3xl text-white"
              />
              <Modal ariaHideApp={false} isOpen={modalIsOpen} className='flex flex-col justify-center text-center h-[80vh]'>
              <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mx-auto px-9">
            {rndExercises.length > 1
              ? rndExercises.slice(0, 30).map((ex) => {
                  return (
                    <li className="w-auto rounded-lg p-4 m-5 bg-black">
                      <Image
                        className="filter invert"
                        src={ex.gifUrl}
                        alt=""
                        width={300}
                        height={300}
                      />
                      <p>Name: {ex.name}</p>
                      <p></p>
                    </li>
                  );
                })
              : rndFoods?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="w-auto border border-white bg-black bg-opacity-50 backdrop-blur-md p-2 m-2"
                    >
                      <h2>{item.dataType}</h2>
                      <p className="bg-stone-900 flex justify-center">
                        {item.description}
                      </p>
                      <div className="flex w-[94%]  m-4">
                        <div className=" w-[50%]">
                          <p>
                            Protein: {item.proteinAmount} {item.proteinUnit}
                          </p>
                          <p>
                            Carbs: {item.carbohydrateAmount}{" "}
                            {item.carbohydrateUnit}
                          </p>
                          <p>
                            Fat: {item.fatTotalAmount} {item.fatTotalUnit}
                          </p>
                        </div>
                        <div className=" w-[50%]">
                          <p>
                            Sugars: {item.sugarsAmount} {item.sugarsUnit}
                          </p>
                          <p>
                            Sodium: {item.sodiumAmount} {item.sodiumUnit}
                          </p>
                        </div>
                        <div className=" w-[50%]">
                          <p>
                            Cholesterol: {item.cholesterolAmount}{" "}
                            {item.cholesterolUnit}
                          </p>
                          <p>
                            Energy: {item.energyAmount} {item.energyUnit}
                          </p>
                        </div>
                      </div>
                     
                    </li>
                  );
                })}
          </ul>
          <button className="text-lg hover:text-yellow-600 border-2 bg-slate-600 hover:border-none hover:bg-gray-800 items-center w-20 ml-2 self-center rounded-xl" onClick={() => (
             setModalIsOpen(false),
             setRndExercises([]),
             setrndFoodsData([]))} >Close Details</button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithPrivateRouter(Index)
