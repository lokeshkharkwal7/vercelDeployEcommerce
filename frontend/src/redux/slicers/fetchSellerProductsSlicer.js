import { createSlice } from "@reduxjs/toolkit";
const productdata = {
  data: [],
  loading: true,
};
const fetchProductsellercategory = createSlice({
  name: "fetchProductSellerCategoryName",
  initialState: productdata,
  reducers: {
    fetchSellerProductCategory(state, action) {
      state.data = action.payload;
    },
    deleteSellerProductAction(state, action) {
      state.data =  state.data.filter((data) => {
        return data.pname !== action.payload; //returning data which are not equal to payload
      });
    },
  },
});

export const { fetchSellerProductCategory, deleteSellerProductAction } =
  fetchProductsellercategory.actions;
export const fetchProductSellerCategoryReducer =
  fetchProductsellercategory.reducer;
