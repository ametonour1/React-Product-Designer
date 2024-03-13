import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeroComponent from './HeroComponent'
import InfoComponent from './InfoComponent'
import Brands from './Brands'

const HomePage = () => {
  const activeUser = useSelector((state) => state.auth.user)
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(()=>{
    console.log(activeUser,"jjjjjjjjjjjjjj")
  },[])
  return (
    <div className=" bg-backgroundColorPrimary relative h-full flex-1">
    <HeroComponent/>
    <InfoComponent/>
    <Brands/>
    </div>
  )
}

export default HomePage