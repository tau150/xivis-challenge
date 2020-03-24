import fetchProducts from 'services/products';
import types from 'constants/types';


const setProducts = (products) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const fetchProductsStart = () => ({
  type: types.GET_PRODUCTS_START,
});


export const toggleLoading = () => ({
  type: types.TOGGLE_LOADING,
});


export const setProductToToSeeDetails = () => ({
  type: types.SET_PRODUCT_DETAILS,
});


export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const result = await fetchProducts();
    dispatch(setProducts(result));
  } catch (e) {

  }
};
