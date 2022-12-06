import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()

const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'SIGNUP':
            return {...state, user: action.payload}
        case 'AUTH_READY':
            return {user: action.payload, isAuthReady: true}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer,{
        user: null,
        isAuthReady: false
    })

    //Check if any user is logged in, when app loads
    useEffect(()=> {
        const unsub = onAuthStateChanged(auth, user => {
            dispatch({type: 'AUTH_READY', payload: user})
            unsub()
        })
    },[])

    console.log('Auth context', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}