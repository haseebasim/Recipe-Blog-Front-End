import {FETCH_POSTCOUNT} from './types'
import axios from '../../utils/Axios'
export const fetchPostCount = ()=>(dispatch)=>{
     axios
       .get("/posts_count")
       .then((res) => dispatch({
           type: FETCH_POSTCOUNT,
           payload: res.data.count
       }))
       .catch((err) => console.log(err));
}