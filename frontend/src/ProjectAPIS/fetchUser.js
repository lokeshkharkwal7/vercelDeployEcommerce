import { insertUserData, deleteUserData } from "../redux/slicers/fetchUserInfo";

export const fetchUser = async (authToken, dispatch) => {
  try {
    const response = await fetch("https://vercel-deploy-ecommerce-backend.vercel.app/user/fetchUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let userData = await response.json(); // parses JSON response into native JavaScript objects


    if (userData.status === true) {
          // REMOVING EVERYTHING WHICH IS RELATED TO USER IN THE REDUX STORE 
      dispatch(deleteUserData())
          // INSERTING DATA INTO THE REDUCER 
      dispatch(insertUserData(userData.data));
      // SAVING DATA TO THE LOCAL STORAGE FOR EASY ACCESS ANYWHERE 
      localStorage.setItem("userDataFromToken", JSON.stringify(userData.data))

      console.log("User found with type ", typeof userData, " : ", userData);
    } else {
      console.log("Invalid User");
    }
  } catch (error) {
    console.log("Error found while fetching use is : ", error);
  }
};
