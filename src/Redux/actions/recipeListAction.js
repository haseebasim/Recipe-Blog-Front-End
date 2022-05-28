import { FETCH_RECIPELIST, FETCH_SAVED_RECIPELIST, FETCH_CAT_RECIPELIST, SET_NULL_LIST } from '../actions/types'
import axios from '../../utils/Axios'

export const setNULL = () => (dispatch) => {
    dispatch({
        type: SET_NULL_LIST,
        payload: [],
        loading: true
    })
}


export const fetchRECIPELIST = (limit, skip) => (dispatch) => {
    axios
        .get(`/posts/${limit}/${skip}`)
        .then((res) => dispatch({
            type: FETCH_RECIPELIST,
            payload: res.data,
            loading: false
        }))
        .catch((err) => {
            dispatch({
                type: FETCH_RECIPELIST,
                payload: [],
                loading: false
            });
            console.log(err);
        });
}


export const fetchCatRecipeList = (limit, skip, cat) => (dispatch) => {
    axios
        .get(`/cat_posts/${limit}/${skip}/${cat}`)
        .then((res) =>
            dispatch({
                type: FETCH_CAT_RECIPELIST,
                payload: res.data,
                loading: false,
            })
        )
        .catch((err) => {
            console.log(err);
        });
}

export const fetchSavedRecipeList = (limit, skip) => (dispatch) => {
    axios
        .get(`/saved_posts/${limit}/${skip}`, {
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
        })
        .then((res) =>
            dispatch({
                type: FETCH_SAVED_RECIPELIST,
                payload: res.data,
                loading: false,
            })
        )
        .catch((err) => {
            console.log(err);
        });
}