import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchAllJZ = createAsyncThunk('JefeZonal/FetchAllJZ', 
    async()=>{
        try {
            const {data} = await axios.get('http://localhost:3001/api/JefesZonales')
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
)

export const FetchAllSuper = createAsyncThunk('Supervisor/FetchAllSuper',async()=>{
    try {
        const {data} = await axios.get('http://localhost:3001/api/Supervisores')
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})

export const FetchAllAgencia = createAsyncThunk('Agencia/FetchAllAgencia',async()=>{
  try {
    const {data} = await axios.get('http://localhost:3001/api/Agencia')
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
        throw error;
  }
})









