import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { addLike, removeLike, deleteJob} from '../actions/job'
import './job.css'

const JobItem = ({
    addLike, removeLike, deleteJob, 
    auth, job : { _id, description,name,avatar, company, user, title,likes, comments,date} 
}) => {
    return (
        <div className="job-post">
            <div className="job-information">
                <h4 className="job-heading">{title}</h4>
                <h4 className="job-company">{company}</h4>
            </div>
            <p className="job-text">{description}</p>
            <p className="job-date">Posted on {<Moment format="YYYY/MM/DD">{date}</Moment> } </p>
            <div className="button-container">
                <button onClick={ e => addLike(_id)} type='button' className="job-button">
                    Like {" "} <span>{likes.length}</span>
                </button>
                <button onClick={ e => removeLike(_id)} type='button' className="job-button">
                    Unlike
                </button>
            </div>
            <div>
                <Link to={`/jobs/${_id}`} className="job-link">
                    More Details { comments.length > 0 && (
                        <span className="job-comment">{comments.length}</span>
                    )}
                </Link>
            {
                !auth.loading && user == auth.user._id && (
                    <button onClick={ e => deleteJob(_id) } type="button" className="job-button-danger">
                        Delete
                    </button>
                )
            }
            </div>

        </div>
    )
}

JobItem.propTypes = {
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps,{ addLike, removeLike, deleteJob})(JobItem);
