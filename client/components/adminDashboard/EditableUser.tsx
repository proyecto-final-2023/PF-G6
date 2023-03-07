import React, { ReactEventHandler, useEffect, useState } from "react";
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
  },[]);

 

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index:number) => {
    const target = e.currentTarget as HTMLButtonElement;
    if(target.value='update'){
      //logica del update va por aqui
      const upd={...tableData[index]};
      console.log(upd);
    }
    if(target.value='delete'){
      //logica del delete
      const id= tableData[index].id;
      console.log(id)
    }

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
              name='first_name'
                type="text"
                value={row.first_name}
              />
            </td>
            <td>
              <input
              name='last_name'
                type="text"
                value={row.last_name}
              />
            </td>
            <td>
              <input
              name='nickname'
                type="text"
                value={row.nickname}
              />
            </td>
            <td>
              <input
              name='role'
                type="text"
                value={row.role}
              />
            </td>
            <td>
              <input
              name='imgURL'
                type="text"
                value={row.imgURL}
              />
            </td>
            <td>
              <input
              name='membership'
                type="text"
                value={row.membership}
              />
            </td>
            <button  value='update' onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{handleClick(e, rowIndex)}}>Update</button>
            <button  value='delete' onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{handleClick(e, rowIndex)}}>Delete</button>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
