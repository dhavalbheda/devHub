import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../action/auth';
import PropTypes from 'prop-types'


const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const {email, password} = formData;
    
    // On submit Event
    const onSubmit = async e => {
        e.preventDefault();
        login({email, password})
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i>Login Into Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address" 
                    name="email" 
                    value={email} 
                    onChange={e => onChange(e)} />
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
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign In</Link>
        </p>
    </Fragment>
}
Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login)