import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import App from './App'
import HomePage from './mainComponents/HomePage'
import Navbar from './mainComponents/navbar/Navbar'
import NavbarMenu from './mainComponents/navbar/NavbarMenu'
import CheckOut from "./mainComponents/Checkout/CheckOut"
import Shop from "./mainComponents/shop/Shop"
import AdminPage from "./mainComponents/adminPage/AdminPage"
import "./tailwind.css"
import {motion} from "framer-motion"
import Auth from './mainComponents/auth/Auth'
import { listenToAuthChanges } from './redux/actions/authActions'
import { useDispatch, UseDispatch } from 'react-redux'
const MainApp = () => {

  const [menuToggle,setMenuToggle] = useState(false)
  const [animationCompleated,setAnimantionCompleated] = useState(true)

  const dispatch = useDispatch()
  const handleAnimationCompleated = () => {
    setAnimantionCompleated(true)
  }

  useEffect(()=>{
    dispatch(listenToAuthChanges())
  },[dispatch])

 
  return (
    <Router>
     <div className="h-screen  flex flex-col ">
        <Navbar 
         menuToggle={menuToggle}
         setMenuToggle={setMenuToggle}
         setAnimantionCompleated={setAnimantionCompleated}/>
         <div className="h-full relative flex-1 bg-backgroundColorPrimary ">
        <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/admin' Component={AdminPage}/>
        <Route path='/app' Component={App}/>
        <Route path='/shop' Component={Shop}/>
        <Route path='/signin' Component={Auth}/>
        <Route path='/checkout' Component={CheckOut}/>
        </Routes>
        
         <motion.div
         initial={{x:"-100%"}}
         animate={{x:menuToggle ? 0 : "-100%"}}
         transition={{duration:0.5}}
         onAnimationComplete={handleAnimationCompleated}
         hidden={animationCompleated && !menuToggle}
          className='absolute bg-backgroundColorSecondary top-0 h-full  flex-1 inset-x-0 z-50 '>

          <NavbarMenu/>
         </motion.div>
        </div>
       
     </div>
    </Router>
  )
}

export default MainApp