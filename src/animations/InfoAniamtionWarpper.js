import React,{useEffect,useRef} from 'react'
import { motion, useInView, useAnimation } from 'framer-motion';


const InfoAnimationWrapper = ({children}) => {

    const ref = useRef(null)
    const isInview = useInView(ref,{once:true})
    const controls = useAnimation()

    useEffect(()=>{
       if (isInview) {
            controls.start("visible");
        }

    },[isInview])

    return(
        <motion.div 
        ref={ref}
        variants={{
            hidden:{opacity:0,translateY:90},
            visible:{opacity:1,translateY:0},
        }}
        transition={{
            type:"spring",
            duration:0.2,
            damping:8,
            delay:0.2,
            stiffness:100
        }}
        initial="hidden"
        animate={controls}
        className="flex-1 h-full flex items-center "
        >
            {children}'
        </motion.div>
    )
}
export default InfoAnimationWrapper