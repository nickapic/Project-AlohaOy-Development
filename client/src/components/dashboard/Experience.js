import React , { Fragment} from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect } from 'react-redux';
import { deleteExperience} from '../../actions/profile'

const Experience = ({ experience, deleteExperience}) => {
    
    const expereinces = experience.map(exp => (
        <Fragment>
        <div className="table-section">
            <td key={exp._id}></td>
            <td>{exp.company}</td>
            <td >{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to == null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className="table-button">Delete</button>
            </td>
        </div>
        </Fragment>
    ))
    return (
        <div className="experience-container">
            <h3 className="profile-primary">My Experiences</h3>
                <table className="table">
                    <thead>
                    <tr className="table-section">
                        <th>Company</th>
                        <th >Title</th>
                        <th >Years</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>{expereinces}</tbody>
                </table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience : PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
