import { createSlice } from "@reduxjs/toolkit";
import { VerifyLogin } from "./Thunk/Auth";


export const initialState={
    response: {},
    status: 'idle',
    error: null
}

const LoginSlice =createSlice({
    name:'LoginSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(VerifyLogin.pending,(state)=>{
        state.status = 'loading'
       })
       .addCase(VerifyLogin.fulfilled,(state,action)=>{
         state.status = 'succeeded';
         state.response =  action.payload;

       })
       .addCase(VerifyLogin.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.error.message;
        state.response ={};
       })
    }
})

export default LoginSlice.reducer;