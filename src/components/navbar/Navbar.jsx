import React from 'react'
import './styles.scss'
import {useNavigate} from 'react-router-dom'

function Navbar({user}) {
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.clear()
    navigate('/',{replace:true})  
  }
  
  return (
    <div className='navbar'>{`Hello! ${user}`}<span><button className='logout' onClick={() => handleLogOut()}>Logout</button></span></div>  
  )
}

export default Navbar