import { applyMiddleware, createStore } from 'redux';
import reducer from "../reducers";
import {thunk} from "redux-thunk";


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// import apis from '../middlewares/apis';
// const enhancers = composeEnhancers(
//   applyMiddleware( apis ),
// );

const store = createStore(reducer, applyMiddleware(thunk));

export default store;