import {
    GET_JOBS,
    JOB_ERROR,
    UPDATE_LIKES,
    DELETE_JOB,
    ADD_JOB,
    GET_JOB,
    REMOVE_COMMENT,
    ADD_COMMENT
} from '../actions/types';

const initialState = {
    jobs: [], 
    job: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: payload,
                loading: false
            };
        case GET_JOB:
            return{
                ...state,
                job: payload,
                loading: false
            }
        case DELETE_JOB: 
            return{
                ...state,
                jobs: state.jobs.filter(job => job._id !== payload),
                loading: false
            };
        case ADD_JOB:
            return{
                ...state,
                jobs : [ ...state.jobs, payload],
                loading: false
            }
        case JOB_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return{
                ...state,
                jobs: state.jobs.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post)  
            };
        case ADD_COMMENT:{
                return{
                    ...state,
                    job: {...state.job, comments: payload},
                    loading: false
                }
            };
        case REMOVE_COMMENT:
            return{
                ...state,
                comments: state.post.comments.filter(comment => comment._id !== payload),
                loading: false
            };
        default: 
            return state;
    }
}