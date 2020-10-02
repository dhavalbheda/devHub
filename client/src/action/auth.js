import Axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from '../action/type'
import { setAlert } from './alert';
import {server} from '../config.json';

// Load User 
export const loadUser = () => async dispatch => {

    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const res = await Axios.get(`${server}/api/auth`, header);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: null
        })
    }
}

// Register User
export const signup = ({name, email, password}) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }
        const body = {name, email, password}
        const res = await Axios.post(`${server}/api/users`, body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch(error) {
        const errors = error.response ? error.response.data.errors: undefined;
        if(errors) {
            errors.forEach(item => dispatch(setAlert(item.msg, 'danger')));
        } 
        dispatch({
            type: REGISTER_FAIL,
            payload: null
        })
    }
}

// Login
export const login = ({email, password}) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }
        const body = {email, password}
        const res = await Axios.post(`${server}/api/auth`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Login Successfully', 'success'))
    } catch(error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        if(msg) {
            dispatch(setAlert(msg, 'danger'))
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: null
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE,
        payload: null
    })
    dispatch({
        type: LOGOUT,
        payload: null
    })
}