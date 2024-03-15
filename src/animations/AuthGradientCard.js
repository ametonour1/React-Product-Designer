import React,{useRef,useEffect} from "react"
import {motion,useAnimation} from "framer-motion"

const AuthGradientCard = ({children , isSignIn}) => {
  

    const controls = useAnimation()
    const initialRender = useRef(true)
    useEffect(()=>{
        if (!initialRender.current) {
            controls.start({rotateY: !isSignIn ? 180 : 0,
                translateY: [0,20,0],
                opacity: !isSignIn ? [0.75, 0.5, 0, 0, 0, 0, 0.5, 0.75] : 0.75})
        
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
        id="signUpGradient"
        className=" inset-4  bg-gradient-to-r from-textGradientPrimary via-textGradientSecondary to-textGradientThird absolute rounded-lg z-0 opacity-75  blur-xl"
        initial={{rotateY:0,
        translateY:20}}
        animate={controls}
        transition={{duration:1.2}}
        >
        {children}
        </motion.div>
    )
}
export default AuthGradientCard