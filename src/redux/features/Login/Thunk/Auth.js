import { Token } from "@mui/icons-material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const VerifyLogin = createAsyncThunk(
   'auth/login',
   async (credentials, { rejectWithValue }) => {
     try {
       const response = await axios.post('https://apirena-production.up.railway.app/api/Login', credentials);
       const { token, datos } = response.data;
       const DT = {
         token,
         ...datos
       }
       localStorage.setItem('token', JSON.stringify(DT));
        console.log(response)
       return { datos, token };
     } catch (error) {
       if (!error.response) {
         throw error;
       }
       return rejectWithValue(error.response.data);
     }
   }
 )
 

