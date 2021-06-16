import React from 'react'
import { Link } from 'react-router-dom'

const Actions = () => {
    return (
        <div className="dash-links">
            <Link to="/profile" className="profile-link"> Edit your profile</Link>
            <Link to="/addexperience" className="profile-link">Add Experience</Link>
            <Link to="/addeducation" className="profile-link">Add Education</Link>
        </div>
    )
}

export default Actions
