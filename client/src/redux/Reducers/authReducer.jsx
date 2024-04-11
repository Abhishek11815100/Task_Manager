import { Types } from "../Actions/ActionTypes";

const initialState ={
    loading: false,
    user: {},
    isLoggedIn: false,
    token: '',
    successMsg: '',
    errorMsg: ''
}

const authReducer = (state= initialState, action) =>{
    switch (action.type) {
        case Types.LOGIN_REQUEST:
            return {loading:true, user: {}, isLoggedIn:false, token: '', successMsg:'', errorMsg:''}
        case Types.LOGIN_SUCCESS:
            return {loading:false, user: action.payload.user, isLoggedIn:true, token: action.payload.token, successMsg:action.payload.message, errorMsg:''}
        case Types.LOGIN_FAILURE:
            return {loading:false, user: {}, isLoggedIn:false, token: '', successMsg:'', errorMsg:action.payload.message}
        case Types.LOGOUT:
            return {loading:false, user: {}, isLoggedIn:false, token: '', successMsg:'', errorMsg:''}
        case Types.SAVE_PROFILE:
            return {loading:false, user: action.payload.user, isLoggedIn:true, token: action.payload.token, successMsg:'', errorMsg:''}
        default: 
            return state
    }
}

export default authReducer;