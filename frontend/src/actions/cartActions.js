import axios from "axios"
import Cookie from 'js-cookie'
import { CART_ADD_ITEM } from "../constants/cartConstants";

const addToCart = (productId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get("/api/products/" + productId);
      dispatch({
        type: CART_ADD_ITEM, payload: {
          product: data._id,
          name: data.name,
          price: data.price,
        }
      });
      const { cart: { cartItems } } = getState();
      Cookie.set("cartItems", JSON.stringify(cartItems));
  
    } catch (error) {
  
    }
  }

export { addToCart }