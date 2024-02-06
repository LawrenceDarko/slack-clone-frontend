'use client'

import React, { useState, useReducer, useContext, useEffect, createContext } from "react"
import { useRouter } from 'next/navigation';
import axios from "axios"

export const AuthContext = createContext(undefined) as any

export const authReducer = (state: any, action: any) => {
    switch(action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state

    }
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') as any)
        if(user){
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])
    

    console.log("Auth state:", state)
    return (
        <AuthContext.Provider value={{...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = (): any => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
}