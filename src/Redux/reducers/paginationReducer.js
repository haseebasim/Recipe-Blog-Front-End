import {FETCH_POSTCOUNT} from '../actions/types'

const initialState = {
    count : 0
}

export default function (state = initialState, action ){
    switch (action.type){
        case FETCH_POSTCOUNT:
            return{
                ...state,
                count: action.payload
            }
        default: 
            return state
    }
}