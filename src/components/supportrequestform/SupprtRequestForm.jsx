import React,{useState,useEffect,useContext} from 'react'
import './styles.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import {RequestContext} from '../../context/requests'
import {ADD_REQUEST, config} from '../../constants'
import {Multiselect} from 'multiselect-react-dropdown' 

function SupprtRequestForm({open,setOpen}) {    
    const [products,setProducts] =  useState([])
    const [issues,setIssues] =  useState([])
    const [file,setFile] = useState(null)
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
        axios.get('/api/products',config)
        .then(resolve => setProducts(resolve.data))
    },[])
    
    const handleFetchIssues = (e) => {
        setNewRequest({...newRequest,productType:e.target.value})
        axios.get(`/api/issues/${e.target.value}`,config)
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
        if(file === null){
            setError('Please provide the necessary documents.')
            return
        }
        setError('')
        let formData = new FormData();
        for(const item in newRequest){
            formData.append(item,newRequest[item])
        }
        if(file && newRequest.file)
            formData.append('originalFile',file)
        axios.post(`/api/requests/create`,formData,config)
        .then(resolve => {
            request.dispatchRequest({type:ADD_REQUEST,payload:resolve.data.request})
            setOpen(!open)
        })
        .catch(reject => setError(reject.response.data.msg))
    }

    const handleFileSelect = (e) => {
        setError('')
        setNewRequest({...newRequest,file:e.target.files[0].name})
        setFile(e.target.files[0])
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
                <input type="file" accept='.pdf, .doc, .docx, .jpg, .png' onChange={(e) => handleFileSelect(e)}/>
                <div className="error">{error === ''?null:error}</div>
                <button onClick ={(e) =>  handleSubmitNewRequest(e)}>Submit</button>
            </form> 
        </div>:
        null
    )
}

export default SupprtRequestForm