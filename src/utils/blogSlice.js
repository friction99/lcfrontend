import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
    name:"blog",
    initialState:{
        user_id : null
    },
    reducers:{
        setUserId:(state,action)=>{
            state.user_id = action.payload;
        }
    }
})
export const {setUserId} = blogSlice.actions
export default blogSlice.reducer