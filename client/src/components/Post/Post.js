import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPost } from '../../action/post'
import PostItem from '../Posts/PostItem'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import CommentForms from './CommentForms'
import CommentItem from './CommentItem'

const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id)
    },[getPost, match])
    
    return <Fragment>
        {   loading || post == null 
            ?   <Spinner />
            :   <Fragment>
                    <Link to='/posts' className='btn btn-primary'>Back To Post</Link>
                    <PostItem post={post} showAction={false} /> 
                    <CommentForms postId={post._id}/>
                    <div className="comments">
                        {post.comments.map(item => (
                            <CommentItem key={item._id} comment={item} postId={post._id} />
                        ))}
                    </div>
                </Fragment>
        }
    </Fragment>
}
Post.prototype = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post)