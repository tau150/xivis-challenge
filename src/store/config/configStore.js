import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from 'store/config/rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';


const history = createBrowserHistory();
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};


const persistedReducer = persistReducer(persistConfig, createRootReducer(history));


const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);

const persistor = persistStore(store);


export { store, persistor, history };
