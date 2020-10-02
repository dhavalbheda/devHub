import React, { Fragment } from 'react'
import ProtoTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../action/profile'
import { connect } from 'react-redux'

const Education = ({education, deleteEducation}) => {
    const educations = education.map(item => (
        <tr key={item._id}>
            <td>{item.school}</td>
            <td className="hide-sm">{item.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{item.form}</Moment> - 
                {item.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}
            </td>
            <td><button className="btn btn-danger" onClick={() => deleteEducation(item._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}
Education.prototype = {
    educations: ProtoTypes.object.isRequired,
    deleteEducation: ProtoTypes.object.isRequired
}
export default connect(null, {deleteEducation})(Education)