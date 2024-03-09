import { createSlice } from "@reduxjs/toolkit";
const initalSearchProducts = {
  //CHAGNED THE NAME
  data: [],
  searchedText: "Initial name",
};
export const slicerSearchProduct = createSlice({
  initialState: initalSearchProducts, //CHANGED THE NAME         // decleared above
  name: "fetchSearchProductSlicer", // name of the reducer we will use it on the store
  reducers: {
    // all the reducers
    storeSearchData(state, action) {
      state.data = action.payload; // taking the parameters wihle calling as payload
    },
    searchDataText(state, action) {
      state.searchedText = action.payload; // taking the parameters wihle calling as payload
    },
  },
});
// importing all the reducers
export const storeSearchDataReducer = slicerSearchProduct.reducer;
// importing all the required actions
export const { storeSearchData, searchDataText } = slicerSearchProduct.actions;
