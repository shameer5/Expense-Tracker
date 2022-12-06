//Create and Delete logic for firebase

import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useEffect, useReducer, useState } from "react"
import { db, timestamp } from "../firebase/config"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestorReducer = (state, action) =>{
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, error: null, success: false, document: null}
        case 'ADD_DOCUMENT':
            return {isPending: false, error: null, success: true, document: action.payload}
        case 'DELETE_DOCUMENT':
            return {isPending: false, error: null, success: true, document: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export const useWrite = (collectionName) => {
    const [stateVal, dispatch] = useReducer(firestorReducer, initialState)
    const [isAbort, setIsAbort] = useState(false)

    const updateStateCheck = (action) => {
        if(!isAbort){
            dispatch(action)
        }
    }

    //Add documents to db
    const addDocuments = async(doc) => {
        const ref = collection(db, collectionName, doc.uid, 'transactions')
        dispatch({type: 'IS_PENDING'})
        try {
            const createdAt = timestamp.fromDate(doc.createdAt)
            const documentAdd = await addDoc(ref, {...doc, createdAt: createdAt})
            updateStateCheck({type: 'ADD_DOCUMENT', payload: documentAdd})
        } catch (error) {
            console.log(error)
            updateStateCheck({type: 'ERROR', payload: error.message})
        }
        
    }

    //Deleted documents from db
    const deleteDocument = async(id) =>{
        dispatch({type: 'IS_PENDING'})
        try {
            const path = doc(db, collectionName, id)
            await deleteDoc(path)
            updateStateCheck({type: 'DELETE_DOCUMENT'})
        } catch (error) {
            updateStateCheck({type: 'ERROR', payload: error.message})
        }
    }

    useEffect(() => {
        return () => setIsAbort(true)
    },[])

    return { addDocuments, stateVal, deleteDocument }
}