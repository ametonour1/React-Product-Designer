import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const activeUser = useSelector((state) => state.auth.user)
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(()=>{
    console.log(activeUser,"jjjjjjjjjjjjjj")
  },[])
  return (
    <div className=" h-full flex-1">{activeUser?.email}</div>
  )
}

export default HomePage