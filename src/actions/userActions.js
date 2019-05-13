import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_SIGN_IN = "REQUEST_SIGN_IN"
export const RECEIVE_SIGN_IN = "RECEIVE_SIGN_IN"
export const REQUEST_SIGN_UP = "REQUEST_SIGN_UP"
export const RECEIVE_SIGN_UP = "RECEIVE_SIGN_UP"
export const REQUEST_SIGN_OUT = "REQUEST_SIGN_OUT"
export const RECEIVE_SIGN_OUT = "RECEIVE_SIGN_OUT"


function request_sign_in(payload){
    return {
        type: REQUEST_SIGN_IN,
        payload: payload
    }
}

function receive_sign_in(payload){
    return {
        type: RECEIVE_SIGN_IN,
        payload: payload
    }
}
export function sign_in(payload){
    return dispatch => {
        dispatch(request_sign_in(payload))
        return fetch(`${API_ROOT}auth/sign_in`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",

            } ,
            body:payload
        })
        .then(
            response => response.json(),
            error => console.error("failed signin",error)
        )
        .then(json=> {
            return (!json.error) ? dispatch(receive_sign_in(json)) : null
            }
        )
    }
}

function request_sign_out(){
    return {
        type: REQUEST_SIGN_OUT
    }
}

function receive_sign_out(){
    return {
        type: RECEIVE_SIGN_OUT
    }
}


export function sign_out(token){
    return dispatch => {
        dispatch(request_sign_out(token))
        return fetch(`${API_ROOT}auth/sign_out`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            }
        })
            .then(
                response => dispatch(receive_sign_out(response.json()))
            )
            .catch(error=> console.error(error)
            )
    }
}

function request_sign_up(payload){
    return {
        type: REQUEST_SIGN_UP,
        payload: payload
    }
}
function receive_sign_up(payload){
    return {
        type: RECEIVE_SIGN_UP,
        payload: payload
    }
}

export function sign_up(payload){
    console.log(payload);
    return dispatch => {
        // dispatch(request_sign_up(payload))
        return fetch(`${API_ROOT}auth/sign_up`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",

            } ,
            body:payload
        })
            .then(
                response => dispatch(receive_sign_up(response.json())),
            )
            .catch(error=> console.error(error)
            )
    }
}
