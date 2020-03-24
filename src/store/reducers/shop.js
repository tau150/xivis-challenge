import types from '../../constants/types';


const initialState = {
  isLoading: false,
  products: [],
  errorMessage: null,
};

const shopReducer = (state = initialState, action) => {

  switch (action.type) {

    default:
      return state;
  }
};

export default shopReducer;
