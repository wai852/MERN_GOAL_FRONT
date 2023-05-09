import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { login, reset} from '../features/auth/authSlice';
import { useNavigate} from 'react-router-dom';
import { FaSignInAlt} from 'react-icons/fa'
import Spinner from '../components/Spinner'; 
import { toast} from 'react-toastify';

function Login() {
  //Destructuring array
  const [formData, setFormData ] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //distructing
  const {user, isLoading, isError, isSuccess, message}
  = useSelector((state)=>{
    return state.auth;
  })
  //this will fire of user effect  
  //when user has some changes
  useEffect(() => {
    console.log(`Login i fire once: ${Date.now()}`);

    if (isError) {
      console.log("login_error:"+message);
      toast.error(message)
    }
    //if already has account / token is valid
    if (isSuccess || user) {
      console.log(`login:${isSuccess}`);
      navigate('/')
    }
    //new add
    //else{
    //  console.log("Login inside")
    //  dispatch(reset()); //reset auth
    //}
    console.log("Login outside")
    //reset auth everything, but dont reset user = null
    dispatch(reset()); //if comment it, will contiune render it
    

  }, [user, isError, isSuccess, message,
     navigate, dispatch])
  function handleOnChange(event){
    //Destructuring obj(target)
      const {value, name } = event.target;
      setFormData(preValue => {
        return {
          ...preValue,
          [name]:value
        };
      });
  }
  function submitUserDataLogin(event){
    event.preventDefault();
    //obj
    const userData = { 
      email: formData.email,
      password: formData.password
    }
    dispatch(login(userData));
  }
  
  if(isLoading){ return <Spinner/>}
  return (
    <div>
    <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Login your account</p>
    </section>
    <form className='form' onSubmit={submitUserDataLogin}>
    <div className="form-group">
    <input type="email" className="form-control" id="email" name="email"
     value = {formData.email} placeholder='email' onChange={handleOnChange} />
    </div>
    <div className="form-group">
    <input type="password" className="form-control" id="password" name="password"
     value = {formData.password} placeholder='password' onChange={handleOnChange} />
    </div>
    <div className="form-group">
      <button type="submit" className='btn btn-block'>Login</button>
    </div>
    </form>
    </div>
  )
}

export default Login