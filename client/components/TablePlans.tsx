import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import axios from "axios";

export default function TablePlans() {
  const key = getCookie("token");
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    axios
      .post("https://fp-server-cg2b.onrender.com/user/perfil", null, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        console.log(data.data.membership);
        setPlans(data.data.membership.trainer.planTrainees);
      })
      .catch((error) => console.log(error));
  }, []);
 

  console.log(plans);
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                tool
              </th>
            </tr>
          </thead>
          <tbody>
            {plans &&
              plans.map((e) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 className='row-span-2 m-auto border-2 border-rose-500   ">
                  <th className="px-8 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {e.name}
                  </th>
                  <td className="px-6 py-4">{e.description}</td>
                  <td className="px-6 py-4">{e.category}</td>
                  <td className="px-6 py-4">${e.cost}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {}
                      }
                      className="font-medium text-red-600 dark:text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
