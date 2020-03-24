import types from 'constants/types';

const initialState = {
  isLoading: false,
  products: [],
  errorMessage: null,
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
    default:
      return state;
  }
};

export default shop;
