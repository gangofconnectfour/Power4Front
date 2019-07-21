import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_SIGN_IN = "REQUEST_SIGN_IN"
export const RECEIVE_SIGN_IN = "RECEIVE_SIGN_IN"
export const REQUEST_SIGN_UP = "REQUEST_SIGN_UP"
export const RECEIVE_SIGN_UP = "RECEIVE_SIGN_UP"
export const REQUEST_SIGN_OUT = "REQUEST_SIGN_OUT"
export const RECEIVE_SIGN_OUT = "RECEIVE_SIGN_OUT"
export const REQUEST_UPDATE_PROFILE = "REQUEST_UPDATE_PROFILE"
export const RECEIVE_UPDATE_PROFILE = "RECEIVE_UPDATE_PROFILE"


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
        .then(response => {
            if(response.ok)
                return response.json()
            throw response.text()
        })
        .then(
            json => dispatch(receive_sign_in(json))
        )
        .catch(
            error => console.error("failed signin",error)
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
                "Authorization":"Bearer " + token
            }
        })
            .then(response => {
                if(response.ok)
                    return response.json()
                throw response.text()
            })
            .then(
                json => dispatch(receive_sign_out(json))
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
            .then(response => {
                if(response.ok)
                    return response.json()
                throw response.text()
            })
            .then(
                json => dispatch(receive_sign_up(json)),
            )
            .catch(error=> console.error(error)
            )
    }
}



function receive_update_profile(){
    return {
        type: RECEIVE_UPDATE_PROFILE
    }
}

function request_update_profile(){
    return {
        type: REQUEST_UPDATE_PROFILE
    }
}


export function update_profile(payload, id, token){
    return dispatch => {
        dispatch(request_update_profile(token))
        return fetch(`${API_ROOT}users/${id}`,{
            method:"PUT",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "Authorization":"Bearer " + token
            },
            body: payload
        })
            .then(
                response => {
                    if(response.ok) dispatch(receive_update_profile())
                }
            )
            .catch(error=> console.error(error)
            )
    }
}


