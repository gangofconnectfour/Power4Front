

export const initialState = {
    board:[],
    user:{
        email: '',
        nickname: '',
        password: ''
    },
    auth:{
        token: '1'
    }
}

const PROTOCOL = "http"
const PORT = 8090
const DOMAIN = "localhost"
const ROOT_PATH = "/api/"
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`