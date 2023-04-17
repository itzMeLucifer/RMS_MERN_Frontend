import React,{useState,useContext,useEffect} from 'react'
import './styles.scss'
import axios from 'axios'

import {RequestContext} from '../../context/requests'
import {GET_REQUESTS,API_URL,config} from '../../constants'

import SupprtRequestForm from '../../components/supportrequestform/SupprtRequestForm'
import RequestTable from '../../components/requestable/RequestTable'

function Customer() {
  const [openModal,setOpenModal]= useState(false)
  const [pendingRequests,setPendingRequests] =  useState([])
  const [closedRequests,setClosedRequests] =  useState([])
  const {requests,dispatchRequest} = useContext(RequestContext)
  const customerColumns = ["Customer's Username",'Product Type','Issue Type','Submission Date','Status','View Details']

  useEffect(()=>{
    if(requests.length === 0){
      axios.get(`${API_URL}/requests/getmyrequests/${JSON.parse(localStorage.getItem('user')).id}`,config)
      .then(resolve => {
        if(resolve.data.requests.length !== 0)
          dispatchRequest({type:GET_REQUESTS,payload:resolve.data.requests})
      })
    }
  },[])

  useEffect(() => {
    setPendingRequests(requests.filter(item => item.status !== 'Closed'))
    setClosedRequests(requests.filter(item => item.status === 'Closed'))
  },[requests])


  return (
    <div className='custom-container'>
      <button onClick={() => setOpenModal(!openModal)} className='submit'>New Request</button>
      <div className="pending">
        <h2>Pending Requests</h2>
        <RequestTable columns={customerColumns} data={pendingRequests}/>
      </div>
      <div className="pending">
        <h2>Request History</h2>
        <RequestTable columns={customerColumns} data={closedRequests}/>
      </div>
      {
        openModal?
        <SupprtRequestForm open={openModal} setOpen={setOpenModal}/>:null
      }
    </div>
  )
}

export default Customer