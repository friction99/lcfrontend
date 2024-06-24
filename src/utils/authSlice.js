import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
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
        } 
    }
})

export const {loginSuccess,loginFailure,logout} = authSlice.actions;
export default authSlice.reducer;