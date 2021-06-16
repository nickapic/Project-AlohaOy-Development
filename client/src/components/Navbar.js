import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, logout } from '../actions/auth';
import { Fragment } from 'react';

const Navbar = ({ auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
            <ul className="nav-links">
                <li className="list-items"><Link to="/jobs">Jobs</Link></li>
                <li className="list-items"><a href="https://nickapic.github.io/" target="_blank">Resources</a></li>
                <li className="list-items"><Link to="/profiles">Profiles</Link></li>
                <li className="list-items"><a onClick={logout}>Logout</a></li>
            </ul>
    );
    const guestLinks = (
            <ul className="nav-links">
                <li className="list-items"><Link to="/login">Login</Link></li>
                <li className="list-items"><Link to="/register">Register</Link></li>
                <li className="list-items"><Link to="/profiles">Profiles</Link></li>
                <li className="list-items"><a href="https://nickapic.github.io/" target="_blank">Resources</a></li>
            </ul>   
    )
    return (
        <div className="navbar">
            <h3 className="nav-heading-wrapper">
            <a href="/" className="nav-heading">Project Aloha Oy</a>
            </h3>
            { !loading && (<Fragment>
               { isAuthenticated ? authLinks : guestLinks }
            </Fragment>) }
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, {logout})(Navbar);