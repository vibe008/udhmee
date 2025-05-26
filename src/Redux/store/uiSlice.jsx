import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
    ismobile: false,
    ismenuClose:false
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setIsMobile(state, action) {
            state.ismobile = action.payload
        },
        togglemenu(state ,action){
            state.ismenuClose = action.payload
        }
    }
})

export const { toggleTheme, setIsMobile, setTheme ,togglemenu} = uiSlice.actions;
export default uiSlice.reducer;