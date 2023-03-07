import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import NavigationBtns from "../trainterLibraries/NavigationBtns";

interface tData {
  id: string;
  status: boolean;
  first_name: string;
  last_name: string;
  nickname: string;
  role: string;
  imgURL: string;
  membership: string;
}

const EditableTable = () => {
  const [tableData, setTableData] = useState<tData[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`)
      .then((data) => setTableData(data.data))
      .catch((error) => console.log(error));
  }, [page]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const target = e.currentTarget as HTMLButtonElement;
    if ((target.value = "update")) {
      //logica del update va por aqui
      const upd = { ...tableData[index] };
      console.log(upd);
    }
    if ((target.value = "delete")) {
      //logica del delete
      const id = tableData[index].id;
      console.log(id);
    }
  };

  const className = "bg-gray-800 border-b-gray-200 text-white m-1 w-[9rem]";

  return (
    <>
      <div className="my-10">
        <NavigationBtns
          currentPage={page}
          {...{ nextPage }}
          {...{ prevPage }}
        />
      </div>
      <table className="hidden md:block">
        <div className="block md:hidden">
          <h1>Cannot use admin panel in {`<=`} 768px sreen, upgrade</h1>
        </div>
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
                  name="first_name"
                  type="text"
                  value={row.first_name}
                  className={className}
                />
              </td>
              <td>
                <input
                  name="last_name"
                  type="text"
                  value={row.last_name}
                  className={className}
                />
              </td>
              <td>
                <input
                  name="nickname"
                  type="text"
                  value={row.nickname}
                  className={className}
                />
              </td>
              <td>
                <input
                  name="role"
                  type="text"
                  value={row.role}
                  className={className}
                />
              </td>
              <td>
                <input
                  name="imgURL"
                  type="text"
                  value={row.imgURL}
                  className={className}
                />
              </td>
              <td>
                <input
                  name="membership"
                  type="text"
                  value={row.membership}
                  className={className}
                />
              </td>
              <button
                className=""
                value="update"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  handleClick(e, rowIndex);
                }}
              >
                <AiOutlineEdit size={25} fill="green" />
              </button>
              <button
                value="delete"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  handleClick(e, rowIndex);
                }}
              >
                <AiOutlineDelete size={25} fill="red" />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EditableTable;
