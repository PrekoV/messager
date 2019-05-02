import { combineReducers } from 'redux'
import { authReducer } from './authReducers'
import { messagerReducer } from './messagerReducer'

export default combineReducers({
    authReducer,
    messagerReducer
})