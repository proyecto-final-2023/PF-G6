import Link from "next/link";

const team = [
  {
    name: "Javier Garbalena",
    link: (
      <Link href="https://www.linkedin.com/in/javier-garb-023178254/">
        Linkedin
      </Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Teo Nicolas Gimenez",
    link: (
      <Link href="https://www.linkedin.com/in/teo-nicolas-gimenez-herrera-209411225">
        Linkedin
      </Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Oscar Alatrista",
    link: (
      <Link href="https://www.linkedin.com/in/oscar-alatrista">Linkedin</Link>
    ),

    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Andrew Velata",
    link: (
      <Link href="https://www.linkedin.com/in/andres-velata/">Linkedin</Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Adan Moreno",
    link: (
      <Link href="https://www.linkedin.com/in/adan-moreno7/">Linkedin</Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Juan Pablo Quinteros",
    link: (
      <Link href="https://www.linkedin.com/in/juan-pablo-quinteros-araos-4b195a1b8/">
        Linkedin
      </Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  },
  {
    name: "Alexander Arvelo",
    link: (
      <Link href="https://www.linkedin.com/in/alexander-arvelo-378724148/">
        Linkedin
      </Link>
    ),
    imageUrl:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
  }
];

export default function About() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="bg-gray-800">FIT-U</h2>
          <p className="mt-6 text-justify leading-8 text-white ">
            Fit-U es una aplicaci??n fitness creada por un equipo de siete
            miembros con experiencia en desarrollo de software, hemos dise??ado
            una interfaz de usuario. ??sta aplicaci??n proporciona ejercicios
            f??sicos, entrenamientos personalizados, seguimientos de progresos y
            planificaci??n de comidas saludables. Con una plataforma intuitiva
            para cada usuario y caracter??sticas avanzadas. Fit-U es una soluci??n
            completa para las necesidades fitness de cualquier persona.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {team.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-white">
                    {person.name}
                  </h3>
                  <p className="bg-gradient-to-r from-blue-600 to-black-500 rounded px-1">
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
