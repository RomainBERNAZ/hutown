import { PHOTOGRAPH_LIST_FAIL, PHOTOGRAPH_LIST_REQUEST, PHOTOGRAPH_LIST_SUCCESS } from "../constants/photographConstants";

function photographListReducer(state ={photographs:[]}, action) {


    switch (action.type) {
        case PHOTOGRAPH_LIST_REQUEST:
            return{loading: true};
        case PHOTOGRAPH_LIST_SUCCESS:
            return{loading:false, products: action.payload};
        case PHOTOGRAPH_LIST_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

export { photographListReducer}