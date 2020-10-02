import React, { Fragment, useEffect } from 'react'
import Prototypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteAccount, getCurrentProfile} from '../../action/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashBoardActions from './DashboardActions'
import Experience from '../Profile-forms/Experience'
import Education from '../Profile-forms/Education'

const Dashboard = ({getCurrentProfile , deleteAccount, auth: { user }, profile: {profile, loading}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    return ( loading && profile == null 
            ? <Spinner/>
            :<Fragment>
               <h1 className="large text-primary">Dashboard</h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                {profile !== null 
                    ? <Fragment>
                        <DashBoardActions/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>

                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"></i>
                                {' '}Delete Account
                            </button>
                        </div>
                        </Fragment>
                    : <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to ="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>}
            </Fragment>) 
}

Dashboard.prototype = {
    getCurrentProfile: Prototypes.func.isRequired,
    deleteAccount: Prototypes.func.isRequired,
    auth: Prototypes.object.isRequired,
    profile: Prototypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)