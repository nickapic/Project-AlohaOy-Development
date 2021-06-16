import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getJobs } from '../actions/job'
import { Spinner } from '../components/Spinner'
import JobItem from './JobItem'

const Jobs = ({ getJobs , job:{
    jobs, loading
} }) => {
    useEffect(() => {
        getJobs();
    }, []);
    return loading ? <Spinner/> : (
        <div className="jobs-container">
           <h3 className="jobs-heading">Here are the Job Results</h3>
           <div className="jobs-list-container">
               {jobs.map( job => (
                   <JobItem key={job._id} job={job}/>
               ))}
           </div>
        </div>
    )
}

Jobs.propTypes = {

}

const mapStateToProps = state => ({
    job: state.job
})

export default  connect(mapStateToProps, {getJobs})(Jobs);
