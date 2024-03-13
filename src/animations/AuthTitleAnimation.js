import React,{useEffect,useRef} from "react"
import {motion,useAnimation} from "framer-motion"
const AuthTitleAnimation = ({children ,isSignIn}) => {

     
    const controls = useAnimation()
    const initialRender = useRef(true)
    useEffect(()=>{
        if (!initialRender.current) {
        controls.start({translateY: [0,20,0],
            opacity:  [1, 0.8, 0.5, 0, 0, 0.5, 0.7, 1] })
        }else{
            initialRender.current = false;
        }
        
  
    },[isSignIn,controls])

    return (
        <motion.div
        initial={{transformY:0}}
        animate={controls}
        transition={{duration:1.2}} 
        className=" flex flex-col sm:flex-1 gap-2 pt-8 justify-center items-center ">
            {children}
        </motion.div>
    )

}
export default AuthTitleAnimation