import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience: {
    company,
    title,
    location,
    current,
    to,
    from,
    description
}}) => {
    return (
        <div className="experience-section">
            <h3 className="experience-heading">{company}</h3>
            <p className="experience-text">
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p className="experience-text">
                <strong>Position:</strong> { title }
            </p>
            <p className="experience-text">
                <strong>Description:</strong> { description }
            </p>
        </div>
        
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
