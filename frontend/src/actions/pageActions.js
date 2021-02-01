import axios from 'axios';
import { PAGE_SAVE_REQUEST, PAGE_SAVE_SUCCESS, PAGE_SAVE_FAIL, 
         PAGE_LIST_REQUEST, PAGE_LIST_SUCCESS, PAGE_LIST_FAIL, 
         PAGE_UPDATE_REQUEST, PAGE_UPDATE_SUCCESS, PAGE_UPDATE_FAIL} from '../constants/pageConstants'


const listPages = () => async (dispatch) => {
    try {

        dispatch({type: PAGE_LIST_REQUEST})
        const { data } = await axios.get("/api/pages")
        dispatch({type: PAGE_LIST_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: PAGE_LIST_FAIL, payload :error.message})
    }
}

const updatePage = (page) => async (dispatch, getState) => {
    console.log(page);
    try {
        dispatch({type: PAGE_UPDATE_REQUEST, payload: page})
        const { userLogin:{userInfo}} = getState();
        const { data } = await axios.put("/api/pages/" +page._id, page, {
            headers: {
                'Authorization':'Bearer' +userInfo.token,
            }
        });
        dispatch({type: PAGE_UPDATE_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: PAGE_UPDATE_FAIL, payload :error.message})
    }
}


const savePage = (page) => async (dispatch, getState) => {
    try {

        dispatch({type: PAGE_SAVE_REQUEST, payload: page})
        const { userLogin:{userInfo}} = getState();
        const { data } = await axios.post("/api/pages", page, {
            headers: {
                'Authorization':'Bearer' +userInfo.token,
            }
        });
        dispatch({type: PAGE_SAVE_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: PAGE_SAVE_FAIL, payload :error.message})
    }
}

export {savePage, listPages, updatePage};