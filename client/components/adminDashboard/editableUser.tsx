import React, { useEffect, useState } from "react";
import axios from 'axios';

interface tData {
    id: string;
    status: boolean;
    first_name: string;
    last_name: string;
    nickname: string;
    role: string;
    imgURL:string;
    membership:string;
  };

const EditableTable = () => {
  const [tableData, setTableData] = useState<tData[]>([]);

  useEffect(()=>{
    let ind:number=1;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${ind}`)
    .then(data=> setTableData(data.data))
    .catch(error=> console.log(error));
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    //columnId: keyof typeof data[0]
  ) => {
    const updatedData = [...tableData];
    updatedData[rowIndex]/*[columnId]*/ = e.target.value;
    setTableData(updatedData);
  };

  const handleClick=(e)=>{
    alert(e.target.value);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
            <td>{row.id}</td>
            <td>
              <input
                type="checkbox"
                checked={row.status}
                onChange={(e) => {
                  const updatedData = [...tableData];
                  updatedData[rowIndex].status = e.target.checked;
                  setTableData(updatedData);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.first_name}
                onChange={(e) => handleChange(e, rowIndex)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.last_name}
                onChange={(e) => handleChange(e, rowIndex, )}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.nickname}
                onChange={(e) => handleChange(e, rowIndex,)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.role}
                onChange={(e) => handleChange(e, rowIndex,)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.imgURL}
                onChange={(e) => handleChange(e, rowIndex, )}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.membership}
                onChange={(e) => handleChange(e, rowIndex, )}
              />
            </td>
            <button value='update' onClick={handleClick}>Update</button>
            <button value='delete' onClick={handleClick}>Delete</button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
