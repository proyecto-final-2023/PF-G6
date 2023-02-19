// Libraries
// Types
// Components/Assets
import creditsData from "@/assets/credits-data";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function About() {
  return (
    <div className="bg-gray-400 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
            FIT-U
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Fit-U es una aplicación de fitness creada por un equipo de ocho
            miembros con experiencia en desarrollo de software, diseño de
            interfaces de usuario y ejercicio físico. La aplicación proporciona
            entrenamientos personalizados, seguimiento de progreso y
            planificación de comidas saludables. Con una interfaz de usuario
            intuitiva y características avanzadas, Fit-U es una solución
            completa para las necesidades de fitness de cualquier persona.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {creditsData.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="bg-gradient-to-r from-indigo-500 to-black-500 hover:from-black-500 hover:to-pink-500  ...">
                    {person.link}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
