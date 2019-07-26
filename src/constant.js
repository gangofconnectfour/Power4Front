

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
const PORT = 80
const DOMAIN = "51.159.26.254"
const ROOT_PATH = "/api/"
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`