import React,{useState,useEffect} from 'react'
import '../../helpers/commonStyles.scss'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { sharedHelper } from '../../helpers/sharedHelper';
import {API_URL} from '../../constants'

import Loader from '../../components/loader/Loader';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function Login() {
  const [showPassword,setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)
  const [fetched,setFetched] = useState(false)
  const [user,setUser] = useState({
    username:'',
    password:'',
    userType:null,
    error:'',
    success:''
  })

  const navigate = useNavigate();
  
  useEffect(() => {
    let isAuth = localStorage.getItem('authToken')
    if(isAuth && isAuth !== 'undefined') {
      navigate(1)
    }
 }, [])
 
 useEffect(()=>{
   if(fetched === 'done'){
     setLoading(false)
   }
 },[fetched])

  const handleLogin = async(e) =>{
    e.preventDefault()
    if(user.username === '' || user.userType === null || user.password === ''){
      setUser({...user,error:'Please fill all the details.'})
      return
    }
    setLoading(true)
    setFetched('start')
    axios.post(`${API_URL}/login`,{...user})
    .then(res =>{
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      setUser({...user,success:res.data.msg})
      setFetched('done')
      setTimeout(()=>{
        if(res.data.user.username === 'employee1'){
          window.location.assign('/user/admin')
        }
        else if(res.data.user.username === 'employee2'){
          window.location.assign('/user/employee')
        }
        else if(res.data.user.username === 'customer'){
          window.location.assign('/user/customer')
        }
      },500)
    })
    .catch(rej => {
      setUser({...user,error:rej.response.data.msg})
    })
  }
  
  return (
    <div className='container'>
      <form className='form' method='POST'>
        <span className='header'><LockOpenIcon/><h3>Login</h3></span>
        <select name="UserType" className='dropdown' onChange={(e) => setUser({...user,error:'',userType:Number(e.target.value)})}>
          <option value={null}>Select User Type</option>
          <option value={0}>Employee</option>
          <option value={1}>Customer</option>
        </select>
        <input type="text" placeholder='Username' className='input' name='username' value={user.username} onChange={(e) => sharedHelper.handleInputChange(e,user,setUser)}/>
        <span className='password'>
          <input type={showPassword?"text":"password"} placeholder='Password' className='password-input'name='password' value={user.password} onChange={(e) => sharedHelper.handleInputChange(e,user,setUser)}/>
          {
            showPassword?<span className='icon' onClick={() => setShowPassword(!showPassword)}><VisibilityOffIcon/></span>:<span className='icon' onClick={() => setShowPassword(!showPassword)}><VisibilityIcon/></span>
          }
          </span>
          <div className='message'>
            {
              user.success?<h5 className='success'>{user.success}</h5>:user.error?<h5 className='error'>{user.error}</h5>:null
            }
          </div>
        <button onClick={(e) => handleLogin(e)}>Login</button>
      </form>
      {
        loading?<Loader/>:null
      }
    </div>
  )
}

export default Login