import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const VerifyLogin =createAsyncThunk('Auth/Login',async(data)=>{
   try {
     const {data} = await axios.post('http://localhost:3001/api/Login',data);
    return data
   } catch (error) {
            console.error('Error usuario:', error);
        throw error;
   }
})
 

