import React,{useState,useEffect,useRef} from "react"
import {motion,useAnimation} from "framer-motion"
const AuthCardAnimation = ({children,isSignIn}) => {
    
    const controls = useAnimation()
    const initialRender = useRef(true)
    useEffect(()=>{
        if (!initialRender.current) {
        controls.start({rotateY: !isSignIn ? 180 : 0,
            opacity: isSignIn ? [1, 0.8, 0.5, 0, 0, 0.5, 0.7, 1] : 1})
        }else{
            initialRender.current = false;
        }
        
  
    },[isSignIn,controls])

    return(
        <motion.div
        style={{
            perspective: "1000px", // Add perspective
            perspectiveOrigin: "50% 50%" // Adjust perspective origin
        }}
        className=" h-auto w-full m-5 lg:m-5  "
        initial={{rotateY:0}}
        animate={controls}
        transition={{duration:1.2}}
        >
        {children}
        </motion.div>
    )
}
export default AuthCardAnimation