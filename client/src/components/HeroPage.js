import React from 'react'
import './heropage.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HeroPage = ({ isAuthenticated }) => {
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <div className="hero-page">
            <div className="right-side">
                <h3 className="right-heading">Free Lancing Cyber Security Simplified.</h3>
                <h3 className="right-subheading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum lorem vitae lorem lacinia, bibendum molestie neque scelerisque. Curabitur pulvinar dolor enim. Aliquam id odio et est ornare euismod. Aliquam hendrerit massa vel erat tempor, nec dictum leo vulputate. Mauris ultrices tellus ac augue elementum euismod. Aenean vestibulum nisi dui.</h3>
                <Link to="/login" className="right-button">Get started</Link>
            </div>
            <div className="left-side">
            
            </div>
        </div>
    )
};

HeroPage.propTypes = {
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(HeroPage);