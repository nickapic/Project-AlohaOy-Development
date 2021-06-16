import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../actions/job'

const CommentForm = ({ jobId, addComment}) => {
    const [text, setText] = useState('');
    return (
        <div className="comment-field">
        <form className="job-post-form" onSubmit={e => {
                e.preventDefault();
                addComment(jobId,{text});
                setText("");
            }}>
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Add a Comment"
                value={text}
                required
                onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="job-button-form" value="Submit"/>
            </form>
        </div>
    )
}

CommentForm.propTypes = {

}

export default connect(null,{addComment })(CommentForm);
