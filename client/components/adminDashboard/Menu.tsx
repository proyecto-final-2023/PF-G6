import React, { useState } from 'react'
import UserCard from '../trainerDashboard/UserCard'
import NavigationBtns from '../trainterLibraries/NavigationBtns'

export default function Menu() {
  const [page, setPage] = useState(1)

  const nextPage = () => {
    setPage(prev => prev + 1)
  }

  const prevPage = () => {
    setPage(prev => prev - 1)
  }

  return (
    <div>
      <NavigationBtns currentPage={page} {...{nextPage }} {...{prevPage}}/>

      {/* <UserCard id={1} name={"juan"} email={"aaa@gmail.com"} /> */}
      <NavigationBtns currentPage={page} {...{nextPage }} {...{prevPage}}/>
    </div>
  )
}
