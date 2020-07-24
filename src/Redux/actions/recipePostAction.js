import {FETCH_RECIPE_POST} from './types'
import axios from '../../utils/Axios'

export const fetchRecipePost = (id)=> (dispatch) =>{
    axios.get(`/post/${id}`)
    .then((res) => dispatch({
        type: FETCH_RECIPE_POST,
        payload: res.data,
        loading: false
    }))
    .catch(error => console.log(error));
}