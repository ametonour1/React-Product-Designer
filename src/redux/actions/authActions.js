import { useDispatch } from "react-redux"
import { getAuth } from "firebase/auth"
const auth = getAuth()


export const login = (user) => {
    return {
        type : "LOGIN",
        payload:user,
    }
}

export const logout = () =>{
    return {
        type:"LOGOUT"
    }
}

export const listenToAuthChanges = () => {
    return (dispatch) => {
        auth.onAuthStateChanged((user)=>{
            if (user){
                dispatch(login(user))
            }else {
                dispatch(logout())
            }
        })
    }
}