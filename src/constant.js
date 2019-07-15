

export const initialState = {
    board:[],
    user:{
        email: '',
        nickname: '',
        password: ''
    },
    auth:{
        jwt: ''
    }
}

const PROTOCOL = "http"
const PORT = 3000
const DOMAIN = "localhost"
const ROOT_PATH = "/"
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`