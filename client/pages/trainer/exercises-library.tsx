import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {ExerciesResType} from '@/types/components/libraries'
import useParam1Store from "@/store/state-lb";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';



type Option = {
  value: string;
  label: string;
  subOptions: string[];
};

const options: Option[] = [
  {
    value: "target",
    label: "Target",
    subOptions: ["pectorals", "abs", "lats", "hamstrings", "triceps", "delts", "forearms", "calves", "cardiovascular system", "quads", "biceps", "upper back", "glutes", "traps", "spine" ],
  },
  {
    value: "bodyPart",
    label: "Body Part",
    subOptions: ["waist", "back", "chest", "upper legs", "upper arms", "shoulders", "lower arms", "lower legs", "cardio"],
  },
  {
    value: 'equipment',
    label: 'Equipment',
    subOptions: ["body weight", "cable", "leverage machine", "assisted", "barbell", "medicine ball", "stability ball", "dumbbell", "ez barbell", "kettlebell", "weighted", "sled machine", "smith machine", "band"]
  }
];
export default function ExercisesLibrary() {
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const { setFirstParam, setSecondParam, firstParam, secondParam } = useParam1Store();
  const [selectedExercises, setSelectedExercises] = useState<Array<AddedExercise>>([]);
  const localizer = momentLocalizer(moment);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  


  interface AddedExercise {
    id: number,
    name: string,
    target: string,
    bodyPart: string,
    gifUrl: string,
  }

  const handleClick = () => {
    const dataToSend = {
      date: selectedDate?.getTime(), // convertir la fecha en un número para enviarla
      activities: selectedExercises.map((ex) => ({
        id: ex.id,
        series: parseInt((document.getElementById(`series-${ex.id}`) as HTMLSelectElement).value),
        repetitions: parseInt((document.getElementById(`repeticiones-${ex.id}`) as HTMLSelectElement).value)
      }))
    };
    
    // Aquí se enviaría la información a través de una solicitud HTTP
    console.log(dataToSend);
  }

  const handleAddExercise = (ex: AddedExercise) => {
    setSelectedExercises([...selectedExercises, ex]);
  };
 
  const handleSelect = ({ start }: { start: Date }) => {
    setSelectedDate(prevSelectedDate => start);
  };
  
  
  
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);
    setSelectedSubOption("");
    setShowSubOptions(true);
  };

  const handleSubOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubOption(event.target.value);
  };

  const fetchData = async (firstParam: string, secondParam: string, page: number) => {
    try {
      let url = "http://localhost:3001/activity?page=" + page;
      if (firstParam && secondParam) {
        url = `http://localhost:3001/activity/filter/${firstParam}/${secondParam}?page=${page}`;
      }
      const { data } = await axios(url);
      setRndExercises(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setFirstParam(selectedOption);
    setSecondParam(selectedSubOption);
    setCurrentPage(1);
    fetchData(selectedOption, selectedSubOption, currentPage);
  };

  useEffect(() => {
    fetchData(firstParam, secondParam, currentPage);
  }, [currentPage, firstParam, secondParam]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  console.log(selectedExercises)

  return (
      <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed  backdrop-blur-sm">       
      <div className="h-auto pt-[72px]">
      <div className="mx-auto w-full flex justify-around px-36 py-8  bg-gray-900 bg-opacity-50">
        <div> 
         <label className="pr-0" htmlFor="option-select">Select an option:</label>
        <select className="pl-0" id="option-select" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
      {showSubOptions && (
        <div>
          <label htmlFor="sub-option-select">Select a sub-option:</label>
          <select id="sub-option-select" value={selectedSubOption} onChange={handleSubOptionChange}>
            <option value="">Select a sub-option</option>
            {options
              .find((option) => option.value === selectedOption)
              ?.subOptions.map((subOption) => (
                <option key={subOption} value={subOption}>
                  {subOption}
                </option>
              ))}
          </select>
        </div>
      )}
      <button onClick={handleButtonClick} className="hover:text-amber-500">Filter</button>
      
    </div>

      <div className="flex justify-around py-8 px-12">
       
            <div className="h-[220px] backdrop-blur-md p-4 border border-white ">
              <Calendar
                localizer={localizer}
                defaultDate={currentDate}
                views={['month']}
                onView={() => {}}
                onNavigate={(date) => setCurrentDate(date)}
                selectable
                onSelectSlot={handleSelect}
                className="text-white"
                />
            </div>
            <div className="backdrop-blur-md border border-white h-[56px] my-auto text-center px-2"> <p className="text-center py-2">Fecha seleccionada: {selectedDate && selectedDate.toString()}</p> </div>
              <ul className="backdrop-blur-md border border-white h-auto w-[350px] overflow-hidden flex flex-wrap">
               <p className="m-2 py-2 mx-5 top-0 left-0">Mis ejercicios:</p> 
               <button onClick={handleClick} className="hover:text-cyan-400 absolute mx-5 text-center right-0 m-2  backdrop-blur border border-white pt-2 px-3">Save Routine</button>
                {selectedExercises
                  ? selectedExercises.map((ex) =><li className='block w-[350px] px-5 py-1' key={ex.id}>'{ex.name}' <div>
                  <label htmlFor={`repeticiones-${ex.id}`}>Repeticiones:</label>
                  <select name={`repeticiones-${ex.id}`} id={`repeticiones-${ex.id}`}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='Failure'>Failure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`series-${ex.id}`}>Series:</label>
                  <select name={`series-${ex.id}`} id={`series-${ex.id}`}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                </div></li> )
                  : ''}
              </ul>
              
      </div>

                
        <div className="flex justify-between items-center w-full py-[115px] px-96">  
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
        <div className="font-bold w-[35px] border border-white rounded-full py-2 backdrop-blur-lg text-center">{currentPage}</div>
        <button
          onClick={nextPage}
          disabled={rndExercises.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
      <div className="flex flex-wrap gap-5">
        <ul className="grid grid-cols-4 mx-auto px-9">
          {rndExercises.slice(0, 30).map((ex) => {return (
            <li className="w-auto rounded-lg p-4 m-5 bg-black">
              <Link
          href={"/trainer/exercise/" + ex.id}
          replace
          key={ex.id}
          className="rounded-sm bg-slate-500"
        >
          <p>{firstParam? `${firstParam}:` : 'Body Part:'} {secondParam? secondParam : ex.bodyPart}</p>
          <Image className="filter invert" src={ex.gifUrl} alt="" width={300} height={300} />
          <p>Name: {ex.name}</p>
        </Link>
        <button className="hover:text-cyan-400" onClick={() => handleAddExercise(ex)}>Add</button>
            </li>
          )})}
        
        </ul>
      </div>
      <div className="flex justify-between items-center w-full py-[115px] px-36">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
          <div className="text-xl font-bold">{currentPage}</div>
        <button
          onClick={nextPage}
          disabled={rndExercises.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
      </div>
      
  </div>
    
  );
}
