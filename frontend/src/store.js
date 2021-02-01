import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; 
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducers'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { userLoginReducer } from './reducers/userReducers';
import { pageListReducer, pageSaveReducer, pageUpdateReducer } from './reducers/pageReducers';

const userInfo = Cookie.getJSON('userInfo') || null;


const initialState = {userLogin: {userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    pageSave: pageSaveReducer,
    pageList: pageListReducer,
    pageUpdate: pageUpdateReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;