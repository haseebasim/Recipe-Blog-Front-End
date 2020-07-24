import {FETCH_COMMENTS} from './types'
import axios from '../../utils/Axios'

export const fetchComments = (id) => (dispatch) => {
    axios.get(`/comments/${id}`)
    .then(res => dispatch({
        type: FETCH_COMMENTS,
        payload: res.data
    }))
    .catch(error => console.log(error));
}
