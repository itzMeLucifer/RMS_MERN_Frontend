import React,{useEffect,useState} from 'react'
import moment from 'moment'
import {config} from '../../../constants'
import axios from 'axios'

import VisibilityIcon from '@mui/icons-material/Visibility'
import Request from '../../request/Request'

function TableRow({item}) {
    const [user,setUser] = useState({})
    const [product,setProduct] = useState({})
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user')).username === 'employee1'){
          axios.get(`/api/requests/get/admin/${item._id}`,config)
          .then(resolve => {
              setUser(resolve.data.user)
              setProduct(resolve.data.product)
          })   
          return
        }    
        axios.get(`/api/requests/get/${item._id}`,config)
        .then(resolve => {
            setUser(resolve.data.user)
            setProduct(resolve.data.product)
        })   
    },[item])

    const showIssue = () => {
      var str = ''
      for(let i=0;i<item.issueType.length;i++){
        if(str === ''){
          str = str+item.issueType[i]
        }
        else{
          str = str+", "+item.issueType[i]
        }
      }
      return str
    }

    return (
      <tr>
        <td className='xs-hide'>{user.username}</td>
        <td>{product.product}</td>
        <td className='m-hide'>{showIssue()}</td>
        <td className='s-hide'>{moment(item.createdAt).format('DD/ MM/ YYYY')}</td>
        <td>{item.status}</td>
        <td className='more'><VisibilityIcon className='more-icon' onClick={() => setOpen(!open)}/></td>
        {
          open?
          <td><Request open={open} setOpen={setOpen} data={{product:product.product,issue:showIssue(),status:item.status,desc:item.desc}} info={item}/></td>:null
        }
      </tr>
    )
}

export default TableRow