import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../action/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return loading 
        ?<Spinner></Spinner>
        :<Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community!
            </p>
            <PostForm />
            <div className="posts">
                {posts.map(item => (
                    <PostItem key={item._id} post={item} />
                ))}
            </div>
        </Fragment>
}

Posts.prototype = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPosts})(Posts)