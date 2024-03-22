import fireBaseApp from "./firebase"
import "firebase/auth"

import { getFirestore , collection,addDoc ,doc,setDoc, deleteDoc} from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,sendEmailVerification, deleteUser,setPersistence,browserLocalPersistence,signOut} from "firebase/auth";
const auth = getAuth()
const firestore = getFirestore(fireBaseApp)
export const signUpWithEmailAndPassword = async (email,password) =>{
    try {
        await setPersistence(auth,browserLocalPersistence)
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
        await setPersistence(auth,browserLocalPersistence)
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        return userCredentials.user;
    }catch (error) {
        console.error("error signing in",error)
        throw error
    }
}

export const signUserOut = async () => {
    try{
        await auth.signOut()
        
       
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

export const registerUserToFirestore = async (user,displayName,phoneNumber,street,city,country,zipCode) => {

    try{
    //const docRef = collection(firestore,"users")
    const userData = {
        displayName:displayName,
        phoneNumber:phoneNumber,
        emailAddress:user.email,
        Address:{
            city:city,
            country:country,
            street:street,
            zipCode:zipCode
        },
        userID:user.uid
    }
    const id = user.uid
    //const myDoc = doc(docRef,id)
   setDoc(doc(firestore,"users",id),userData)
  .then(() => {
    console.log('Document successfully written!');
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });
    }catch(error) {
        console.log(error)
    }
    
}

export const removeRegisteredUser = async (id) => {

    try{
        const docRef = doc(firestore,"users",id)
        await deleteDoc(docRef)
        console.log("document deleted successfully:",id)
    }catch(error) {
        console.error("error deleting document",error)
    }

}