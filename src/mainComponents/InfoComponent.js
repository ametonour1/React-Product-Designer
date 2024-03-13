import React,{useEffect,useRef} from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion, useInView, useAnimation } from 'framer-motion';
import InfoAnimationWrapper from '../animations/InfoAniamtionWarpper';
const InfoComponent = () => {
    const ref = useRef(null)
    const isInview = useInView(ref,{once:true})
    const controls = useAnimation()

    useEffect(()=>{
       if (isInview) {
            controls.start("visible");
        }

    },[isInview])
  return (
    <motion.div  className="flex flex-col lg:h-full  gap-10 pl-5 pr-5 pt-20 sm:pl-16 sm:pr-16 lg:flex-row lg:pl-2 lg:pr-2 justify-center items-baseline bg-inherit ">
       <InfoAnimationWrapper>
        <div className='flex flex-1 h-full  flex-col justify-evenly gap-3 mt-3 '>
            <div className="text-7xl flex justify-center items-center gap-3">
                <LocalShippingIcon fontSize='inherit'/>
                <h2 className="text-2xl md:text-xl">Fast Delivery</h2>
            </div>
            <p className="text-lg font-light text-justify   ">We Provide Delivery Within 3 Working Days For Orders In Europe, For International Orders We Guarentee Delivey Within 2 Weeks.</p>
        </div>
        </InfoAnimationWrapper>
        <InfoAnimationWrapper>
        <div className='flex flex-1 h-full   flex-col justify-evenly gap-3 mt-3 '>
            <div className="text-7xl flex justify-center items-center gap-3">
                <PaymentsIcon fontSize='inherit'/>
                <h2 className="text-2xl md:text-xl">Secure Payments</h2>
            </div>
            <p className="text-lg font-light text-justify   ">We Implenent Payment gateways That Are The Best In Bussiness To Ensure The Security Of Our Customers, If The Customer Is Unsatisfied We Provide Money Back Guarantee.</p>
        </div>
        </InfoAnimationWrapper>
        <InfoAnimationWrapper>
        <div className='flex flex-1 h-full  flex-col justify-evenly gap-3  mt-3'>
            <div className="text-7xl flex justify-center items-center gap-3">
                <WorkspacePremiumIcon fontSize='inherit'/>
                <h2 className="text-2xl md:text-xl">Quality Products</h2>
            </div>
            <p className="text-lg font-light text-justify   ">We Work With Products Sourced Only From Ethical Producers, And Select Only The Best Quality Products For Our Customers Ensuring The Printing Is Done To Pixel Perfection.</p>
        </div>
        </InfoAnimationWrapper>
    </motion.div>
  )
}

export default InfoComponent