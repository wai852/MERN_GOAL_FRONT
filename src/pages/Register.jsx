import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {FaUser} from 'react-icons/fa';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  //Destructuring array
  const [formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
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
    if (isError) {
      toast.error(message)
    }
    //if already has account / token is valid
    if (isSuccess || user) {
      navigate('/')
    }
    //reset everything
    dispatch(reset());

  }, [user, isError, isSuccess, message,
     navigate, dispatch])

  function handleOnChange(event){
    //Destructuring obj(target)
      const {value, name } = event.target;
      console.log(name);
      setFormData(preValue => {
        return {
          ...preValue,
          [name]:value
        };
      });
  }
  function submitUserData(e){
    e.preventDefault();
    if(formData.password !== formData.passwordConfirm){
      toast.error('Pw dp mot match!')

    }else{
      //obj
      const userData = { 
        username: formData.username,
        email: formData.email,
        password: formData.password
      }
      dispatch(register(userData));
    }
  }
  if(isLoading){ return <Spinner/> }

  return (
    <>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Create your account</p>
    </section>
    <section className='form'>
    <form onSubmit={submitUserData}>
    <div className="form-group">
    <input type="text" className="form-control" id="username" name="username"
     value = {formData.username} placeholder='username' onChange={handleOnChange} />
    </div>
    <div className="form-group">
    <input type="email" className="form-control" id="email" name="email"
     value = {formData.email} placeholder='email' onChange={handleOnChange} />
    </div>
    <div className="form-group">
    <input type="password" className="form-control" id="password" name="password"
     value = {formData.password} placeholder='password' onChange={handleOnChange} />
    </div>
    <div className="form-group">
    <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm"
     value = {formData.passwordCon} placeholder='confirm password' onChange={handleOnChange} />
    </div>
    <div className="form-group">
      <button type="submit" className='btn btn-block'>Submit</button>
    </div>
    </form>

    </section>
    </>
  )
}

export default Register