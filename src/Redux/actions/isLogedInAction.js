import {ISLOGGEDIN} from './types'

export const setIsLogedIN = (bol)=>(dispatch)=>{
    dispatch({
        type: ISLOGGEDIN,
        payload: bol
    })
}