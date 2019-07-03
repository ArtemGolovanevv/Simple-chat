import {combineReducers} from 'redux'
import ChatReducer from './ChatReducer'
import HomeReducer from './HomeReducer'
import LoginReducer from './LoginReducer'


export default combineReducers({
    login: LoginReducer,
    home: HomeReducer,
    chat: ChatReducer,
})
