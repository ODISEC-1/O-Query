import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const VerifyLogin = createAsyncThunk(
   'auth/login',
   async (credentials, { rejectWithValue }) => {
     try {
       const response = await axios.post('https://apirena-production.up.railway.app/api/Login', credentials);
       const { token, datos } = response.data;
       localStorage.setItem('token', token);
       return datos ;
     } catch (error) {
       if (!error.response) {
         throw error;
       }
       return rejectWithValue(error.response.data);
     }
   }
 )
 

