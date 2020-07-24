import {FETCH_RECIPE_POST} from '../actions/types'

const intitialState={
    item:{}
}


export default function (state=intitialState, action){
    switch(action.type){
        case FETCH_RECIPE_POST:
            return{
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}