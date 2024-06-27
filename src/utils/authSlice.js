import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user_id:null,
        token:null,
        message:null
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.token = action.payload;
            state.message = null;
        },
        loginFailure:(state,action)=>{
            state.token = null;
            state.message = action.payload;
        }, 
        logout:state=>{
            state.token = null;
            state.message = null;
        },
        setterid:(state,action)=>{
            state.user_id = action.payload;
        } 
    }
})

export const {loginSuccess,loginFailure,logout,setterid} = authSlice.actions;
export default authSlice.reducer;