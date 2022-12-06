import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isAbort, setIsAbort] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const logout = async() => {
        setError(null)
        setIsPending(true)

        try{
            await signOut(auth)
            dispatch({type:'LOGOUT'})
            
            //state update
            if(!isAbort) {
                setIsPending(false)
                setError(null)
            }
        } catch (err){
            if(!isAbort) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    //return clean up function
    useEffect(()=>{
        return () => setIsAbort(true)
    },[])

    return { logout, error, isPending }
}