import { addToCart } from "../redux/slicers/cartSlicer";
import { fetchProducts } from "./fetchProduct";
import { emptytheCart } from "../redux/slicers/cartSlicer";
export const fetchCartProduct = async (authToken, dispatch) => {
    // this will deleted anything which is inside the redux store cart value to save from any remaining value 
    dispatch(emptytheCart())


  try {
    const response = await fetch("http://localhost:4000/cart/fetchproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let fetchhProducts = await response.json(); // parses JSON response into native JavaScript objects
    // console.log("fetched cart products from the fetchCart that is passed on use effect is : ",fetchProducts)

    if (fetchhProducts.status === true) {
        console.log("Value of the data that is stored in the cart is : ", fetchhProducts)
        // USING USEDISPATCH TO DISPATCH THE INFORMATION TO REDUX STATE 
        // since the add to cart takes object but here we are returning the array of objects so using loops to add data dynamically 
        for (let product of fetchhProducts.data){
            
            dispatch(addToCart(product))
        }
         
    
 
    } else {
      console.log("Invalid User");
    }
  } catch (error) {
    console.log("Error found while fetching use is : ", error);
  }
};
