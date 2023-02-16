import React from 'react'
import {useState} from 'react';
import Link from "next/link";
import { GrClose } from "react-icons/gr";

export default function TrainingPlanner() {
  const [objetivo, setObjetivo] = useState('');
  const [sesiones, setSesiones] = useState([]);
  const day = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday ',
      'Friday',
      'Saturday ',
      'Sunday'
  ]
  function agregarSesion() {
      setSesiones([
          ...sesiones, {
              dia: '',
              ejercicio: '',
              series: '',
              repeticiones: ''
          }
      ]);
  }

  function actualizarSesion(index, campo, valor) {
      const nuevasSesiones = [...sesiones];
      nuevasSesiones[index][campo] = valor;
      setSesiones(nuevasSesiones);
  }


  return (
      <div className="  grid grid-cols-1 gap-1 justify-items-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-whait-600">Training Planner</h2>
          <label className='bg-gray-500 rounded content-center '>
              Objetive:
              <input className='bg-gray-200 rounded border-transparent ' type="text"
                  value={objetivo}
                  onChange={
                      (e) => setObjetivo(e.target.value)
                  }/>
          </label>
          <h3 className="text-lg font-semibold leading-8 tracking-tight text-whait-600">Training Session</h3>
          {
          sesiones.map((sesion, index) => (<div key={index}>
              <h4>Session{
                  index + 1
              }</h4>
              <label className='bg-gray-500 rounded content-center '>
                  Day:
                  <select className=' justify-items-center rounded  ' name="select"
                      onChange={
                          (e) => actualizarSesion(index, 'dia', e.target.value)
                  }>
                      {
                      day.map(e =>< option value = {
                          e
                      } > {
                          e
                      } < /option>)
                  } </select>
              </label>
              <label className='bg-gray-500 rounded justify-items-center '>
                  Exercises:
                  <input className='bg-gray-200 rounded ' type="text"
                      value={
                          sesion.ejercicio
                      }
                      onChange={
                          (e) => actualizarSesion(index, 'ejercicio', e.target.value)
                      }/>
              </label>
              <label className='bg-gray-500 rounded '>
                  Series:
                  <input className='bg-gray-200 rounded ' type="text"
                      value={
                          sesion.series
                      }
                      onChange={
                          (e) => actualizarSesion(index, 'series', e.target.value)
                      }/>
              </label>
              <label className='bg-gray-500  rounded  '>
                  Repetition:
                  <input className='bg-gray-200 rounded ' type="text"
                      value={
                          sesion.repeticiones
                      }
                      onChange={
                          (e) => actualizarSesion(index, 'repeticiones', e.target.value)
                      }/>
              </label>
          </div>
      ))
      }
          <button className='bg-gray-500 rounded  '
              onClick={agregarSesion}>Add</button>

          <Link className="bg-[#f10303] " href="/trainee/tool/tools"><GrClose /></Link> 
      </div>
  );
}

