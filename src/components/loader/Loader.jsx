import React from 'react'
import './styles.scss';
import {PropagateLoader} from 'react-spinners'

function Loader() {
  return (
    <div className='loader-container'>
        <div className="box">
            <PropagateLoader 
                color="#612940"
            />
            <h3>Loading ...</h3>
        </div>
    </div>
  )
}

export default Loader