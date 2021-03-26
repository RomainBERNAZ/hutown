import axios from 'axios';
import { HISTOIRE_SAVE_REQUEST, HISTOIRE_SAVE_SUCCESS, HISTOIRE_SAVE_FAIL, HISTOIRE_LIST_REQUEST ,
HISTOIRE_LIST_SUCCESS , HISTOIRE_LIST_FAIL, HISTOIRE_UPDATE_REQUEST, HISTOIRE_UPDATE_SUCCESS, HISTOIRE_UPDATE_FAIL ,
} from '../constants/histoireConstants'


const listHistoire = () => async (dispatch) => {
    try {

        dispatch({type: HISTOIRE_LIST_REQUEST})
        const { data } = await axios.get("/api/histoires")
        dispatch({type: HISTOIRE_LIST_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: HISTOIRE_LIST_FAIL, payload :error.message})
    }
}

const updateHistoire = (histoire) => async (dispatch, getState) => {
    try {
        dispatch({type: HISTOIRE_UPDATE_REQUEST, payload: histoire})
        const { userLogin:{userInfo}} = getState();
        const { data } = await axios.put("/api/histoires", {
            headers: {
                'Authorization':'Bearer' +userInfo.token,
            }
        });
        dispatch({type: HISTOIRE_UPDATE_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: HISTOIRE_UPDATE_FAIL, payload :error.message})
    }
}


const saveHistoire = (histoire) => async (dispatch, getState) => {
    try {

        dispatch({type: HISTOIRE_SAVE_REQUEST, payload: histoire})
        const { userLogin:{userInfo}} = getState();
        const { data } = await axios.post("/api/histoires", histoire, {
            headers: {
                'Authorization':'Bearer' +userInfo.token,
            }
        });
        dispatch({type: HISTOIRE_SAVE_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: HISTOIRE_SAVE_FAIL, payload :error.message})
    }
}

export {saveHistoire, listHistoire, updateHistoire};