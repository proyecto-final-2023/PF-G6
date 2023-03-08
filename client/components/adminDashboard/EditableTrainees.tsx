import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// {
//   "membership": {
//     "userId": "a46c765c-073a-481d-9b0b-0b8212cffe4d",
//     "traineeIdTrainee": "cc320cb1-0ec1-4fde-b583-d7b60c50fa96",
//     "planTrainee": {
//       "name": "Basico"
//     },
//     "user": {
//       "first_name": "Milla",
//       "last_name": "Lehtinen",
//       "imgURL": "https://randomuser.me/api/portraits/women/67.jpg"
//     }
//   }
// },

interface Membership {
  membership: {
    userId: string;
    traineeIdTrainee: string;
    planTrainee: {
      name: string;
    };
    user: {
      first_name: string;
      last_name: string;
      imgURL: string;
    };
  };
}

export default function EditableTableTrainees() {
  const [tableData, setTableData] = useState<Membership[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/trainees/?page=${page}`)
      .then((data) => {
        console.log(data.data);
        setTableData(data.data);
      })
      .catch((error) => setTableData([]));
  }, [page]);

  const handleClick = (index: number, actionType: string) => {
    if (actionType === "update") {
      //todo: add update logic
      const upd = { ...tableData[index] };
      console.log(upd);
    }
  };

  const className = "bg-gray-800 border-b-gray-200 text-white m-1 w-[9rem]";


  return (
    <>
      <div className="my-7">
        <NavigationBtns
          currentPage={page}
          {...{ nextPage }}
          {...{ prevPage }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>imgURL</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={row.membership?.userId}>
              <td>
                <input
                  className={className}
                  name="first_name"
                  type="text"
                  value={row.membership?.user?.first_name}
                  readOnly
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership.user.first_name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="last_name"
                  type="text"
                  value={row.membership?.user?.last_name}
                  readOnly
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership.user.last_name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="imgURL"
                  type="text"
                  value={row.membership?.user?.imgURL}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership.user.imgURL = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="plan_name"
                  type="text"
                  value={row.membership?.planTrainee?.name}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership.planTrainee.name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <div className="flex gap-3 justify-around">

              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
