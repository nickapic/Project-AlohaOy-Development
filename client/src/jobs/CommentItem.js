import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {Moment} from 'react-moment'

const CommentItem = ({ jobId, comment: { _id, text, name, avatar, user, date}}, auth) => {
    return (
        <div className="comments-item">
            <div className="comments-profile">
                <Link to={`/profile/${user}`}>
                    <h4>{name}</h4>
                </Link>
            </div>
            <p className="comments-text">
                 {text}
            </p>
             <p className="comments-text">
                Posted on {<Moment format="YYYY/MM/DD">{date}</Moment> }
            </p>
        </div>
    )
}

CommentItem.propTypes = {
    jobId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { })(CommentItem)
