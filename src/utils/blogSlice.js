import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: null
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.user_id = action.payload;
        },
        clearBlogState: () => initialState 
    }
});

export const { setUserId, clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;
