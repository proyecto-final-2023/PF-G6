import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [tableData, setTableData] = useState<UserFormData[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {///admin/comment?page=1
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/comment?page=${page}`)
      .then((data) => setTableData(data.data))
      .catch((error) => setTableData([]));
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
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/comment/${id}`)
      .then(data=> router.reload())
      .catch(error=> console.error(error));
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
            <th>id</th>
            <th>Trainee</th>
            <th>fotoTrainee</th>
            <th>Message</th>
            <th>Trainer</th>
            <th>fotoTrainer</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>
                <input
                  className={className}
                  name="id"
                  type="text"
                  value={row.id}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].id = parseInt(e.target.value);
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="Trainee"
                  type="text"
                  value={row.trainee}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].trainee = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="Foto Trainee"
                  type="text"
                  value={row.fotoTrainee}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].fotoTrainee = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="Message"
                  type="text"
                  value={row.message}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].message = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="Trainer"
                  type="text"
                  value={row.trainer}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].trainer = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="Foto Trainer"
                  type="text"
                  value={row.fotoTrainer}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].fotoTrainer = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>

              <div className="flex gap-3 justify-around">
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
