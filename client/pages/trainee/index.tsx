import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import myImage from '../../public/tail-imgs/gym-bg.jpg'
import Link from "next/link";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


export default function Index() {
  const [progress, setProgress] = useState("0");
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calendarEl = calendarRef.current!;
      const calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        }
      });

      calendar.render();
    }
  }, []);

  return (
    <>
      <ul className="flex justify-around align-middle h-[30vh]">
        <li className="my-auto">
          <h1>Progress:{progress}%</h1>
        </li>
        <li className="my-auto">
          <Link href=''>
            <p>My profile</p>
          </Link> 
        </li>
        <li>
          <Image src={myImage} alt="" className="h-[30vh] w-full"/>
        </li>
      </ul>
      <div>
        
      </div>
      <div>
        <div  className="flex items-center justify-center h-[10vh]">
          <h2>
           My events
          </h2>
        </div> 
        <div ref={calendarRef} className="px-10 py-10" ></div>
      </div>   
    </>
  )
}




