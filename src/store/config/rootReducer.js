import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import shop from 'store/reducers/shop';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  shop,
});
export default createRootReducer;
