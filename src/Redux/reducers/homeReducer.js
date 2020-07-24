import {FETCH_HOME_POSTS} from '../actions/types'

const initialState = {
    items: [],
    loading: true
}

export default function (state = initialState , action){
    switch (action.type){
        case FETCH_HOME_POSTS:
            return {
                ...state,
                items: action.payload,
                loading: action.loading
            }
        default:
            return state;
    }
}