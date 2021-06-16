import React from 'react'
import PropTypes from 'prop-types';
import Moment from "react-moment";
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    const educations = education.map( edu => (
        <div className="table-section">

        <td key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to == null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
        </td>
        <td>
            <button
            onClick={() => deleteEducation(edu._id)}
            className="table-button"
            >
            Delete
            </button>
        </td>
        </td>
                </div>

    ));
    return (
        <div className="education-container">
            <h2 className="profile-primary">My Education</h2>
            <table className="table">
                <thead>
                <tr className="table-section">
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody className="table-special">{educations}</tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)
