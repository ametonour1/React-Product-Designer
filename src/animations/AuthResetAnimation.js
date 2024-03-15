
import React,{useRef,useEffect} from "react"
import {motion,useAnimation} from "framer-motion"
const AuthResetAnimation = ({children,isPasswordReset}) => {
    
    const controls = useAnimation()
    let initialRender = useRef(true)
    useEffect(()=>{
        if(!initialRender.current){
            controls.start({translateY: [0,20,0],
                opacity:  [1, 0.8, 0.5, 0, 0, 0.5, 0.7, 1] })
        }else{
            initialRender.current = false
        }
       
    },[isPasswordReset])
    return(
        <motion.div
        className=" h-full w-full flex flex-col justify-center items-center gap-5"
        initial={{traslateY:20}}
        animate={controls}
        transition={{duration:1}}
        >
            {children}
        </motion.div>
    )
}
export default AuthResetAnimation