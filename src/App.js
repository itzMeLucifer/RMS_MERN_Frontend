import React,{useEffect,useReducer} from 'react'
import './App.scss'

import {createBrowserRouter, Outlet,RouterProvider,useNavigate} from 'react-router-dom'
import {reducer,initialState,RequestContext} from './context/requests'

import Login from './pages/login/Login'
import Customer from './pages/cutomer/Customer'
import Employee from './pages/employee/Employee'
import NotFound from './components/notfound/NotFound'
import Navbar from './components/navbar/Navbar'


function App() {
  const employeeType = JSON.parse(localStorage.getItem('user'))?.username
  
  const Layout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        if(!token){
            localStorage.clear()
            navigate('/')
        }
    },[])
    
    return (
        <div className='page'>
          <Navbar user={'Customer'}/>
          <Outlet/>
        </div>
      )
  };

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'*',
      element:<NotFound/>
    },
    {
      path:'/user',
      element:<Layout/>,
      children:[
        {
          path:employeeType === 'employee1'?'admin':employeeType === 'customer'?'customer':'employee',
          element:employeeType === 'customer'?<Customer/>:<Employee/>
        }
      ]
    }, 
  ])

  const [state,dispatch] =  useReducer(reducer,initialState)
  return (
    <div className="base">
      <RequestContext.Provider value={{requests:state,dispatchRequest:dispatch}}>
        <RouterProvider router={router}>
            <App/>
        </RouterProvider>
      </RequestContext.Provider>
    </div>
  )
}

export default App