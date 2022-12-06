import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db, timestamp } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isAbort, setIsAbort] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const signup = async(email,password,userName) =>{
        setError(null)
        setIsPending(true)

        try{
            const res = await createUserWithEmailAndPassword(auth,email, password)
            if(!res){
                throw new Error('Signup Not Completed!')
            }

            //adding userName
            await updateProfile(res.user, { displayName: userName})

            //add user to db
            const path = doc(db, 'users', res.user.uid)
            const createdAt = timestamp.fromDate(new Date())
            await setDoc(path, {createdAt: createdAt})
            
            dispatch({type: 'SIGNUP', payload: res.user})

            //state update
            if(!isAbort) {
                setIsPending(false)
                setError(null)
            }
        } catch(err){
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

  return {error, isPending, signup}
}