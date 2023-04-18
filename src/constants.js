export const GET_REQUESTS = 'GET_REQUESTS'
export const ADD_REQUEST  = 'ADD_REQUEST'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const API_URL = 'https://rms-mern-backend.onrender.com/api'
//export const API_URL = 'http://localhost:5000/api'
export const config = {
    headers:{
        Authorization : localStorage.getItem('authToken')
    }
}