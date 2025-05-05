import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchAllJZ = createAsyncThunk('JefeZonal/FetchAllJZ', 
    async()=>{
        try {
            const {data} = await axios.get('https://api-rena-1.onrender.com/api/JefesZonales')

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
)

export const FetchAllSuper = createAsyncThunk('Supervisor/FetchAllSuper',async()=>{
    try {
        const {data} = await axios.get('https://api-rena-1.onrender.com/api/Supervisores')

        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})

export const FetchAllAgencia = createAsyncThunk('Agencia/FetchAllAgencia',async()=>{
  try {
    const {data} = await axios.get('https://api-rena-1.onrender.com/api/Agencia')

    return data
  } catch (error) {
    console.error('Error fetching data:', error);
        throw error;
  }
})









