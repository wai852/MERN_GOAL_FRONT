
//make http request and respond;
//send the data in storage
import axios from 'axios'
import API_BASE_URL from '../../app/api/apiSlice';
//can put localhost 5000 here or make a proxy 
const API_URL = '/api/users/'
console.log(API_BASE_URL);
//register user
async function register(userData){
    //post the user data by this url and assign 
    //the response when return data
    const response = await axios.post(API_BASE_URL+API_URL,userData);
    //check exist or not
    if(response.data){
        //it will be including our data 
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}
//login user
async function login(userData){
    //post the user data by this url and assign 
    //the response when return data
    const response = await axios.post(API_URL+"login",userData);
    //check exist or not
    if(response.data){
        //it will be including our data 
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}
//can dont make servier function here
//logout user
async function logout (){
    //acutally can use http only cookie 
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
};

export default authService