import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";


type UserFormData = {
  id: string;
  name: String | "";
  cost: string;
  category: string;
  description: string;
  cantTrainees: string;
};

export default function EditableTablePlans() {
  const router = useRouter();
  const [tableData, setTableData] = useState<UserFormData[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/plans/trainers`)
      .then((data) => setTableData(data.data))
      .catch((error) => setTableData([]));
  }, [page]);

  const handleClick = (index: number, actionType: string) => {
    if (actionType === "update") {
      //todo: add update logic
      const upd = { ...tableData[index] };
      axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/plans/trainers/`, upd)
      .then((data) => {
        router.reload()
      })
      .catch((error) => console.log(error));
    }
    if (actionType === "delete") {
      //todo: add delete logic
      const id = tableData[index].id;
      console.log(id);
    }
  };

  const className = "bg-gray-800 border-b-gray-200 text-white m-1 w-[9rem]";
  // {
//   "id": "042134d5-cc86-468c-bfef-bc077a244f9c",
//   "name": "Plata",
//   "cost": "25",
//   "category": "trainer",
//   "description": "Este plan de entrenamiento es ideal para aquellos que desean generan un cambio en sus Trainees",
//   "cantTrainees": "15"
// },

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
            <th>Name</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cant. Trainees</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>
                <input
                  className={className}
                  name="name"
                  type="text"
                  value={String(row.name)}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="cost"
                  type="text"
                  value={row.cost}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].cost = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="nickname"
                  type="text"
                  value={row.category}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].category = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="role"
                  type="text"
                  value={row.description}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].description = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="imgURL"
                  type="text"
                  value={row.cantTrainees}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].cantTrainees = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>


              <div className="flex gap-3 justify-around">
                <button
                  value="update"
                  onClick={() => {
                    handleClick(rowIndex, "update");
                  }}
                >
                  <AiOutlineEdit size={25} fill="green" />
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
