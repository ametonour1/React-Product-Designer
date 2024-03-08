import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeroComponent from './HeroComponent'

const HomePage = () => {
  const activeUser = useSelector((state) => state.auth.user)
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(()=>{
    console.log(activeUser,"jjjjjjjjjjjjjj")
  },[])
  return (
    <div className=" bg-backgroundColorPrimary relative h-full flex-1">
    <HeroComponent/>
    <p>helloo</p>
    </div>
  )
}

export default HomePage