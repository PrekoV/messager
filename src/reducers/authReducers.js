import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, REGISTER_SUCCESS, REGISTER_FAILED, RESET_PASSWORD, CONFIRM_PASSWORD} from '../constants'

const initailState = {
    userdata : {},
    err: "",
    isAuth: false
}

export const authReducer = (state = initailState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS : return {...state, isAuth:action.isAuth, userdata: action.payload, err: action.err}
        case LOGIN_FAILED : return {...state, isAuth:action.isAuth, err: action.err}
        case LOGOUT: return {...state, isAuth:action.isAuth, userdata: {}, err: action.err}
        case REGISTER_SUCCESS : console.log(action.payload); return {...state, isAuth:action.isAuth, userdata: action.payload, err: action.err}
        case REGISTER_FAILED : return {...state, isAuth:action.isAuth, err: action.err}
        case RESET_PASSWORD : return {...state, isAuth:action.isAuth, userdata: action.paylod, err: action.err}
        case CONFIRM_PASSWORD : return {...state, isAuth:action.isAuth, userdata: action.paylod}
        default: return {...state}
    }
}