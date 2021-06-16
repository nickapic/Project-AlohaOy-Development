import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


const ProfileEducation = ({ education: {
    school,
    degree,
    fieldofstudy,
    current,
    to,
    from,
    description
}}) => {
    return (
        <div className="experience-section">
            <h3 className="experience-heading">{school}</h3>
            <p className="experience-text">
                <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p className="experience-text">
                <strong>Degree:</strong> { degree }
            </p>
            <p className="experience-text">
                <strong>Field Of Study:</strong> { fieldofstudy }
            </p>
            <p className="experience-text">
                <strong>Description:</strong> { description }
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation
