import React,{useState,useEffect,useContext} from 'react'
import './styles.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import {RequestContext} from '../../context/requests'
import {ADD_REQUEST, API_URL,config} from '../../constants'
import {Multiselect} from 'multiselect-react-dropdown' 

function SupprtRequestForm({open,setOpen}) {    
    const [products,setProducts] =  useState([])
    const [issues,setIssues] =  useState([])
    const [error,setError] = useState('')
    const request = useContext(RequestContext)
    const [newRequest,setNewRequest] = useState({
        userId:JSON.parse(localStorage.getItem('user')).id,
        productType:'',
        issueType:[],
        desc:'',
        file:'' 
    })

    useEffect(()=> {
        axios.get(`${API_URL}/products`,config)
        .then(resolve => setProducts(resolve.data))
    },[])
    
    const handleFetchIssues = (e) => {
        setNewRequest({...newRequest,productType:e.target.value})
        axios.get(`${API_URL}/issues/${e.target.value}`,config)
        .then(resolve => setIssues(resolve.data.issues))
    }
    
    const handleSubmitNewRequest = (e) => {
        e.preventDefault()
        if(newRequest.productType === ''){
            setError('Please provide the product type.')
            return
        }
        if(newRequest.issueType.length === 0){
            setError('Please provide the issue types.')
            return
        }   
        setError('')
        axios.post(`${API_URL}/requests/create`,{...newRequest},config)
        .then(resolve => {
            request.dispatchRequest({type:ADD_REQUEST,payload:resolve.data.request})
            setOpen(!open)
        })
        .catch(reject => setError(reject.response.data.msg))
    }

    return (
        open?
            <div className='form-container'>
                <form action="" className="form">
                <CloseIcon className='close' onClick={() => setOpen(!open)}/>
                <h2>New Request</h2>
                <select name="" className='select' onChange={(e) => handleFetchIssues(e)}>
                    <option value="null">Selet Product Type</option>
                    {
                        products?.map(item => (
                            <option value={item._id} key={item._id}>{item.product}</option>
                        ))
                    }
                </select>
                <Multiselect
                  isObject={false}
                  onRemove={(e) => setNewRequest({...newRequest,issueType:e})}
                  onSelect={(e) => setNewRequest({...newRequest,issueType:e})}
                  options={issues}  
                  placeholder='Select Issue'
                  style={{
                    chips: {
                      background: '#612940'
                    },
                    searchBox: {
                        width:'100%',
                        padding:'10px',
                        border: '2px solid lightgray',
                        borderBottom: '2px solid lightgray',
                        borderRadius: '5px'
                    }}}
                />
                <textarea name="" className='textarea' placeholder='Please describe your issue.' onChange={(e) =>  setNewRequest({...newRequest,desc:e.target.value})}/>
                <input type="file" accept='.pdf, .doc, .docx, .jpg, .png'/>
                <div className="error">{error === ''?null:error}</div>
                <button onClick ={(e) =>  handleSubmitNewRequest(e)}>Submit</button>
            </form> 
        </div>:
        null
    )
}

export default SupprtRequestForm