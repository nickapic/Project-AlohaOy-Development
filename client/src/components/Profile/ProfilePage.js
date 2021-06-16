import React from 'react'
import PropTypes from 'prop-types'
import profile from '../../reducers/profile'
import "./profilepage.css"

const ProfilePage = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: {name, avatar}
    }
}) => {
    return (
        <div className="profile-page-wrapper">
            <div className="profilepage-image-container">
                <img src={avatar} alt="" className="profile-image"/>
                <div className="text-box-profilepage">
                    <h2 className="profile-page-information">{name}</h2>
                    <p className="profile-page-information">{status} {company && <span> at {company}</span>}</p>
                    <p className="profile-page-information">{ location && <span>{location}</span>}</p>
                </div>
            </div>
            <div className="profile-page">
                <div className="profile-description">
                    <p className="profile-description-text">
                        Website : {website}
                    </p>
                </div>
            </div>
        </div>
    )
}

ProfilePage.propTypes = {

}

export default ProfilePage
