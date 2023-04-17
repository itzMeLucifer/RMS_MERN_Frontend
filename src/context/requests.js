import React from "react"
import {GET_REQUESTS,ADD_REQUEST,UPDATE_REQUEST} from '../constants'

export const RequestContext = React.createContext()

export const initialState = []

export const reducer = (state,action) => {
    switch(action.type){
        case GET_REQUESTS:
            return [...action.payload]
        case UPDATE_REQUEST : 
            return state.map((item) => item._id === action.payload._id?action.payload:item)
        case ADD_REQUEST : 
            return [...state,action.payload]
        default: 
        return state
    }
}