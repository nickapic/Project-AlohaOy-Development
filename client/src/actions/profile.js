import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT } from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        })
    }
}


export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        console.error(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        })
    }
}

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);

         dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' :  'Profile Created'));

        if (!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))
        }    
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        })
    }
};

export const addExperience = (formData, history) => async dispatch =>{ 
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);

         dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Exprience Added", "success"));
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))
        }    
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText , status: err.response.status }
        })
    }
}
export const addEducation = (formData, history) => async dispatch =>{ 
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);

         dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education Added", "success"));
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))
        }    
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteExperience = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Experience Removed", "success"));

    } catch(err){
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })       
    }
}
export const deleteEducation = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Removed", "success"));

    } catch(err){
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })       
    }
}

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This is can NOT be undone!')) {
        try{
                const res = await axios.delete(`/api/profile`)
                dispatch({
                    type: DELETE_ACCOUNT })

                dispatch(setAlert("Your account has been permanently deleted", "success"));

            } catch(err){
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                })       
            }
    }
    
}