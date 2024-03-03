import { createSlice } from "@reduxjs/toolkit";

const user  =[]
const userInfoSlicer = createSlice({
    initialState : user,
    name: "UserInfoSlicer",
    reducers:{
        insertUserData (state , action){
            state.push(action.payload)
        },
        deleteUserData (state, action){
           state.length = 0   // this will satisfy and state have to make it length to 0 meaning removing all elements 
        }
    }
})

export const userInfoReducer = userInfoSlicer.reducer
export const {insertUserData,deleteUserData} = userInfoSlicer.actions


// ERROR OCCURED 
// state.length = 0   // this will satisfy and state have to make it length to 0 meaning removing all elements 
