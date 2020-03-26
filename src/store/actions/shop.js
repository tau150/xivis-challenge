import fetchProducts from 'services/products';
import types from 'constants/types';

const getProductsSuccess = (products, numberOfPages, currentPage) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: {
    products,
    numberOfPages,
    currentPage,
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

export const finalizePurchase = () => ({
  type: types.FINALIZE_PURCHASE,
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

export const setCurrentPage = (currentPage) => ({
  type: types.SET_CURRENT_PAGE,
  payload: {
    currentPage,
  },
});

export const setProductsAndStock = (selection, updatedProducts, numberOfPages, currentPage) => async (dispatch) => {
  dispatch(setProductsOnCart(selection));
  dispatch(getProductsSuccess(updatedProducts, numberOfPages, currentPage));
};


export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const result = await fetchProducts();
    const numberOfPages = Math.ceil(result.length / 9);
    const currentPage = 1;
    dispatch(getProductsSuccess(result, numberOfPages, currentPage));
  } catch (e) {
    dispatch(getProductsError(e.message || 'Ocurrió un error'));
  }
};
