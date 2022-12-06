//get transaction from db

import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useCallback, useEffect, useReducer, useRef} from "react"
import { db } from "../firebase/config"

let initialState = {
    isPending: false,
    documents: null,
    error: null,
    success: null,
    empty: false
}

const firestorReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return {isPending: true, error: null, success: false, documents: null, empty: false}
        case 'GET_DOCUMENTS':
            return {isPending: false, error: null, success: true, documents: action.payload, empty: false}
        case 'EMPTY':
            return {isPending: false, error: null, success: true, documents: action.payload, empty: true}
        case 'ERROR':
            return {isPending: false, documents: null, success: false, error: action.payload, empty: false}
        default:
            return state
    }
}

export const useRead = (collectionName, user, _month) => {
    
    const [stateVal, dispatch] = useReducer(firestorReducer, initialState)

    //useRef is used as this a dependency for useEffect. if not used it will cause infinite loop
    /* const orderCustom = useRef(_orderCustom).current */
    const queryUser = useRef(user ? ['uid','==',user.uid] : null).current
    
    const updateState = useCallback((newMonth) => {
        
        let year = newMonth.getFullYear();
        let month = newMonth.getMonth();
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);
        
        const queryFirstDay = (newMonth ? ['createdAt','>=', firstDay] : null)
        const queryLastDay = (newMonth ? ['createdAt','<=', lastDay] : null)
        
        let ref = collection(db, collectionName, user.uid, 'transactions')

        dispatch({type: 'IS_PENDING'})


        if( queryFirstDay && queryLastDay && queryUser){
            ref = query(ref, where(...queryFirstDay), where(...queryLastDay), where(...queryUser))
            ref = query(ref, where(...queryUser))
        }
        
        const unsub = onSnapshot(ref, (snapshot) => {
            let results =[]

            
            if(!snapshot.empty){
                snapshot.docs.forEach(doc =>{
                    results.push({id: doc.id, ...doc.data()})
                })
                dispatch({type: 'GET_DOCUMENTS', payload: results})
            } else {
                dispatch({type: 'EMPTY'})
            }
        
        }, (error) => {
            console.log(error.message)
            dispatch({type: 'ERROR', payload: 'OOPS ! Could not fetch the transactions'})
        })

        //unsubscribe when it unmounted
        return () => unsub

    }, [collectionName, user, queryUser])

    useEffect(()=>{
        updateState(_month)
    },[_month, updateState])

    return { stateVal, updateState }
}
