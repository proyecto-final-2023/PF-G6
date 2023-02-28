import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export type User = {
  imgURL: string | null;
  nickname: string | null;
  first_name: string;
  last_name: string;
  role: string;
}

export default function AdminIndex() {
  const [users, setusersUsers] = useState<User>()
  const mountRef = useRef(false)

  const fetchUsers = async () => {
    const { data } = await axios("https://fp-server-cg2b.onrender.com/user?page=1")
    return data
  }

  useEffect(() => {
    if (!mountRef.current) {
      fetchUsers().then(data => setusersUsers(data));
      mountRef.current = true
    }
  }, [])

  console.log(users)
  return (
    <div>index</div>
  )
}
