import {ISLOGGEDIN} from '../actions/types'

const initialState={
    isLogedIn : false
}

export default function (state=initialState, action){
    switch(action.type){
        case ISLOGGEDIN:
            return {
                ...state,
                isLogedIn: action.payload
            }
        default:
            return state
    }
}