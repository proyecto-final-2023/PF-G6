import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {ExerciesResType} from '@/types/components/libraries'
import useParam1Store from "@/store/state-lb";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CardData } from "@/components/Food";
import { DiscoveryError } from "@auth0/nextjs-auth0/dist/auth0-session/utils/errors";





export default function ExercisesLibrary() {
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [data, setData] = useState<CardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const { setFirstParam, setSecondParam, firstParam, secondParam } = useParam1Store();
  const [selectedExercises, setSelectedExercises] = useState<Array<AddedExercise>>([]);
  const localizer = momentLocalizer(moment);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAlimentEndpoint, setIsAlimentEndpoint] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFood, setSelectedFood] = useState<Array<AddedFood>>([])


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
  
  interface AddedExercise {
    id: number,
    name: string,
    target: string,
    bodyPart: string,
    gifUrl: string,
  }
  interface AddedFood {
    id: number,
    description: string,
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

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  const handleAddExercise = (ex: AddedExercise) => {
    setSelectedExercises([...selectedExercises, ex]);
  };
 
  const handleAddFood = (item: AddedFood) => {
    setSelectedFood([...selectedFood, item]);
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


  const fetchData = async (firstParam?: string, secondParam?: string, page?: number, isAlimentEndpoint?: boolean, name?:string) => {
    try {
      let url = isAlimentEndpoint 
        ? `${process.env.NEXT_PUBLIC_API_URL}/aliment?page=${page}&name=${searchValue}`
        : `${process.env.NEXT_PUBLIC_API_URL}/activity?page=${page}&name=${searchValue}`;
  
      if (firstParam && secondParam && !isAlimentEndpoint) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/activity/filter/${firstParam}/${secondParam}?page=${page}`;
      }
  
      const { data } = await axios(url);
      console.log(data)
      let seted = isAlimentEndpoint ? (setData(data), setRndExercises([])) : setRndExercises(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setFirstParam(selectedOption);
    setSecondParam(selectedSubOption);
    setCurrentPage(1);
    fetchData(selectedOption, selectedSubOption, currentPage, isAlimentEndpoint, searchValue);
  };

  const handleSearch = () => {
    console.log(searchValue)
    fetchData(firstParam, secondParam, currentPage, isAlimentEndpoint, searchValue);
  }
  
  const deleteFilterHandler = () => {

    secondParam? ( setFirstParam(''),
    setSelectedOption(''),
    setSelectedSubOption(''),
    setSearchValue(''),
    setCurrentPage(1),
    setSearchValue(''),
    fetchData(undefined, undefined, 1)  ) : null
   
  }
  
  useEffect(() => {
    fetchData(firstParam, secondParam, currentPage, isAlimentEndpoint, searchValue);
  }, [currentPage, firstParam, secondParam, isAlimentEndpoint]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };


  return (
      <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed">       
      <div className="h-auto pt-[82px]">
       { rndExercises.length >= 1 ? <div className="mx-36 flex justify-around px-36 py-8 backdrop-blur-md bg-black bg-opacity-50 border  border-white">
        <div className="flex"> 
        <div className=" px-4">
        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by name..." className="w-[150px] bg-transparent text-white border px-1 border-white focus:w-[180px] duration-[150ms]" />
        <button onClick={handleSearch} className="border border-l-0 px-2 border-white hover:text-amber-500" >Buscar</button>
        </div>
         <label className="px-2" htmlFor="option-select">Select a filter:</label>
        <select className="pl-0 border bg-black bg-opacity-50 text-white" id="option-select" value={selectedOption} onChange={handleOptionChange}>
        <option className="border bg-black bg-opacity-50" value="">Target/Body Part/Equipment</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="backdrop-blur-md border bg-black bg-opacity-50">
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
      <button onClick={deleteFilterHandler} className="hover:text-red-400">Delete Filters</button>
      
    </div> : <div className="mx-36 flex justify-around px-36 py-8 backdrop-blur-md bg-black bg-opacity-50 border  border-white" >
      
      </div>} 
      

      <div className="flex justify-around py-8 px-20">
       
            <div className="h-[220px] backdrop-blur-md bg-black bg-opacity-50 p-4 border border-white">
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
            <div className="backdrop-blur-md bg-black bg-opacity-50 border  border-white h-[56px] my-auto text-center px-2"> <p className="text-center py-3">Fecha seleccionada:  {selectedDate && formatDate(selectedDate)}</p> </div>
              <ul className="backdrop-blur-md  bg-black bg-opacity-50 border border-white h-auto w-[350px] overflow-hidden flex flex-wrap">
               <p className="m-2 py-2 mx-5 top-0 left-0">My routine:</p> 
               <button onClick={handleClick} className="hover:text-amber-500 absolute mx-5 text-center right-0 m-2  pt-2 px-3">Save Routine</button>
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
              <ul className="backdrop-blur-md  bg-black bg-opacity-50 border border-white h-auto w-[350px] overflow-hidden flex flex-wrap">
              <p className="m-2 py-2 mx-5 top-0 left-0">My diet:</p> 
              {selectedFood ? selectedFood.map((item) => {return(
                <li id={`${item.id}`} className="block w-[350px] px-5 py-1">
                  {item.description}
                  <div>
                    <label htmlFor={`portion-${item.id}`}>Portions:</label>
                    <select name={`portion-${item.id}`} id={`portion-${item.id}`}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    </select>
                  </div>
                </li>
              )}) : ''}
              </ul>
           </div>

        <div className="mx-auto pl-36">
          <button className="mx-auto text-center border border-white bg-black bg-opacity-50 backdrop-blur-md px-2 py-1 hover:text-amber-500" onClick={() => setIsAlimentEndpoint(!isAlimentEndpoint)}>
           {isAlimentEndpoint ? "Switch to Activity" : "Switch to Aliment"}
          </button>
        </div>   
        <div className="flex justify-between items-center w-full py-10 px-96">  
          <button onClick={prevPage} disabled={currentPage === 1} className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center" >
            PREV
          </button>
        <div className="font-bold w-[35px] border border-white rounded-full py-2 backdrop-blur-lg bg-black bg-opacity-50 text-center">{currentPage}</div>
          <button onClick={nextPage}  className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center">
            NEXT
          </button>
        </div>
      
      <div className="flex flex-wrap gap-5">
        <ul className="grid grid-cols-4 mx-auto px-9">
          {
            rndExercises.length > 1 ? 
            
            rndExercises.slice(0, 30).map((ex) => {return (
              <li className="w-auto rounded-lg p-4 m-5 bg-black">
            
            <Image className="filter invert" src={ex.gifUrl} alt="" width={300} height={300} />
            <p>Name: { ex.name }</p>
          
          <button className="hover:text-cyan-400" onClick={() => handleAddExercise(ex)}>Add</button>
              </li>
            )}) : data?.map((item) => {return (
              <li key={item.id} className="w-auto border border-white bg-black bg-opacity-50 backdrop-blur-md p-2 m-2">
              
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
                  Carbs: {item.carbohydrateAmount} {item.carbohydrateUnit}
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
                  Cholesterol: {item.cholesterolAmount} {item.cholesterolUnit}
                </p>
                <p>
                  Energy: {item.energyAmount} {item.energyUnit}
                </p>
              </div>
              <button className="hover:text-cyan-400" onClick={()=> handleAddFood(item)}>Add</button>
            </div>
          
              </li>
            )}) 
          }
        
        </ul>
      </div>
      <div className="flex justify-between items-center w-full py-10 px-96">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center"
        >
          PREV
        </button>
          <div className="font-bold w-[35px] border border-white rounded-full py-2 backdrop-blur-lg bg-black bg-opacity-50 text-center">{currentPage}</div>
        <button
          onClick={nextPage}
          
          className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center"
        >
          NEXT
        </button>
      </div>
      </div>
      
  </div>
    
  );
}
