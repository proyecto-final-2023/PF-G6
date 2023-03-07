import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ExerciesResType } from "@/types/components/libraries";
import useParam1Store from "@/store/state-lb";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CardData } from "@/components/Food";
import { DiscoveryError } from "@auth0/nextjs-auth0/dist/auth0-session/utils/errors";
import { getCookie } from "@/utils/cookieHandler";
import { access } from "fs";





export default function ExercisesLibrary() {
  const { setFirstParam, setSecondParam, firstParam, secondParam } = useParam1Store();
  const [rndExercises, setRndExercises] = useState<ExerciesResType[]>([]);
  const [data, setData] = useState<CardData[]>([]);
  const [user, setUser] = useState<Array<selectedUser>>([])
  const [selectedExercises, setSelectedExercises] = useState<Array<AddedExercise>>([]);
  const [selectedFood, setSelectedFood] = useState<Array<AddedFood>>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [isAlimentEndpoint, setIsAlimentEndpoint] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const localizer = momentLocalizer(moment);
  const key = getCookie("token")
  
  


  type Option = {
    value: string;
    label: string;
    subOptions: string[];
  };

  const options: Option[] = [
    {
      value: "target",
      label: "Target",
      subOptions: [
        "pectorals",
        "abs",
        "lats",
        "hamstrings",
        "triceps",
        "delts",
        "forearms",
        "calves",
        "cardiovascular system",
        "quads",
        "biceps",
        "upper back",
        "glutes",
        "traps",
        "spine"
      ]
    },
    {
      value: "bodyPart",
      label: "Body Part",
      subOptions: [
        "waist",
        "back",
        "chest",
        "upper legs",
        "upper arms",
        "shoulders",
        "lower arms",
        "lower legs",
        "cardio"
      ]
    },
    {
      value: "equipment",
      label: "Equipment",
      subOptions: [
        "body weight",
        "cable",
        "leverage machine",
        "assisted",
        "barbell",
        "medicine ball",
        "stability ball",
        "dumbbell",
        "ez barbell",
        "kettlebell",
        "weighted",
        "sled machine",
        "smith machine",
        "band"
      ]
    }
  ];
  interface selectedUser {
    id: number,
    name: string,

  }
  interface AddedExercise {
    id: number;
    name: string;
    target: string;
    bodyPart: string;
    gifUrl: string;
  }
  interface AddedFood {
    id: number;
    description: string;
  }
    
  const handleClick = async () => {
   
   try {
    const selectedUser = user.find((u) => u.name === selectedUsers)
    const dataToSend = {
      idTrainee: selectedUser?.id,
      datePlan: selectedDate?.getTime(), // convertir la fecha en un nÃºmero para enviarla
      activities: selectedExercises.map((ex) => ({
        idActivity: ex.id,
        series: parseInt(
          (document.getElementById(`series-${ex.id}`) as HTMLSelectElement)
            .value
        ),
        repetitions: parseInt(
          (
            document.getElementById(
              `repeticiones-${ex.id}`
            ) as HTMLSelectElement
          ).value
        )
      })),
      aliments: selectedFood.map((item) => ({
        idAliment: item.id,
        portion: parseInt((document.getElementById(`portion-${item.id}`) as HTMLSelectElement).value),
        time: (document.getElementById(`time-${item.id}`) as HTMLSelectElement).value

      }))

    };   
         await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/trainers/plan`, dataToSend, { headers : {"x-access-token": key}} ).then((response) => {
            console.log(response.data)})
            
        } 

    catch (error) {
      console.log(error)
    }
    
  }


  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  const handleAddExercise = (ex: AddedExercise) => {
    setSelectedExercises([...selectedExercises, ex]);
  };

  const handleAddFood = (item: AddedFood) => {
    setSelectedFood([...selectedFood, item]);
  };

  const handleSelect = ({ start }: { start: Date }) => {
    setSelectedDate((prevSelectedDate) => start);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);
    setSelectedSubOption("");
    setShowSubOptions(true);
  };
  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUsers(event.target.value)
  }

  const handleSubOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubOption(event.target.value);
  };


  

  const handleButtonClick = () => {
    setFirstParam(selectedOption);
    setSecondParam(selectedSubOption);
    setCurrentPage(1);
    fetchData(selectedOption, selectedSubOption, currentPage, isAlimentEndpoint, searchValue);

  };

  const handleSearch = () => {
    fetchData(
      firstParam,
      secondParam,
      currentPage,
      isAlimentEndpoint,
      searchValue
    );
  };

  const deleteFilterHandler = () => {

    secondParam? ( setFirstParam(''),
    setSelectedOption(''),
    setSelectedSubOption(''),
    setSearchValue(''),
    setCurrentPage(1),
    setSearchValue(''),
    fetchData(undefined, undefined, 1)  ) : null
   
  }
  const fetchUser = async (key: string) => {
    try {
      const users = await axios(`${process.env.NEXT_PUBLIC_API_URL}/trainers/listTrainees`, {headers: {"x-access-token" : key}})
      const memberships = users.data[0].memberships;
      const selectedUsers: selectedUser[] = [];
      for (let i = 0; i < memberships.length; i++) {
        const membership = memberships[i];
        const userData = membership.user;
        const selectedUser: selectedUser = {
          id: membership.traineeIdTrainee,
          name: `${userData.first_name} ${userData.last_name}`,
        };
        selectedUsers.push(selectedUser);
      }
      
      
      let sets = setUser(selectedUsers);
      
      
    } 
    catch (error) {
      console.log(error)
    }
  } 
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
  useEffect(() => {
    fetchData(firstParam, secondParam, currentPage, isAlimentEndpoint, searchValue);
    fetchUser(key)
  }, [currentPage, firstParam, secondParam, isAlimentEndpoint]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed">
      <div className="h-auto pt-[95px]">
       { rndExercises.length >= 1 ? 
       
        <div className=" flex justify-around  py-8 backdrop-blur-md bg-black bg-opacity-50 border  border-white border-l-0 border-r-0">
        <div className="flex"> 
        <div className=" px-4">
        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by name..." className="w-[150px] bg-transparent text-white border px-1 border-white active:outline-none active:ring-0 focus:w-[180px] duration-[150ms]" />
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
          <label className="px-2" htmlFor="sub-option-select">Select a sub-option:</label>
          <select className="pl-0 border bg-black bg-opacity-50 text-white" id="sub-option-select" value={selectedSubOption} onChange={handleSubOptionChange}>
            <option className="border bg-black bg-opacity-50" value="">Select a sub-option</option>
            {options
              .find((option) => option.value === selectedOption)
              ?.subOptions.map((subOption) => (
                <option key={subOption} value={subOption} className="backdrop-blur-md border bg-black bg-opacity-50">
                  {subOption}
                </option>
              ))}
          </select>
        </div>
      )}
      <button onClick={handleButtonClick} className="hover:text-amber-500">Filter</button>
      <button onClick={deleteFilterHandler} className="hover:text-red-400">Delete Filters</button>
      
    </div> : 
    
    <div className=" flex justify-around py-8 backdrop-blur-md bg-black bg-opacity-50 border border-white border-l-0 border-r-0" >
    <div className=" px-4">
        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search by name..." className="w-[150px] bg-transparent text-white border px-1 border-white focus:w-[180px] duration-[150ms]" />
        <button onClick={handleSearch} className="border border-l-0 px-2 border-white hover:text-amber-500" >Buscar</button>
        </div>
        </div>} 
      

      <div className="flex flex-col gap-4 justify-around w-[80%] mx-[10%] mt-6">
       
            <div className="h-[220px] backdrop-blur-md bg-black bg-opacity-50 border border-white">
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
              <ul className="backdrop-blur-md  bg-black bg-opacity-50 border border-white h-auto  overflow-hidden">
               <p className="m-2 py-2 mx-5 text-center  ">My routine:</p> 
                <div className="flex flex-wrap border justify-center gap-1">
                {selectedExercises && selectedExercises.map((ex) =><li className='min-w-min px-5 py-1' key={ex.id}>Name: '{ex.name}'
                 <div>
                  <label className="px-1" htmlFor={`repeticiones-${ex.id}`}>Repeticiones:</label>
                  <select className="pl-0 border bg-black bg-opacity-50 text-white" name={`repeticiones-${ex.id}`} id={`repeticiones-${ex.id}`}>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='1'>1</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='2'>2</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='3'>3</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='4'>4</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='5'>5</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='6'>6</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='7'>7</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='8'>8</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='9'>9</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='10'>10</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='11'>11</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='12'>12</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='13'>13</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='14'>14</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='15'>15</option>
                    
                  </select>
                </div>
                <div>
                  <label className="px-1" htmlFor={`series-${ex.id}`}>Series:</label>
                  <select className="pl-0 border bg-black bg-opacity-50 text-white" name={`series-${ex.id}`} id={`series-${ex.id}`}>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='1'>1</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='2'>2</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='3'>3</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='4'>4</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='5'>5</option>
                  </select>
                  
                </div></li> )
                 }
                </div>
               
              </ul>
              <ul className="backdrop-blur-md  bg-black bg-opacity-50 border border-white h-auto  overflow-hidden">
              <p className="m-2 py-2 mx-5 text-center ">My diet:</p> 
              <div className="flex flex-wrap border justify-center gap-4">
              {selectedFood ? selectedFood.map((item) => {return(
                <li id={`${item.id}`} className='min-w-min px-5 py-1'>
                  Name: {item.description}
                  <div>
                    <label className="px-1" htmlFor={`portion-${item.id}`}>Portions:</label>
                    <select className="pl-0 border bg-black bg-opacity-50 text-white" name={`portion-${item.id}`} id={`portion-${item.id}`}>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='1'>1</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='2'>2</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='3'>3</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='4'>4</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='5'>5</option>
                    </select>
                    <label className="px-1" htmlFor={`time-${item.id}`}>Time:</label>
                    <select className="pl-0 border bg-black bg-opacity-50 text-white" name={`time-${item.id}`} id={`time-${item.id}`}>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='Break Fast'>Break Fast</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='Lunch'>Lunch</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='Dinner'>Dinner</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='Snack'>Snack</option>
                    <option className="backdrop-blur-md border bg-black bg-opacity-50" value='Dessert'>Dessert</option>
                    
                    </select>
                  </div>
                </li>
              )}) : ''}
              </div>
              
              </ul>
           </div>

        <div className="flex mt-4">
          <button className="mx-auto text-center border border-white bg-black bg-opacity-50 backdrop-blur-md px-2 py-1 hover:text-amber-500" 
            onClick={() =>
                (setIsAlimentEndpoint(!isAlimentEndpoint), setFirstParam(''),
                setSelectedOption(''),
                setSelectedSubOption(''),
                setSearchValue(''),
                setCurrentPage(1),
                setSearchValue(''))}>
           {isAlimentEndpoint ? "Switch to Activity" : "Switch to Aliment"}
          </button>
          <label className="px-2" htmlFor={`trainee`}>Select a Trainee:</label>
        <select className="pl-0 border bg-black bg-opacity-50 text-white" id={`user`} value={selectedUsers} onChange={handleUser}>
        <option className="border bg-black bg-opacity-50" value="">Select a Trainee</option>
        {user && user.map((us) => (
          <option key={us.id} value={us.name} className="backdrop-blur-md border bg-black bg-opacity-50">
            {us.name}
          </option>
        ))}
      </select>
          <button onClick={handleClick} className="mx-auto text-center border border-white bg-black bg-opacity-50 backdrop-blur-md px-2 py-1 hover:text-amber-500">Send Changes</button>
        </div>   
        <div className="pt-8">
            <div className="flex justify-around  py-5 backdrop-blur-md bg-black bg-opacity-50 border  border-white border-l-0 border-r-0">
            <p className="mx-auto text-center px-2 py-1">{isAlimentEndpoint ? "You are viewing the foods" : "You are viewing the exercises"}</p>  
          </div>
        </div>
     
      <div className="flex justify-between items-center w-full py-10 px-96">  
          <button onClick={prevPage} disabled={currentPage === 1} className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500" >
            PREV
          </button>
        <div className="font-bold w-[35px] border border-white rounded-full py-1 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500">{currentPage}</div>
          <button onClick={nextPage}  className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500">
            NEXT
          </button>
        </div>
      <div className="flex flex-wrap gap-5">
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mx-auto px-9">
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
              
            </div>
            <button className="hover:text-cyan-400 border px-2 " onClick={()=> handleAddFood(item)}>Add</button>
              </li>
            )}) 
          }
        
        </ul>
      </div>
      <div className="flex justify-between items-center w-full py-10 px-96">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500"
        >
          PREV
        </button>
          <div className="font-bold w-[35px] border border-white rounded-full py-2 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500">{currentPage}</div>
        <button
          onClick={nextPage}
          
          className=" border border-white rounded-full p-2 backdrop-blur-lg bg-black bg-opacity-50 text-center hover:text-amber-500"
        >
          NEXT
        </button>
      </div>
      </div>
    </div>
  );
}