import React,{useRef,useEffect} from "react"
import {motion,useAnimation} from "framer-motion"
const AuthCardSubAnimation = ({children , isSignIn}) => {
  

    const controls = useAnimation()
    const initialRender = useRef(true)
    useEffect(()=>{
        if (!initialRender.current) {
            controls.start({rotateY: !isSignIn ? 180 : 0,
                opacity: !isSignIn ? [1, 0.8, 0.5, 0, 0, 0.5, 0.7, 1] : 1})
        
        }else {
            initialRender.current = false
        }
           
       
    },[isSignIn])

    return(
        <motion.div

        style={{
            perspective: "1000px", // Add perspective
            perspectiveOrigin: "50% 50%" // Adjust perspective origin
        }}
        className=" h-full w-full p-10 flex flex-col bg-slate-100 "
        initial={{rotateY:0}}
        animate={controls}
        transition={{duration:1.2}}
        >
        {children}
        </motion.div>
    )
}
export default AuthCardSubAnimation