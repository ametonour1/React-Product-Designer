import React from 'react'
import IMG1 from "../assets/brand1.svg"
import IMG2 from "../assets/brand2.svg"
import IMG3 from "../assets/brand3.svg"
import IMG4 from "../assets/brand4.svg"
import IMG5 from "../assets/brand7.svg"
import IMG6 from "../assets/brand6.svg"
import InfoAnimationWrapper from '../animations/InfoAniamtionWarpper'

const Brands = () => {
  return (
    <div className="h-full md:h-auto md:pt-10 md:pb-10 flex bg-gray-700  justify-center items-center">
    <div className="grid grid-cols-2 h-full lg:h-auto gap-5 pl-5 pr-5 pt-5 pb-5 bg-inherit  sm:grid-cols-6 items-center  w-full">
       <InfoAnimationWrapper>
       <img className='h-auto w-full ' src={IMG1}/>
       </InfoAnimationWrapper>

        <InfoAnimationWrapper>
        <img className='h-auto w-full ' src={IMG2}/>
        </InfoAnimationWrapper>

        <InfoAnimationWrapper>
        <img className='h-auto w-full ' src={IMG3}/>
        </InfoAnimationWrapper>

        <InfoAnimationWrapper>
        <img className='h-auto w-full ' src={IMG4}/>
        </InfoAnimationWrapper>

        <InfoAnimationWrapper>
        <img className='h-auto w-full ' src={IMG6}/>
        </InfoAnimationWrapper>


        <InfoAnimationWrapper>
        <img className='h-auto w-full ' src={IMG5}/>
        </InfoAnimationWrapper>
    </div>
    </div>
  )
}

export default Brands