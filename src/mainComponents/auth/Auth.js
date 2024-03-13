import React,{useState} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import AuthCardAnimation from '../../animations/AuthCardAnimation'
import AuthCardSubAnimation from '../../animations/AuthCardSubAnimation'
import AuthTitleAnimation from '../../animations/AuthTitleAnimation'
const Auth = () => {

  const  [isSignIn,setIsSignIn] = useState(true)
  const [awaitAnimation,setAnimationAwait] = useState(true)

  const handleSignInFalse = () => {
    setIsSignIn(false)
    setTimeout(()=>{
      setAnimationAwait(false)
    },300)
  }
  const handleSignInTrue = () => {
    setIsSignIn(true)
    setTimeout(()=>{
      setAnimationAwait(true)
    },300)
  }
  return (
    <div className='h-full' >
      <div className='flex flex-col-reverse h-full xl:flex-row-reverse '>
        <div className="flex-1  flex     ">
          <AuthCardAnimation isSignIn={isSignIn}>
        {
      awaitAnimation
       ? <AuthCardSubAnimation isSignIn={isSignIn}  >
       <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn}/> 
       <p className="text-sm font-light text-textBaseColor hover:text-black transition " onClick={handleSignInFalse}>Dont have an account? sign Up</p>
       </AuthCardSubAnimation>
      :
      <AuthCardSubAnimation isSignIn={isSignIn}>
      <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
      <p className="text-sm font-light text-textBaseColor hover:text-black transition " onClick={handleSignInTrue}>Already have an account? sign In</p>
       </AuthCardSubAnimation>
       }
       </AuthCardAnimation>
        </div>
        <div   className=" bg-backgroundColorPrimary flex flex-col sm:flex-1 gap-2 pt-8 justify-center items-center ">
          {awaitAnimation ? 
        <AuthTitleAnimation isSignIn={isSignIn}  >
        <h2 className="text-5xl text-center sm:text-6xl md:text-8xl xl:text-9xl font-mono bg-gradient-to-r from-textGradientPrimary via-textGradientSecondary to-textGradientThird text-transparent bg-clip-text font-black ">Welcome Back</h2>
        <p className=" text-base text-gray-800">Sign In To Continue</p>
      </AuthTitleAnimation>
      :
      <AuthTitleAnimation isSignIn={isSignIn}  >
      <h2 className="text-5xl text-center sm:text-6xl md:text-8xl xl:text-9xl font-mono bg-gradient-to-r from-textGradientPrimary via-textGradientSecondary to-textGradientThird text-transparent bg-clip-text font-black ">Welcome </h2>
      <p className=" text-base text-gray-800">This Is Where It Begins</p>
    </AuthTitleAnimation>
        }
        
        </div>
       
       
      </div>
      
    </div>
  )
}

export default Auth