import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { encryptData } from "../../../../utils/Encriptar";

export const VerifyLogin = createAsyncThunk(
   'auth/login',
   async (credentials, { rejectWithValue }) => {
     try {
       const response = await axios.post('https://api-rena.onrender.com/api/Login', credentials);
       const { token, datos,access } = response.data;

       const DT={
        ...datos,
       }

       if (response) {
        if (response.data.access) {
          const encryp = encryptData(DT)
          localStorage.setItem('token', JSON.stringify(encryp,access));
        }else{
          console.log(response.data.message)
          return response.data.message;
        }
       }
       
       return access ;
     } catch (error) {
       if (!error.response) {
         throw error;
       }
       return rejectWithValue(error.response.data);
     }
   }
 )
 