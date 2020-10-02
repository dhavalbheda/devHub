import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../action/profile'
import ProfileItem from './Profileitem'

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles() 
    }, [getProfiles]) 
    return <Fragment>
        {loading 
        ? <Spinner></Spinner>
        :<Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with Developers
            </p>
            <div className="profiles">
                {profiles.length > 0 
                ? (profiles.map(item => (<ProfileItem key={item._id} profile={item} />)))
                : <h4>No Profile Found</h4>}
            </div>
        </Fragment>}
    </Fragment>
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfiles})(Profiles)