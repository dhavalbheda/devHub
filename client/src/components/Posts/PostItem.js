import React, { Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { addLike, deletePost, removeLike } from '../../action/post'

const PostItem = ({addLike, removeLike, deletePost, auth, post: {_id, text, name, avatar, user, likes, comments, date}, showAction}) => {
    return <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        <Moment format='YYY/MM/DD'>{date}</Moment>
                    </p>
                    {showAction && <Fragment>
                        <button type="button" onClick={e => addLike(_id)} className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                            {likes.length > 0 && <span className='comment-count'>{likes.length}</span>}
                        </button>
                        <button type="button" onClick={e => removeLike(_id)} className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button type="button" onClick={e => deletePost(_id)} className="btn btn-danger">
                                <i className="fas fa-times"></i> Delete
                            </button>
                        )}
                    </Fragment>}
                </div>
            </div>
        </Fragment>
}

PostItem.defaultProps = {
    showAction: true
}

PostItem.prototype = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)