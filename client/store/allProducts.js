import axios from "axios";
import history from "../history";

const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
const setProducts = (products) => ({ type: SET_PRODUCTS, products });
const addProduct = (product) => ({ type: ADD_PRODUCT, product });
export const clearProducts = () => ({ type: CLEAR_PRODUCTS, products: [] });

export const setProductsThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.get("/api/products", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProductThunk = (productInfo) => {
  //only possible for admins
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.post("/api/products", productInfo, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};
const initialState = [];
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case CLEAR_PRODUCTS:
      return [];
    default:
      return state;
  }
}
