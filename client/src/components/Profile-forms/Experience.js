import React, { Fragment } from 'react'
import ProtoTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../action/profile'
import { connect } from 'react-redux'

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(item => (
        <tr key={item._id}>
            <td>{item.company}</td>
            <td className="hide-sm">{item.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{item.form}</Moment> - 
                {item.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}
            </td>
            <td><button className="btn btn-danger" onClick={() => deleteExperience(item._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}
Experience.prototype = {
    experience: ProtoTypes.object.isRequired,
    deleteExperience: ProtoTypes.object.isRequired

}
export default connect(null, {deleteExperience})(Experience)