import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import myImage from "../../public/tail-imgs/gym-bg.jpg";
import Link from "next/link";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// type newEvent = {
//   title: string;
//   start: string;
//   end: string;
// }

export default function Index() {
  // const [progress, setProgress] = useState("0");
  const percentage = 80;

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [
    {
      title: "Cardio",
      allDay: true,
      start: new Date(2023, 2, 10),
      end: new Date(2023, 2, 10),
    },
    {
      title: "lifting",
      allDay: true,
      start: new Date(2023, 2, 24),
      end: new Date(2023, 2, 24),
    },
    {
      title: "Legs",
      allDay: true,
      start: new Date(2023, 2, 7),
      end: new Date(2023, 2, 7),
    },
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
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <>
      <div className="flex justify-around align-middle h-[30vh]">
        <div className="my-auto -mx-40">
          <CircularProgressbar
            className="w-40 h-40 my-20"
            value={percentage}
            text={`${percentage}%`}
          />
        </div>
        <h1 className="my-auto">
          <Link href="">
            <p>My profile</p>
          </Link>
        </h1>
        <div>{/* <Image src={myImage} alt="" className="bg-cover" /> */}</div>
      </div>
      <div>
        <h1 className="flex justify-center text-5xl pb-4">Schedule</h1>
        <h2 className="flex justify-center text-2xl pb-4">Add New Event</h2>
        <div className="mx-auto">
          <div className="flex-col justify-center pl-[42vw]">
            <input
              type="text"
              placeholder="Add Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-[18vw] justify-center"
            />

            <DatePicker
              placeholderText="Start Date"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
              className="w-[5vw] justify-center"
            />
            <DatePicker
              placeholderText="End Date"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
              className="w-[5vw] justify-center"
            />
            <button
              className=" my-8 text-center relative hover:text-orange-500 border-2 bg-slate-600 w-20 rounded-xl hover:w-40 ease-in-out duration-300"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 via-orange-500 to-gray-800">
          <div className="bg-[url('/bgs/logoblack.png')] bg-contain bg-no-repeat bg-center ">
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px", backgroundColor:'transparent', }}
            defaultView="day"
            views={{month: false, week: false, day: true, agenda: false}}   
            className='text-3xl text-white'
          />
          </div>
        </div>
      </div>

      {/* <div>
        <div>
          <h1 className="flex justify-center text-5xl">Schedule</h1>
          <h2 className="flex justify-center text-2xl">Add new Event</h2>
          <div className="flex justify-center ml-[10vw] gap-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Add title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-[20vw] mr-2 rounded-md"
              />
              <DatePicker
                placeholderText="Start Date"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start: start })}
                className="w-[5vw] rounded-md mx-auto"
              />
              <DatePicker
                placeholderText="End Date"
                selected={newEvent.start}
                onChange={(end) => setNewEvent({ ...newEvent, end: end })}
                className="w-[5vw] rounded-md mx-auto"
              />
            </div>
          </div>
          <div className="mx-auto my-8 text-center hover:text-orange-500 border-2 bg-slate-600 w-20 rounded-xl hover:w-40 ease-in-out duration-300">
            <button onClick={handleAddEvent}>Add Event</button>
          </div>
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            className="bg-orange-400 text-lg inline-block"
          />
        </div>
      </div> */}
    </>
  );
}
