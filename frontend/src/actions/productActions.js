import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
         PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, 
         PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, 
         PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS,
         PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL} from '../constants/productConstants'
import axios from 'axios';

const listProducts = () => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get("/api/products")
        dispatch({type: PRODUCT_LIST_SUCCESS, payload :data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload :error.message})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const { userLogin:{userInfo}} = getState();
        const {data} = await axios.post('/api/products', product, {
            headers: {
                'Authorization':'Bearer' +userInfo.token
            }
        });
        dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
}

const updateProduct = (product) => async (dispatch, getState) => {
    console.log(product);
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product})
        const { userLogin:{userInfo}} = getState();
        const { data } = await axios.put("/api/products/" +product._id, product, {
            headers: {
                'Authorization':'Bearer' +userInfo.token,
            }
        });
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: PRODUCT_UPDATE_FAIL, payload :error.message})
    }
}

const deleteProduct = (productId) =>  async (dispatch, getState) => {
    try {
    const { userLogin:{userInfo}} = getState();      
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId}); 
    const {data} = await axios.delete('/api/products/' +productId, {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
    }); 
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success:true});
    } catch (error) {
    dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message})
    }
};


const detailsProduct = (productId) =>  async (dispatch) => {
    try {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});       
    const {data} = await axios.get('/api/products/' +productId); 
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
    }
}

export {listProducts, detailsProduct, saveProduct, deleteProduct, updateProduct};