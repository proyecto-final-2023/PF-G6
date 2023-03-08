import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// {
//   "id": 2,
//   "trainee": "JP",
//   "fotoTrainee": "https://res.cloudinary.com/dfixfnldt/image/upload/v1678251857/cpuzd4wrfrounvj9hego.jpg",
//   "message": "Nice trainer!",
//   "trainer": "redbird288",
//   "fotoTrainer": "https://randomuser.me/api/portraits/women/21.jpg"
// }

type UserFormData = {
  id: number;
  trainee: string;
  fotoTrainee: string;
  message: string;
  trainer: string;
  fotoTrainer: string;
};

export default function EditableTableComments() {
  const [tableData, setTableData] = useState<UserFormData[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {///admin/comment?page=1
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/comment?page=${page}`)
      .then((data) => setTableData(data.data))
      .catch((error) => console.log(error));
  }, [page]);

  const handleClick = (index: number, actionType: string) => {
    if (actionType === "update") {
      //todo: add update logic
      const upd = { ...tableData[index] };
      console.log(upd);
    }
    if (actionType === "delete") {
      //todo: add delete logic
      const id = tableData[index].id;
      console.log(id);
    }
  };

  const className = "bg-gray-800 border-b-gray-200 text-white m-1 w-[9rem]";
  // id: number;
  // trainee: string;
  // fotoTrainee: string;
  // message: string;
  // trainer: string;
  // fotoTrainer: string;

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
            <th>Status</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Nickname</th>
            <th>Role</th>
            <th>imgURL</th>
            <th>membership</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>
                <input
                  className={className}
                  name="first_name"
                  type="text"
                  value={row.first_name}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].first_name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="last_name"
                  type="text"
                  value={row.last_name}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].last_name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="nickname"
                  type="text"
                  value={row.nickname}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].nickname = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="role"
                  type="text"
                  value={row.role}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].role = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="imgURL"
                  type="text"
                  value={row.imgURL}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].first_name = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="membership"
                  type="text"
                  value={row.membership}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership = e.target.value;
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
                <button
                  value="delete"
                  onClick={() => {
                    handleClick(rowIndex, "delete");
                  }}
                >
                  <AiOutlineDelete size={25} fill="red" />
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
