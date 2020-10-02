import React, { Fragment, useEffect } from 'react'
import ProtoTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfileById } from '../../action/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({getProfileById, profile: {profile, loading}, auth , match}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match])
    return (<Fragment>
        {profile == null || loading 
        ? <Spinner />
        : <Fragment>
            <Link to='/profiles' className='btn btn-light'>
                Back To Profiles
            </Link>
             
            {   auth.isAuthenticated 
                && auth.loading === false
                && auth.user._id === profile.user._id 
                && <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link> }
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />

                {/* Experience */}
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {
                        profile.experience.length > 0 
                        ? (profile.experience.map((item) => (
                            <ProfileExperience key={item._id} experience={item} />
                        )))
                        : (<h4> No Experience Credentials</h4>)
                    }
                </div>
                {/* Education */}
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {
                        profile.education.length > 0 
                        ? (profile.education.map((item) => (
                            <ProfileEducation key={item._id} education={item} />
                        )))
                        : (<h4> No Education Credentials</h4>)
                    }
                </div>
                {profile.github && (
                    <ProfileGithub username={profile.github} />
                )}
            </div>
        </Fragment>
     }
    </Fragment>)
}

Profile.propTypes = {
    getProfileById: ProtoTypes.func.isRequired,
    profile: ProtoTypes.object.isRequired,
    auth: ProtoTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, {getProfileById})(Profile)
