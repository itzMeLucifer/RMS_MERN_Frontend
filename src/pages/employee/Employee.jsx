import React,{useState,useEffect, useContext} from 'react'
import './styles.scss'
import axios from 'axios'
import {API_URL,config,GET_REQUESTS} from '../../constants'
import { RequestContext } from '../../context/requests'

import RequestTable from '../../components/requestable/RequestTable'

function Employee() {
  const [selectedTasks,setSelectedTasks]= useState(0)
  const [tasks,setTasks] = useState([])
  const {requests,dispatchRequest} = useContext(RequestContext)

  const lastPathValue = window.location.pathname.split('/')[2]
  const empType = JSON.parse(localStorage.getItem('user')).username
  
  const allocatedTaskColumns = ["Employee's Username",'Product Type','Issue Type','Submission Date','Status','View Details']
  const unAllocatedTaskColumns = ["Customer's Username",'Product Type','Issue Type','Submission Date','Status','View Details']

  useEffect(() => {
    if(selectedTasks === 0){
      if(empType === 'employee1')
        setTasks(requests.filter(item => item.status !== 'Created'))
      else
      setTasks(requests)
    }
    else{
      setTasks(requests.filter(item => item.status === 'Created'))
    }
  },[requests,selectedTasks])

  useEffect(()=>{
    if(requests.length === 0){
      if(empType === 'employee1'){
        axios.get(`${API_URL}/api/requests/getallrequests`,config)
        .then(resolve => {
          if(resolve.data.requests.length !== 0)
            dispatchRequest({type:GET_REQUESTS,payload:resolve.data.requests})
        })
      }
      else if(empType === 'employee2'){
        axios.get(`${API_URL}/api/requests/getemployeerequests/${JSON.parse(localStorage.getItem('user')).id}`,config)
        .then(resolve => {
          if(resolve.data.requests.length !== 0){
            dispatchRequest({type:GET_REQUESTS,payload:resolve.data.requests})
          }
        })
      }
    }
  },[])

  return (
    <div className='custom-container'>
      <div className="pending">
        {
          lastPathValue==='admin'?
          <div className="tasks">
            <div className={selectedTasks === 0?"task active":"task"} onClick={() => setSelectedTasks(0)}>Allocated Tasks</div>
            <div className={selectedTasks === 1?"task active":"task"} onClick={() => setSelectedTasks(1)}>Unallocated Tasks</div>
          </div>:
          <h2>My Tasks</h2>
        }
      </div>
      <RequestTable columns={selectedTasks === 0 && empType === 'employee1'?allocatedTaskColumns:unAllocatedTaskColumns} data={tasks}/>
    </div>
  )
}

export default Employee