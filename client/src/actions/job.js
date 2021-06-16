import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_JOBS,
    JOB_ERROR,
    UPDATE_LIKES,
    DELETE_JOB, 
    ADD_JOB,
    GET_JOB,
    ADD_COMMENT,
    REMOVE_COMMENT,
} from './types'

export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs')
        dispatch({
            type: GET_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.statis}
        })
    }
}

export const addLike = id => async dispatch => {
    try {
        console.log(id)
        const res = await axios.put(`/api/jobs/like/${id}`)
        console.log(res)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.statis}
        })
    }
}
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/jobs/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.statis}
        })
    }
}

export const deleteJob = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/jobs/${id}`)
        dispatch({
            type: DELETE_JOB,
            payload: id
        });
        dispatch(setAlert('Job has been removed', 'success'));
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.statis}
        })
    }
}

export const addJob = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res =  await axios.post(`/api/jobs`, formData, config)
        dispatch({
            type: ADD_JOB,
            payload: res.data
        });
        dispatch(setAlert('Job has been Created', 'success'));
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.statis}
        })
    }
}

export const getJob = id => async dispatch => {
    try {
        const res = await axios.get(`/api/jobs/${id}`)
        console.log(res.data)
        dispatch({
            type: GET_JOB,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response , status: err.response}
        })
    }
}

export const addComment = (jobId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res =  await axios.post(`/api/jobs/comment/${jobId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment has been Added', 'success'));
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status}
        })
    }
}


export const removeComment = (jobId,commentId) => async dispatch => {

    try {
        const res =  await axios.delete(`/api/jobs/comment/${jobId}/${commentId}`, )
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment has been deleted', 'success'));
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status}
        })
    }
}

