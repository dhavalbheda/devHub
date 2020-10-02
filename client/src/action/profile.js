import Axios from 'axios';
import {setAlert} from './alert'
import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, GET_REPOS } from './type';
import {server} from '../config.json';

// Get Current User Profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const res = await Axios.get(`${server}/api/profile/me`, header);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }
}

// Get All User Profile
export const getProfiles = () => async dispatch => {
    dispatch(
        {
            type: CLEAR_PROFILE,
            payload: null
        }
    )
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const res = await Axios.get(`${server}/api/profile`, header);
        dispatch({
            type:GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }
}

// Get User Profile By Id
export const getProfileById = (id) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const res = await Axios.get(`${server}/api/profile/user/${id}`, header);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }
}


// Get Github Repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const res = await Axios.get(`${server}/api/profile/github/${username}`, header);
        dispatch({
            type:GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }
}


// Create or Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        const res = await Axios.post(`${server}/api/profile`, formData, header);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit?'Profile Updated': 'Profile Created', 'success'))
        if(!edit) 
            history.push('/dashboard')
    } catch (error) {
        const errors = error.response ? error.response.data.errors: undefined;
        if(errors) {
            errors.forEach(item => dispatch(setAlert(item.msg, 'danger')));
        }
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        const res = await Axios.put(`${server}/api/profile/experience`, formData, header);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response ? error.response.data.errors: undefined;
        if(errors) {
            errors.forEach(item => dispatch(setAlert(item.msg, 'danger')));
        }
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }   
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        const res = await Axios.put(`${server}/api/profile/education`, formData, header);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))
        history.push('/dashboard')
    } catch (error) {

        const errors = error.response ? error.response.data.errors: undefined;
        if(errors) {
            errors.forEach(item => dispatch(setAlert(item.msg, 'danger')));
        }
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }   
}

// Delete Experience
export const deleteExperience = id => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        const res = await Axios.delete(`${server}/api/profile/experience/${id}`, header);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted...', 'success'))
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }   
}


// Delte Education
export const deleteEducation = id => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        const res = await Axios.delete(`${server}/api/profile/education/${id}`, header);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Deleted...', 'success'))
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }   
}

// Delete Account
export const deleteAccount = () => async dispatch => {
    if(!window.confirm('Are You Sure ?? '))
        return true
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-Type': 'application/json',
            },
        }
        await Axios.delete(`${server}/api/profile`, header);
        dispatch({
            type: CLEAR_PROFILE,
            payload: null
        })
        dispatch({
            type: DELETE_ACCOUNT,
            payload: null
        })
        dispatch(setAlert('Account Deleted...', 'success'))
    } catch (error) {
        const msg = error.response ? error.response.data.msg : 'Internet Required';
        const status = error.response ? error.response.status : 'Internet Required';
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg , status}
        })
    }   
}