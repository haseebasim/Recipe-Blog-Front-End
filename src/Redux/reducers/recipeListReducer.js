import {FETCH_RECIPELIST,FETCH_SAVED_RECIPELIST,FETCH_CAT_RECIPELIST} from '../actions/types'

const initialState={
    items:[],
    savedItems:[],
    loading : true
}

export default function(state=initialState, action){
    switch (action.type) {
      case FETCH_RECIPELIST:
        return {
          ...state,
          items: action.payload,
          loading: action.loading,
        };
      case FETCH_SAVED_RECIPELIST:
        return {
          ...state,
          savedItems: action.payload,
          loading: action.loading,
        };
      case FETCH_CAT_RECIPELIST:
        return{
          ...state,
          items: action.payload,
          loading : action.loading
        }
      default:
        return state;
    }
}