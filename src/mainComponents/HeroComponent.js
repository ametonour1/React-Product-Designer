import React from 'react'
import PHOTO1 from "../assets/img1.png"
import PHOTO2 from "../assets/img2.png"
import PHOTO3 from "../assets/img3.png"
import PHOTO4 from "../assets/img4.png"
import TSHIRT from "../assets/tshirt.png"
import "../App.css"
import {motion} from "framer-motion"

const HeroComponent = () => {
  return (
    <div className="flex lg:h-full flex-col-reverse  md:flex-row sm:flex-row lg:flex-row ">
    <motion.div 
    initial={{x:-50,opacity:0.5}}
    animate={{x:0,opacity:1,
    transition:{duration:1}}}
    
    className='flex-1 flex flex-col justify-center items-center sm:items-start  lg:items-center  gap-2 ml-1 mr-1'>
        <h1 className="text-4xl sm:text-4xl md:text-6xl font-normal font-mono text-textBaseColor ">Your Design</h1>
        <h3 className="font-normal text-textBaseColor  font-mono">Design Amazing Custom Products For Your Bussiness With Ease</h3>
        <button className="bg-blue-700 text-xl p-2 pl-3 pr-3 rounded-lg  font-mono hover:bg-blue-600 transition hover:scale-105 text-white">Start Now</button>
    </motion.div>
     <div id='divm' className=" flex-1 grid grid-cols-12 grid-rows-12 h-full ">
        <img id='divt' className=" row-start-1 row-end-13 col-end-13 col-start-1  lg:h-full flex-1  z-10 " src={TSHIRT}/>
        <motion.div
        animate={{
          x: [0,15, 10, 0],
          y: [0,-10, -5,10,0],
          scale: [1, 1.1, 1, 1.1, 1],
          rotate: [0, 0,20, 15, 0],
          transition: {
            delay:4,
            duration: 40,
            repeat: Infinity,
          },
          
        }}
        className="  row-start-5 row-end-8 col-end-5 col-start-2     z-0 ">
        <img id='div1' src={PHOTO1}/>
        </motion.div>
        <motion.div className="row-start-6 row-end-8 col-end-11 col-start-9    z-0   "
        animate={{
          x: [0,15, 10, 0],
          y: [0,-10, -5,10,0],
          scale: [1, 1.1, 1, 1.1, 1],
          rotate: [0, 0,20, 15, 0],
          transition: {
            delay:1,
            duration: 60,
            repeat: Infinity,
          },
          
        }}
        >
         <img id='div2'  src={PHOTO2}/>
         </motion.div>
         <motion.div 
        animate={{
          x: [0,5, 10, 0],
          y: [0,-10, -5,10,0],
          scale: [1, 1.1, 1, 1.1, 1],
         
          transition: {
            delay:2,
            duration: 55,
            repeat: Infinity,
          },
          
        }} className=" row-start-2 row-end-11 col-end-11 col-start-3    z-20   " >
         <img id='div3' src={PHOTO3}/>
         </motion.div>
         <motion.div 
         animate={{
          x: [0,10,5, 0],
          y: [0,-10, -5,5,0],
          scale: [1, 1.1, 1, 1.1, 1],
          rotate: [0, 0,20, 15, 0],
          transition: {
           
            duration: 60,
            repeat: Infinity,
          },
          
        }} 
         className="row-start-2 row-end-11 col-end-11 col-start-3  z-30  ">
         <img id='div4'  src={PHOTO4}/>
         </motion.div>
    
      </div>
    
    </div>
  )
}

export default HeroComponent