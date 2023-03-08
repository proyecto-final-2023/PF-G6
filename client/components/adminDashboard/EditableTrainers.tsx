import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type UserFormData = {
  id: string;
  membership: string;
  status: boolean;
  first_name: string;
  last_name: string;
  imgURL: string;
  email: string;
  logo:string;
};

export default function EditableTableTrainer() {

  const router = useRouter();
  const [tableData, setTableData] = useState<UserFormData[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/trainers?page=${page}`)
      .then((data) => setTableData(data.data))
      .catch((error) => console.log(error));
  }, [page]);

  const handleClick = (index: number, actionType: string) => {
    if (actionType === "update") {
      //todo: add update logic
      const upd = { ...tableData[index] };
      console.log(upd);
      axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/admin/trainers`, upd)
      .then((data) => {
        console.log(data.data)
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
            <th>Membership</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>imgURL</th>
            <th>email</th>
            <th>logo</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>
                <input
                  className={className}
                  name="membership"
                  type="text"
                  value={row.membership}
                  readOnly
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].membership = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="first_name"
                  type="text"
                  value={row.first_name}
                  readOnly
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
                  readOnly
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
                  name="imgURL"
                  type="text"
                  value={row.imgURL}
                  readOnly
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
                  name="email"
                  type="text"
                  value={row.email}
                  readOnly
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].email = e.target.value;
                    setTableData(updatedData);
                  }}
                />
              </td>
              <td>
                <input
                  className={className}
                  name="logo"
                  type="text"
                  value={row.logo}
                  onChange={(e) => {
                    const updatedData = [...tableData];
                    updatedData[rowIndex].logo = e.target.value;
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
