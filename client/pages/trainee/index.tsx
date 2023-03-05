import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getCookie, setCookie } from "@/utils/cookieHandler";
// import ProgressBar from "@/components/TraineeProgressbar";
import Rating from "@/components/StarRating";
import TextAreaInput from "@/components/inputs/TextAreaInput";

export default function Index() {
  const [user, setUser] = useAuthState(auth);
  const photo = user?.photoURL;
  const name = user?.displayName;
  const key = getCookie("token");
  const [user1, setUser1] = useState<any>();
  const [feedback, setFeedback] = useState("");

  function handleFeedbackChange(event) {
    setFeedback(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const comment = {
      comment: feedback
    };

    console.log(comment)
    axios
      .post("http://localhost:3001/trainees/comment", comment, {
        headers: { "x-access-token": key }
      })
      .then((response) => {
        console.log(response);
        alert("Feedback sent");
        setFeedback("");
      })
      .catch((error) => {
        console.log(error);
        alert("Error sending the feedback, try again");
      });
  }

  console.log(key);
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        console.log(data.data);
        console.log(
          data.data.membership.planTrainee.trainer.membership.user.phone
        );
        setUser1({
          display_name: ` ${data.data.first_name}  ${data.data.last_name}`,
          userImage: data.data.imgURL,
          trainer: ` ${data.data.membership.planTrainee.trainer.membership.user.first_name} ${data.data.membership.planTrainee.trainer.membership.user.last_name}`,
          planStart: `Plan starting date: ${data.data.membership.startDate}`,
          planEnd: `Plan finishing date: ${data.data.membership.finishDate}`,
          trainerPhone:
            data.data.membership.planTrainee.trainer.membership.user.phone
        });
      });
  }, []);

  console.log(user1);

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });

  const events = [
    {
      title: "Cardio",
      allDay: true,
      start: new Date(2023, 2, 10),
      end: new Date(2023, 2, 10)
    },
    {
      title: "Lifting",
      allDay: true,
      start: new Date(2023, 2, 24),
      end: new Date(2023, 2, 24)
    },
    {
      title: "Legs",
      allDay: true,
      start: new Date(2023, 2, 7),
      end: new Date(2023, 2, 7)
    }
  ];

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("There is already an activity on that date, it will clash.");
        // break
        return;
      }
    }

    const parsedNewEvent = {
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      allDay: true
    };

    setAllEvents((prev) => [...prev, parsedNewEvent]);
  }

  return (
    <div className="flex flex-col">
      <div className="mt-20 grid grid-cols-[200px_minmax(60vw,_1fr)_100px] items-start border-blue-300 border-2">
        {/* <ProgressBar /> deshabilitada temporalmente*/} 
        <div className="flex border-red-500 border-2 w-[25vw]">
          <img
            className="rounded-full w-40 h-40"
            src={user1?.userImage}
            alt=""
            style={{ margin: "0 auto" }}
          ></img>
        <div className="flex-col border-red-300 border-2 h-[20-vh]  w-[20vw] text-center">
          <h1 className="text-3xl border-400">{user1?.display_name}</h1>
          <h3 className="text-lg">{user1?.planStart}</h3>
          <h3 className="text-lg">{user1?.planEnd}</h3>
          </div>
          <div className="flex-col absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2 border-2 w-80 mr-[12vw]">
            <h2 className="text-3xl">Trainer: {user1?.trainer}</h2>
            <Rating />
            <div className="flex-col mb-4">
            <form onSubmit={handleSubmit}>
              <label
                className="block font-bold mb-2 text-white"
                htmlFor="feedback"
              >
                Feedback
              </label>
              <textarea
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Write your feedback here."
              />
              <button type="submit">Enviar</button>
            </form>
            </div>
            <a href={`https://wa.me/${user1?.trainerPhone}`}>
              Contact me via WhatsApp!
            </a>
          </div>
        </div>
      </div>
      <div>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/food/`}
          className="text-lg hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300"
        >
          Food Library
        </Link>
        <div className="bg-gradient-to-r from-gray-800 via-orange-500 to-gray-800">
          <div className="bg-[url('/bgs/logoblack.png')] bg-contain bg-no-repeat bg-center ">
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "50px" }}
              defaultView="agenda"
              views={{ month: false, week: false, day: true, agenda: true }}
              className="text-3xl text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
