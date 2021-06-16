import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './profileitem.css'
const ProfileItem = ({ profile: {
    user: { _id, name, avatar},
    status,
    company,
    location,
    skills
}}) => {
    return (
        <div className="profile-items">
            <img src={avatar} alt="" className="profile-image"/>
            <div className="profile-item">
                <h2 className="profile-information"> {name}</h2>
                <p className="profile-information">{status} {company && <span> at {company}</span>}</p>
                <p className="profile-information">{ location && <span>{location}</span>}</p>
            </div>
              
            <ul className="profile-skill-list">
                {skills.slice(0,4).map((skill, index) => (
                    <li key={index} className="profile-skills-item">
                        <span>{skill}</span>
                    </li>
                ))}
            </ul>
              <Link to={`/profile/${_id}`} className="profile-link">
                    View Profile
                </Link>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileItem
