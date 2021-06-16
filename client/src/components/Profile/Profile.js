import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Spinner } from '../Spinner'
import ProfilePage from './ProfilePage';
import "./profilepage.css"
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
const Profile = ({ getProfileById , profile: {profile, loading}, auth, match }) => {
    useEffect(() => {
        console.log(match.params.id)
        getProfileById(match.params.id);
    }, [])
    return (
        <div>
            { profile === null || loading ? <Spinner/> : (
            <div className="profile-page-container"> 
                <ProfilePage profile={profile}/>
                <h3>Experience</h3>
                { profile.experience.length > 0 ? (
                    profile.experience.map(experience => (
                        <ProfileExperience key={experience._id} experience={experience}/>
                    ))
                ) : 
                (
                    <h4>No experience was added</h4> 
                )}

                <h3>Education</h3>
                {
                    profile.education.length > 0 ? (
                    profile.education.map(education => (
                        <ProfileEducation key={education._id} education={education}/>
                    ))) : (
                        <h4>No Education was added</h4>
                    ) 
                }
                <Link to="/profiles" className="main-button">Go Back</Link> 
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/profile' className="main-button">Edit Profile</Link>)}
            </div> ) }
        </div> 
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile)
