import React,{useRef,useEffect} from "react"
import {motion,useAnimation} from "framer-motion"
const AuthCardSubAnimation = ({children , isSignIn}) => {
  

    const controls = useAnimation()
    const initialRender = useRef(true)
    useEffect(()=>{
        if (!initialRender.current) {
            controls.start({rotateY: !isSignIn ? 180 : 0,
                translateY: [0,20,0],
                opacity: !isSignIn ? [1, 0.8, 0.5, 0, 0, 0.5, 0.7, 1] : 1})
        
        }else {
            initialRender.current = false
            controls.start({translateY:0})
        }
           
       
    },[isSignIn])

    return(
        <motion.div

        style={{
            perspective: "1000px", // Add perspective
            perspectiveOrigin: "50% 50%" // Adjust perspective origin
        }}
        className=" h-full w-full p-10 flex flex-col items-center gap-1 rounded-xl bg-gray-100 shadow-xl shadow-gray-500"
        initial={{rotateY:0,
        translateY:20}}
        animate={controls}
        transition={{duration:1.2}}
        >
        {children}
        </motion.div>
    )
}
export default AuthCardSubAnimation