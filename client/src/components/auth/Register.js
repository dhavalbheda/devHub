import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../action/alert';
import { signup } from '../../action/auth';
import PropTypes from 'prop-types'

const Register = ({ setAlert, signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const {name, email, password, password2} = formData;

    // On Submit Event
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Password Not Matched', 'danger')
        } else {
            signup({name, email, password, password2});
        }
    }
    
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                     />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)} />
                <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={password2}
                    onChange={e => onChange(e)}
                    required />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
    </Fragment>
}
Register.prototype = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{ setAlert, signup })(Register)