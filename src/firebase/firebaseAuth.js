import fireBaseApp from "./firebase"
import "firebase/auth"
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,sendEmailVerification, deleteUser} from "firebase/auth";

const auth = getAuth()

export const signUpWithEmailAndPassword = async (email,password) =>{
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredentials.user
        console.log("errrrrrrrrrrrr",user)
         await sendEmailVerification(user)
        return userCredentials.user;
    }catch (error) {
        console.error("error signing up",error)
        throw error
    }
}

export const signInUserWithEmailAndPassword = async (email,password) =>{
    try {
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        return userCredentials.user;
    }catch (error) {
        console.error("error signing in",error)
        throw error
    }
}

export const signOut = async () => {
    try{
        await fireBaseApp.auth().signOut()
    }catch(error){
        console.error("error sighning out",error)
        throw error
    }

}

export const ResetUserPassword = async (email) => {

    try{
     const result = await sendPasswordResetEmail(auth,email)
        console.log("password sent to email:",email)
        return result;
    }catch(error){
        console.error("error sending reset email:",error)
        throw error
    }
}

export const deleteUnVerifedUser = async (signInUser) => {

    try{
        const result = await deleteUser(signInUser)
        console.log("userDeleted")
        return true
    }catch (error) {
        console.log(error)
        return false
    }
}


