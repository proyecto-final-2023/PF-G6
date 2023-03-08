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

export default function Index() {
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
  const [sortedAliments, setSortedAliments] = useState<any>();
  const [sortedExercises, setSortedExercises] = useState<any>();
  const [verRutina, setVerRutina] = useState(false)
  
  // const [events, setEvents] = useState<any>();
  
  console.log(idAliment)
  console.log(sortedAliments)
  console.log(sortedExercises)

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
  
  const exerciseEvents = sortedExercises?.map((day: any) => ({
    title: 'Rutina',
    start: new Date(day.date),
    end: new Date(day.date),
    activities: day.activities
  }));
  
  const mealsEvents = sortedAliments?.map((day: any) => ({
    title: 'Comidas',
    start: new Date(day.date),
    end: new Date(day.date),
    meals: day.meals
  }));

  const allEvents = exerciseEvents?.concat(mealsEvents);
  console.log(allEvents)
  function handleFeedbackChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(event.target.value);
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

// Guardar la información en el estado idAliment
setIdAliment(selectedAliments);

  };
  
  
  function groupByDate(data: any) {
    if (!data) {
      console.log('data is undefined');
      return;
    }
  
    const groupedData = new Map();
  
    data.forEach((day: any) => {
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
    
    return result;
  }
  
  function groupByDateExer(data: any) {
    if (!data) {
      console.log('data is undefined');
      return;
    }
  
    const groupedData = new Map();
  
    data.forEach((day: any) => {
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
  
    return result;
  }
  
  
  

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key }
      })
      .then((data) => {
        setUser1({
          display_name: ` ${data.data.first_name}  ${data.data.last_name}`,
          userImage: data.data.imgURL,
          trainer: ` ${data.data.membership.planTrainee.trainer.membership.user.first_name} ${data.data.membership.planTrainee.trainer.membership.user.last_name}`,
          planStart: `Plan starting date: ${data.data.membership.startDate}`,
          planEnd: `Plan finishing date: ${data.data.membership.finishDate}`,
          trainerPhone:
            data.data.membership.planTrainee.trainer.membership.user.phone
        }),
       extractIds(data.data)
       setSortedAliments(groupByDate(idAliment)),
       setSortedExercises(groupByDateExer(idExercise))
      
       ;
      })
  }, []);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  };

  const localizer = momentLocalizer(moment)

  const handleSelectCalendar = (event : any) => {
    if (event.title === 'Rutina') {
      const rutinaReturn = event.activities
      console.log(rutinaReturn)
    } else if (event.title === 'Comidas'){
      const ComidaReturn = event.meals
      console.log(ComidaReturn)
    }
  }
  
  return (
    <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed -z-20">
      <div className="pt-20 bg-black/60 -z-10 border-transparent border-2">
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
            <h2 className="text-3xl font-medium text-center">Trainer: {user1?.trainer}</h2>
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
            className=" text-center mb-10 mt-20 text-xl hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300 "
          >
            Food Library
          </Link>
          <div className="bg-gradient-to-r from-gray-800 via-orange-500 to-gray-800">
            <div className="bg-[url('/bgs/logoblack.png')] bg-contain bg-no-repeat bg-center ">
              <Calendar
                localizer={localizer}
                events={allEvents}
                onSelectEvent={handleSelectCalendar}
                style={{ height: 500, margin: "50px" }}
                defaultView="agenda"
                views={{ month: false, week: false, day: true, agenda: true }}
                className="text-3xl text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
