import { createSlice } from "@reduxjs/toolkit";

// Define the initial state as a separate constant
const initialState = {
    user_id: null,
    token: null,
    message: null,
    admin_token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState, // Use the initial state constant here
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.message = null;
            state.admin_token = null;
        },
        loginFailure: (state, action) => {
            state.token = null;
            state.message = action.payload;
            state.admin_token = null;
        },
        setterid: (state, action) => {
            state.user_id = action.payload;
        },
        setteradmin: (state, action) => {
            state.admin_token = action.payload;
        },
        clearAuthState: () => initialState
    }
});

export const { loginSuccess, loginFailure,setterid, setteradmin, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
