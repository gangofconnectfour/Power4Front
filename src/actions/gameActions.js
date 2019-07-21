import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_PLAY_CELL = "REQUEST_PLAY_CELL"
export const RECEIVE_PLAY_CELL = "RECEIVE_PLAY_CELL"

function request_play_cell(payload){
    return {
        type: REQUEST_PLAY_CELL,
        payload: payload
    }
}

function receive_play_cell(payload){
    return {
        type: RECEIVE_PLAY_CELL,
        payload: payload
    }
}

export function play_cell(payload, token){
    return dispatch => {
        dispatch(request_play_cell(token))
        console.log("token",token);
        return fetch(`${API_ROOT}game/`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Accept": 'application/json',
                "Content-Type":"application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(
                response => {
                    if(response.ok)
                        return response.json()
                }
            )
            .then(json => dispatch(receive_play_cell(json)))
            .catch(error=> console.error(error)
            )
    }
}