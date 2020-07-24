import { FETCH_HOME_POSTS } from "./types";
import axios from '../../utils/Axios'
export const fetchHomePosts = () => (dispatch) => {
  axios
    .get(`/posts/${3}/${0}`)
    .then((res) =>
      dispatch({
        type: FETCH_HOME_POSTS,
        payload: res.data,
        loading: false
      })
    )
    .catch((error) => console.log(error));
};
