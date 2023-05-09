import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

//redux 
const initialState={
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: null,

};
export const createGoal = createAsyncThunk('goals/create',
async (goalText, thunkAPI) =>{
    try {
        //get the token
        const token = thunkAPI.getState().auth.user.token;
        console.log(`goalSlice: ${token} `)
        //request it and return 
        return await goalService.createGoal(goalText,token);
    } catch (error) {
        console.log("Create goal:"+error);
        console.log(error.response.status);
        const status = error.response.status;
        //if any of these exist => assign to message 
        const message = (error.response && error.response.data 
            && error.response.data.message)|| error.message || error.toString();
        //reject it and send error msg as playload 
        return thunkAPI.rejectWithValue({status:status,message:message})  
    }
})
//get user goal
export const getGoals = createAsyncThunk('goals/getAll',
async (_,thunkAPI) =>{
    try {
        //get the token
        const token = thunkAPI.getState().auth.user.token;
        //request it and return 
        return await goalService.getGoals(token);
    } catch (error) {
        console.log("get goals:"+error);
        const status = error.response.status;
        //if any of these exist => assign to message 
        const message = (error.response && error.response.data 
            && error.response.data.message)|| error.message || error.toString();
        //reject it and send error msg as playload 
        return thunkAPI.rejectWithValue({status:status,message:message}) 
    }
})
//delete a goal
export const deleteGoal = createAsyncThunk('goals/delete',
async (id,thunkAPI) =>{
    try {
        //get the token
        const token = thunkAPI.getState().auth.user.token;
        //request it and return 
        return await goalService.deleteGoal(id, token); 
    } catch (error) {
        console.log(error);
        const status = error.response.status;
        //if any of these exist => assign to message 
        const message = (error.response && error.response.data 
            && error.response.data.message)|| error.message || error.toString();
        //reject it and send error msg as playload 
        return thunkAPI.rejectWithValue({status:status,message:message})  
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers:{
        //initialState
        reset: (state) => initialState
        
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createGoal.pending, (state) =>{
            state.isLoading = true 
        })
        .addCase(createGoal.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.goals.push(action.payload) //push the new goal 
        })
        .addCase(createGoal.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            //above rejectvalue will pass to here
            state.errorMessage = action.payload
        })
        .addCase(getGoals.pending, (state) =>{
            state.isLoading = true 
        })
        .addCase(getGoals.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.goals = action.payload 
        })
        .addCase(getGoals.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            //maybe important for us to write it also
            state.isSuccess = false
            //state.goals = []
            //above reject value will pass to here
            state.errorMessage = action.payload
        })
        .addCase(deleteGoal.pending, (state) =>{
            state.isLoading = true 
        })
        .addCase(deleteGoal.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            //display all goals except of that one 
            state.goals = state.goals.filter(
                (goal) => { return goal._id !== action.payload.id } 
            ) 
        })
        .addCase(deleteGoal.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.errorMessage = action.payload
        })
    }
});

export const {reset} = goalSlice.actions
export default goalSlice.reducer