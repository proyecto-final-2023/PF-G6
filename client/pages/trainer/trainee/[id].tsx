import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import CardTraineePlans from "@/components/CardTraineePlans";
import { useRouter } from "next/router";
import Link from "next/link";

export default function trainee() {
  const router = useRouter();
  const id = router.query.id;
  const [user, setData] = useState([]);
  const [name, setName] = useState<{ first_name: string }>({
    first_name: ""
  });
  const key = getCookie("token");

  useEffect(() => {
    //
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
        headers: { "x-access-token": key }
      })
      .then((data) => {
        setName(data.data);
      })
      .catch((error) => console.log(error));
    //
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/trainees/byplan?page=1`, {
        idPlanTrainee: id
      })
      .then((data) => {
        setData(data?.data.memberships.map((e: any) => e.user));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className=" m-20 bg-[url('/tail-imgs/logo2.png')] bg-no-repeat bg-cover  bg-bottom min-h-screen ">
      <div>
        <h1 className="flex  justify-center text-5xl font-extrabold dark:text-white">
          Trainee -{" "}
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-800 dark:text-gray-500 ml-2">
            {name.first_name}
          </span>
        </h1>
        <Link
          href="/trainer"
          className="flex  justify-center text-5xl font-extrabold dark:text-white"
        >
          Back
        </Link>
      </div>

      <div className=" flex flex-col m-20  ">
        {user &&
          user.map((e: any) => (
            <CardTraineePlans
              key={e.last_name}
              first_name={e.first_name}
              last_name={e.last_name}
              imgURL={e.imgURL}
            />
          ))}
      </div>
    </div>
  );
}
