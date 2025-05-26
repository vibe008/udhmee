import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchresult: [],
     searchQuery: "" 
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchresult(state, action) {
            state.searchresult = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchresult = [];
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
    }

})

export const { setSearchresult, clearSearchResults ,setSearchQuery} = searchSlice.actions;
export default searchSlice.reducer;