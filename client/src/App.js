import React, { Fragment, useEffect } from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

// Layout File
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/alert'

// Screen Component
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/Profile-forms/CreateProfile';
import PrivateRouter from './components/routing/PrivateRouter';
import EditProfile from './components/Profile-forms/EditProfile';
import AddExperience from './components/Profile-forms/AddExperience';
import AddEducation from './components/Profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

// Utils
import { loadUser } from './action/auth'

// Redux
import { Provider } from 'react-redux';
import store from './store';



const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  
  return (<Provider store={store}> 
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component = {Register}/>
            <Route exact path="/login" component = {Login}/>
            <Route exact path="/profiles" component = {Profiles}/>
            <Route exact path="/profile/:id" component = {Profile}/>
            <PrivateRouter exact path="/dashboard" component = {Dashboard} />
            <PrivateRouter exact path="/create-profile" component = {CreateProfile} />
            <PrivateRouter exact path="/edit-profile" component = {EditProfile} />
            <PrivateRouter exact path="/add-experience" component = {AddExperience} />
            <PrivateRouter exact path="/add-education" component = {AddEducation} />
            <PrivateRouter exact path="/posts" component = {Posts} />
            <PrivateRouter exact path="/post/:id" component = {Post} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>)
}
export default App;
