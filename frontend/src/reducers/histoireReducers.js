import { HISTOIRE_LIST_FAIL, HISTOIRE_LIST_REQUEST, HISTOIRE_LIST_SUCCESS, 
        HISTOIRE_SAVE_FAIL, HISTOIRE_SAVE_REQUEST, HISTOIRE_SAVE_SUCCESS, 
        HISTOIRE_UPDATE_FAIL, HISTOIRE_UPDATE_REQUEST, HISTOIRE_UPDATE_SUCCESS } from "../constants/histoireConstants.js";


function histoireListReducer(state ={histoires:[]}, action) {


    switch (action.type) {
        case HISTOIRE_LIST_REQUEST:
            return{loading: true};
        case HISTOIRE_LIST_SUCCESS:
            return{loading:false, histoires: action.payload};
        case HISTOIRE_LIST_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

function histoireSaveReducer(state ={histoires: {}}, action) {


    switch (action.type) {
        case HISTOIRE_SAVE_REQUEST:
            return{loading: true};
        case HISTOIRE_SAVE_SUCCESS:
            return{loading:false, success:true, histoires: action.payload};
        case HISTOIRE_SAVE_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

function histoireUpdateReducer(state ={histoires: {}}, action) {


    switch (action.type) {
        case HISTOIRE_UPDATE_REQUEST:
            return{loading: true};
        case HISTOIRE_UPDATE_SUCCESS:
            return{loading:false, success:true, histoires: action.payload};
        case HISTOIRE_UPDATE_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

export { histoireSaveReducer, histoireListReducer, histoireUpdateReducer }