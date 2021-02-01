import { PAGE_LIST_FAIL, PAGE_LIST_REQUEST, PAGE_LIST_SUCCESS, 
         PAGE_SAVE_FAIL, PAGE_SAVE_REQUEST, PAGE_SAVE_SUCCESS, 
         PAGE_UPDATE_FAIL, PAGE_UPDATE_REQUEST, PAGE_UPDATE_SUCCESS } from "../constants/pageConstants";


function pageListReducer(state ={pages:[]}, action) {


    switch (action.type) {
        case PAGE_LIST_REQUEST:
            return{loading: true};
        case PAGE_LIST_SUCCESS:
            return{loading:false, pages: action.payload};
        case PAGE_LIST_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

function pageSaveReducer(state ={pages: {}}, action) {


    switch (action.type) {
        case PAGE_SAVE_REQUEST:
            return{loading: true};
        case PAGE_SAVE_SUCCESS:
            return{loading:false, success:true, pages: action.payload};
        case PAGE_SAVE_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

function pageUpdateReducer(state ={pages: {}}, action) {


    switch (action.type) {
        case PAGE_UPDATE_REQUEST:
            return{loading: true};
        case PAGE_UPDATE_SUCCESS:
            return{loading:false, success:true, pages: action.payload};
        case PAGE_UPDATE_FAIL:
            return{loading:false, error: action.payload};
        default:
            return state;
    }
}

export { pageSaveReducer, pageListReducer, pageUpdateReducer }