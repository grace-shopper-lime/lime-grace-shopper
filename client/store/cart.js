import axios from "axios";
import history from "../history";

const SET_CART = "SET_CART";
const ADD_CART = "ADD_CART";
const DELETE_ITEM = "DELETE_ITEM";
const CLEAR_CART = "CLEAR_CART";
const setCart = (cart) => ({ type: SET_CART, cart });
const addToCart = (product) => ({ type: ADD_CART, product });
const deleteFromCart = (product) => ({ type: DELETE_ITEM, product });

export const clearCart = () => ({ type: CLEAR_CART, cart: [] });

export const setCartThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        window.localStorage.removeItem("cart");
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCart(data));
      } else {
        if (window.localStorage.getItem("cart")) {
          dispatch(setCart(window.localStorage.getItem("cart")));
        } else {
          dispatch(setCart([]));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFromCartThunk = (productInfo) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      if (token) {
        const { data } = await axios.delete("/api/cart", productInfo, {
          headers: {
            authorization: token,
          },
        });
        dispatch(deleteFromCart(data));
      } else {
        let currentCart = window.localStorage.getItem("cart");
        currentCart = currentCart.filter(
          (element) => element.id !== productInfo.id
        );
        window.localStorage.setItem("cart", currentCart);
        dispatch(deleteFromCart(productInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCartThunk = (productInfo) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token") || "";
      if (token) {
        const { data } = await axios.post("/api/cart", productInfo, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addToCart(data));
      } else {
        let currentCart = window.localStorage.getItem("cart");
        currentCart.push(productInfo);
        window.localStorage.setItem("cart", currentCart);
        dispatch(addToCart(productInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };
};


const initialState = [];
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_CART:
      return [...state, action.product];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.product.id);
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}