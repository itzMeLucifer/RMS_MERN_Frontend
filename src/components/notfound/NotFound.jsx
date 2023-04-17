import React from 'react'
import './styles.scss'
import {useNavigate} from 'react-router-dom'

import Image404 from '../../images/404.png'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='not-found-container'>
      <div className="box">
        <img src={Image404} alt="" />
      </div>
      <button onClick={() => navigate(-1)}>Go To Home</button>
    </div>
  )
}

export default NotFound