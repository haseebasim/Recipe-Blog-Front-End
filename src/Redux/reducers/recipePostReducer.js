import {FETCH_RECIPE_POST} from '../actions/types'

const intitialState = {
  item: {},
  loading: true,
};


export default function (state=intitialState, action){
    switch(action.type){
        case FETCH_RECIPE_POST:
            return {
              ...state,
              item: action.payload,
              loading: action.loading,
            };
        default:
            return state;
    }
}