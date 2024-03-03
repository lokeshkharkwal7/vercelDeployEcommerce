import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  //CHAGNED THE NAME
  data: [],
  loading: false,
  error: null,
};
export const slicerFetchProduct = createSlice({
  initialState: initialProductState, //CHANGED THE NAME         // decleared above
  name: "fetchProductsSlicerName", // name of the reducer we will use it on the store
  reducers: {
    // all the reducers
    fetchdataRequest(state, action) {
      state.loading = false;
      state.data = action.payload; // taking the parameters wihle calling as payload
    },
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchdataError(state, action) {
      state.loading = false; // taking the parameters wihle calling as payload
      state.error = action.payload; // payload is the parameter which is passed during the function call
    },
  },
});
// importing all the reducers
export const FetchProductReducer = slicerFetchProduct.reducer;
// importing all the required actions
export const { fetchdataRequest } = slicerFetchProduct.actions;
 

// ERRORS THAT I GOT WHILE COMPILING THE CODES :

// 1. YOU CANNOT USE THE , IN THE FOLLOWING REDUCERS INSIDE THE REDUCERS THAT YOU ARE USING WITH CREATESLICE TO SPERATE
// DIFFERENT STATES LIKE LOADING AND ERROR

// 2. MAKE SURE YOU DO NOT CHANGE THE INITIALSTATE INSIDE CREATE SLICE TO ANY DIFFERENT VARIABLE
// OTHER THAN INITIALSTATE OTHERWISE IT WILL CAUSE A TREMENDOUS ERROR
