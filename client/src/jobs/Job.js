import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../components/Spinner'
import {Moment } from 'react-moment'
import { getJob } from '../actions/job'
import JobItem from './JobItem'
import './job.css'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Job = ({ getJob, job: { job , loading} , match}) => {
    useEffect(() => {
        console.log(match.params.id)
        getJob(match.params.id);
        console.log(job)
    }, [getJob])

    
    return (
        <div className="job-page">

    { job === null || loading ? <Spinner/> : (
    <Fragment>
        <JobItem key={job._id} job={job} />
        <CommentForm jobId={job._id}  />
        <h3 className="job-heading">Comments</h3>
        <p> Still Under Contruction. </p>
    </Fragment>)
    }
    </div>
    )
}

Job.propTypes = {
    getJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    job: state.job,
})

export default connect(mapStateToProps,{getJob})(Job)
