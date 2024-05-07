import axios from "axios";
import { Types } from "./ActionTypes";
import { toast } from "react-toastify";

export const postLoginData = (email,password) => async (dispatch) =>{
    try{
        dispatch({type: Types.LOGIN_REQUEST});
        const {data} = await axios.post('https://task-manager-aq2n.onrender.com/login',{email,password});
        dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('token', data.token);
        toast.success(data.message);
    }
    catch(error){
        const msg = error.response?.data?.msg || error.message;
        dispatch({
            type: Types.LOGIN_FAILURE,
            payload: msg
        })
    }
}

export const  SaveProfile = (token) => async (dispatch) =>{
    const {data} = await axios.get('', {
        headers: {Authorization: token}
    })
    dispatch({
        type: Types.SAVE_PROFILE,
        payload: {user: data.user, token}
    })
    localStorage.setItem('token', token);
    toast.success('Profile saved successfully');
}

export const Logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: Types.LOGOUT,
    })
}