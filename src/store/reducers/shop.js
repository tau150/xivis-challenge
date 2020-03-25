import types from 'constants/types';

const initialState = {
  isLoading: false,
  products: [],
  errorMessage: null,
  productWitDetails: {},
  productsOnCart: [],
  searchValue: null,
  order: 'importance',
  orderDirection: 'asc',
};

const shop = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        isLoading: false,
        errorMessage: null,
      };
    case types.GET_PRODUCTS_ERROR:
      return {
        ...state,
        products: [],
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case types.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case types.SET_PRODUCTS_ON_CART:
      return {
        ...state,
        productsOnCart: action.payload.products,
      };

    case types.SET_PRODUCT_DETAILS:
      return {
        ...state,
        productWitDetails: action.payload.productWitDetails,
      };

    case types.SET_SEARCH:
      return {
        ...state,
        searchValue: action.payload.searchValue,
      };

    case types.SET_ORDER:
      return {
        ...state,
        order: action.payload.orderValue,
        orderDirection: action.payload.orderDirection,
      };


    default:
      return state;
  }
};

export default shop;
