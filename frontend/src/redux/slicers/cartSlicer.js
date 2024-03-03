import { createSlice } from "@reduxjs/toolkit";

let cartData = [];
export const cartSlicer = createSlice({
  name: "cartSlicerName",
  initialState: cartData,
  reducers: {
    addToCart(state, action) {
      console.log("Add to cart called from cartSlicer here is the state : ");
      console.log(state);
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((pObj) => {
        return pObj.pdescription !== action.payload; //RETURNING A NEW DATA FROM FILTER WHICH IS NOT EQUAL TO THE PARAMETER THAT IS PASSED TO THE FUNCTION
      });
    },
    emptytheCart(state) {
       return [] // will make sure that length = 0 justify and all the values will get deleted and lenght of state will be equal to 0
    },
  },
});

// exporting all reducers
export const cartSlicerRecucer = cartSlicer.reducer;

// exporting all actions to be used in the components
export const { addToCart, removeFromCart, emptytheCart } = cartSlicer.actions;

// ERROR ENCOUNTERED WHILE MAKING LOGIC
// HERE WE NEED TO USE THE RETURN IN THE FILTER SINCE FILTER WILL GIVE YOU AN OUTPUT
// AND NOT CHANGINT THE ACTUAL STATE SO WE HAVE RETURNED IT SO THAT ANYTHING THAT RETURN BY A REDUCER
// WILL REPLACE THE INITIAL STATE
