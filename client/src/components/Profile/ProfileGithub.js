import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../action/profile'
import Spinner from '../layout/Spinner'


const ProfileGithub = ({username, getGithubRepos, repos}) => {
    useEffect(() => {
        getGithubRepos(username)
    }, [getGithubRepos, username])

    return <Fragment>
        <div className="profile-github">
          <h2 className="text-primary my-1"><i className="fab fa-github"></i> Github Repos </h2>
          { repos == null 
            ? <Spinner />
            :(repos.map(item => (
                <div key={item.id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        </h4>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {item.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Watchers: {item.watchers_count}
                            </li>
                            <li className="badge badge-light">
                                Forks: {item.forks_count}
                            </li>
                        </ul>
                    </div>
                </div>
            )))
        }
        </div>
    </Fragment>
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    getGithubRepos: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)