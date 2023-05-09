//make http request and respond;
//send the data in storage
import axios from 'axios'

//can put localhost 5000 here or make a proxy 
const API_URL = '/api/goals/'

//create new Goal
async function createGoal(textContent,token){
    console.log(`create goal:${token}`)
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    }
    //request to post to this url 
    const response = await axios.post(API_URL, textContent, config);
    return response.data;
}
//get goals
async function getGoals(token){
    console.log(`get goal:${token}`)
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    }
    //request to post to this url 
    const response = await axios.get(API_URL, config);
    return response.data;
}
//delete a goal
async function deleteGoal(goalId, token){
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        },
    }
    //request to post to this url 
    const response = await axios.delete(API_URL+goalId, config);
    return response.data;
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
};

export default goalService