import {FETCH_RECIPELIST,FETCH_SAVED_RECIPELIST,FETCH_CAT_RECIPELIST} from '../actions/types'

const initialState={
    items:[],
    savedItems:[]
}

export default function(state=initialState, action){
    switch (action.type) {
      case FETCH_RECIPELIST:
        return {
          ...state,
          items: action.payload,
        };
      case FETCH_SAVED_RECIPELIST:
        return {
          ...state,
          savedItems: action.payload,
        };
      case FETCH_CAT_RECIPELIST:
        return{
          ...state,
          items: action.payload
        }
      default:
        return state;
    }
}