export const GET_REQUESTS = 'GET_REQUESTS'
export const ADD_REQUEST  = 'ADD_REQUEST'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const API_URL = 'https://rmsmern.onrender.com'
//export const API_URL = 'http://localhost:5000'
export const config = {
    headers:{
        Authorization : localStorage.getItem('authToken')
    }
}