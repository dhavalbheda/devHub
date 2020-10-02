import Axios from 'axios'
import {setAlert} from './alert'
import { DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from './type'
import {server} from '../config.json';

// Get Posts
export const getPosts = () => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.get(`${server}/api/posts`, header);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}
// Get Post
export const getPost = id => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.get(`${server}/api/posts/${id}`, header);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}


// Add Like
export const addLike = postId => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.put(`${server}/api/posts/like/${postId}`,null, header);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}


// Remove Like
export const removeLike = postId => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.put(`${server}/api/posts/unlike/${postId}`, null, header);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}

// Delete Post
export const deletePost = postId => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        await Axios.delete(`${server}/api/posts/${postId}`,  header);
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Post Deleted', 'success'))

    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}

// Add Post
export const addPost = formData => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.post(`${server}/api/posts`, formData,  header);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Create', 'success'))

    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        const res = await Axios.put(`${server}/api/posts/comment/${postId}`, formData,  header);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const header = {
            headers: {
                'x-auth-token': localStorage.token,
            },
        }
        await Axios.delete(`${server}/api/posts/comment/${postId}/${commentId}`, header);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed.', 'success'))
    } catch(error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.data.msg, status: error.response.status}
        })
    }
}