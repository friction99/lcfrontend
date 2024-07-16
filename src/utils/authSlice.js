import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user_id: null,
    message: null,
    admin_id:null
};

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        setterid: (state, action) => {
            state.user_id = action.payload;
        },
        setteradmin: (state, action) => {
            state.admin_id = action.payload;
        },
        clearAuthState: () => initialState
    }
});

export const { setterid, setteradmin, clearAuthState} = authSlice.actions;
export default authSlice.reducer;
