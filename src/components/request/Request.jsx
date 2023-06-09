import React,{useState,useContext} from 'react'
import axios from 'axios'

import {API_URL,config,UPDATE_REQUEST} from '../../constants'
import {RequestContext} from '../../context/requests'

import CloseIcon from '@mui/icons-material/Close';

function Request({open,setOpen,data,info}) {
    const [request,setNewRequest] = useState(data)
    const [updatedRequest,setUpdatedRequest] = useState(info)
    const {dispatchRequest} = useContext(RequestContext)
    const userType = JSON.parse(localStorage.getItem('user')).username

    const handleSubmitUpdatedRequest = (e) => {
        e.preventDefault()
        if(info.status === updatedRequest.status )
            return
        axios.put(`${API_URL}/api/requests/update`,{...updatedRequest},config)
        .then(res => {
            dispatchRequest({type:UPDATE_REQUEST,payload:res.data})
            setOpen(!open)
        })
    }

    return (
        open?
            <div className='form-container'>
                <form action="" className="form">
                <CloseIcon className='close' onClick={() => setOpen(!open)}/>
                <h2>Request Details</h2>
                <input type="text" className='select' defaultValue={request.product} />
                <input type="text" className='select' defaultValue={request.issue}/>
                <textarea name="" className='textarea' defaultValue={request.desc}/>
                {
                    userType === 'customer'?
                    <input type="text" className='select' defaultValue={`State : ${request.status}`}/>:
                    userType === 'employee1' && request.status === 'Created'?
                    <select className='select' onChange={(e) => setUpdatedRequest({...updatedRequest,supportPersonId:e.target.value,status:'Open'})}>
                        <option value={null}>Selet Employee</option>
                        <option value='6445e07d6d6c672b6885d244'>Employee1</option>
                        <option value='6445e0c16d6c672b6885d245'>Employee2</option>
                    </select>:
                    <select className='select' onChange={(e) => setUpdatedRequest({...updatedRequest,status:e.target.value})}>
                        <option value={null}>Change Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Closed">Closed</option>
                    </select>
                }
                {
                    userType === 'customer'?null:
                    <button onClick={(e) =>  handleSubmitUpdatedRequest(e)}>{info.status === 'Created'?'Assign':'Submit'}</button>
                }
            </form> 
        </div>:
        null
    )
}

export default Request