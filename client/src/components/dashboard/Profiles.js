import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import { Spinner } from '../Spinner'
import { Fragment } from 'react'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: {profiles, loading}}) => {
    useEffect(()=>{
        getProfiles();
    }, []);
    return (
        <div className="profile-container">
            { loading ? <Spinner/> : <Fragment>
                <h3 className="profile-primary"> Security Specialists</h3>
                <p className="profile-secondary">
                    Connect with Security Specialists on the website here
                </p>
                <div className="profiles">
                    {
                        profiles.length > 0 ? (
                            profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        )) ) : <h4> No profiles yet ..</h4> } 
                </div>
            </Fragment>}
        </div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles);
