import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState={
    user: user? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

//Async thunk function under Register user
export const register = createAsyncThunk('auth/register',
async (user, thunkAPI) =>{
    try {
        //request it and return
        return await authService.register(user);
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
//Async thunk function under login user
export const login = createAsyncThunk('auth/login',
async (user, thunkAPI) =>{
    try {
        //request it and return
        return await authService.login(user);
    } catch (error) {
        console.log(error);
        //if any of these exist => assign to message 
        const status = error.response.status;
        const message = (error.response && error.response.data 
            && error.response.data.message)|| error.message || error.toString();
        //reject it and send error msg as playload 
        return thunkAPI.rejectWithValue({status:status,message:message})   
    }
})
export const logout = createAsyncThunk('auth/logout', async () =>{
    await authService.logout(user);
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) =>{
            state.isLoading = true 
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            //above rejectvalue will pass to here
            state.message = action.payload
            state.user = null
        })
        //Add case for login
        .addCase(login.pending, (state) =>{
            state.isLoading = true 
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload //our respond from backend
        })
        .addCase(login.rejected, (state, action)=>{
            state.isError = true
            state.isLoading = false
            //above rejectvalue will pass to here
            state.message = action.payload
            state.user = null
        })
        //Add cases for logout
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
        })
    },
});

export const {reset} = authSlice.actions
export default authSlice.reducer