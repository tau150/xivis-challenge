import fetchProducts from 'services/products';
import types from 'constants/types';

const getProductsSuccess = (products) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});


export const getProductsError = (errorMessage) => ({
  type: types.GET_PRODUCTS_ERROR,
  payload: {
    errorMessage,
  },
});


const fetchProductsStart = () => ({
  type: types.GET_PRODUCTS_START,
});


export const toggleLoading = () => ({
  type: types.TOGGLE_LOADING,
});


export const setProductToToSeeDetails = (productWitDetails) => ({
  type: types.SET_PRODUCT_DETAILS,
  payload: {
    productWitDetails,
  },
});


const setProductsOnCart = (products) => ({
  type: types.SET_PRODUCTS_ON_CART,
  payload: {
    products,
  },
});

export const setSearch = (searchValue) => ({
  type: types.SET_SEARCH,
  payload: {
    searchValue,
  },
});

export const setOrder = (orderValue, orderDirection) => ({
  type: types.SET_ORDER,
  payload: {
    orderValue,
    orderDirection,
  },
});


export const setProductsAndStock = (selection, updatedProducts) => async (dispatch) => {
  dispatch(setProductsOnCart(selection));
  dispatch(getProductsSuccess(updatedProducts));
};


export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const result = await fetchProducts();
    dispatch(getProductsSuccess(result));
  } catch (e) {
    dispatch(getProductsError(e.message || 'Ocurrió un error'));
  }
};
