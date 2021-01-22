import axios from 'axios';
import { PHOTOGRAPH_LIST_REQUEST, PHOTOGRAPH_LIST_SUCCESS, PHOTOGRAPH_LIST_FAIL} from '../constants/photographConstants'


const listPhotographs = () => async (dispatch) => {
    try {

        dispatch({type: PHOTOGRAPH_LIST_REQUEST})
        const { data } = await axios.get("/api/photographs")
        dispatch({type: PHOTOGRAPH_LIST_SUCCESS, payload :data})
        
    } catch (error) {
        dispatch({type: PHOTOGRAPH_LIST_FAIL, payload :error.message})
    }
}
export { listPhotographs};