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
      <div className='flex flex-col-reverse h-full sm:flex-row-reverse '>
        <div className="flex-1  flex     ">
          <AuthCardAnimation isSignIn={isSignIn}>
        {
      awaitAnimation
       ? <AuthCardSubAnimation isSignIn={isSignIn}  >
       <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn}/> 
       <p onClick={handleSignInFalse}>dont have an account? sign Up</p>
       </AuthCardSubAnimation>
      :
      <AuthCardSubAnimation isSignIn={isSignIn}>
      <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
      <p onClick={handleSignInTrue}>Already have an account? sign In</p>
       </AuthCardSubAnimation>
       }
       </AuthCardAnimation>
        </div>
        <div   className=" bg-gray-300 flex flex-col sm:flex-1 gap-2 pt-8 justify-center items-center ">
          {awaitAnimation ? 
        <AuthTitleAnimation isSignIn={isSignIn}  >
        <h2 className="text-3xl text-gray-800 font-light">Welcome Back</h2>
        <p className=" text-base text-gray-800">Sign In To Continue</p>
      </AuthTitleAnimation>
      :
      <AuthTitleAnimation isSignIn={isSignIn}  >
      <h2 className="text-3xl text-gray-800 font-light">Welcome </h2>
      <p className=" text-base text-gray-800">This Is Where It Begins</p>
    </AuthTitleAnimation>
        }
        
        </div>
       
       
      </div>
      
    </div>
  )
}

export default Auth