const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const { route } = require('./user');
const { json } = require('express');

// @route   Get api/posts
// @desc    Create route
// @access  Private
router.post('/', [auth, [
    check('text', 'Text Is Required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            text: req.body.text,
            user: user.id,
            name: user.name,
            avatar: user.avatar
        });
        console.log(user.name)
        await post.save();
        return res.status(201).json(post);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
});


// @route   Get api/posts
// @desc    Get All Post
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        const post = await Post.find().sort({date: -1});
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
});

// @route   Get api/posts
// @desc    Get Post By Id
// @access  Private
router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({msg: 'Post Not Availabel'})
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        if(error.kind == 'ObjectId') return res.status(404).json({msg: 'Post Not Availabel'});

        return res.status(500).json({msg: 'Server Error'});
    }
});

// @route   Delete api/posts/:id
// @desc    Delete Post By Id
// @access  Private
router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({msg: 'Post Not Availabel'});
        // Check Post Owner
        if(post.user.toString() !== req.user.id) return res.status(401).json({msg: 'User Not Authorized'});

        //Delete Post
        await post.remove();
        return res.status(200).json({msg: 'Post Deleted'});
    } catch (error) {
        console.log(error);
        if(error.kind == 'ObjectId') return res.status(404).json({msg: 'Post Not Availabel'});

        return res.status(500).json({msg: 'Server Error'});
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a Post
// @access  Private
router.put('/like/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post already been liked

        if((post.likes.filter(like=> like.user.toString() == req.user.id)).length > 0) {
            return res.status(400).json({msg: 'Post Already Liked'});
        }

        post.likes.unshift({user: req.user.id});
        await post.save();
        return res.status(200).json(post.likes);
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
});


// @route   PUT api/posts/unlike/:id
// @desc    UnLike a Post
// @access  Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post already been liked
        if((post.likes.filter(like=> like.user.toString() == req.user.id)).length === 0) {
            return res.status(400).json({msg: 'Post has not yet Liked'});
        }

        // Remove index
        const idx = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
    
        post.likes.splice(idx, 1);
        await post.save();
        return res.status(200).json(post.likes);
    } catch(error) {
        console.log(error);
        return res.status(500).json({msg: 'Server Error'});
    }
})


// @route   PUT api/posts/comment/:id
// @desc    Add Comment
// @access  Private
router.put('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        if(!post) throw Error('ObjectId');
        //Check if the post already been liked

        const comment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        };
        post.comments.unshift(comment);
        await post.save();
        return res.status(200).json(post.comments);
    } catch(error) {
        if(error.kind == 'ObjectId' || error.message == 'ObjectId') return res.status(400).json({msg: 'Post Not Availabel'});
        return res.status(500).json({msg: 'Server Error'});
    }
});


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete Comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if the post not available
        if(!post) throw Error('ObjectId');

        // Pull Comment
        const comment = post.comments.find(item => item.id === req.params.comment_id)

        if(!comment) return res.status(404).json({msg: 'Comment not found'});

        if(comment.user.toString() != req.user.id) 
            return res.status(401).json({msg: 'User Not Authorized'});
        
        const idx = post.comments.map(item => item.id.toString()).indexOf(req.params.comment_id);
        post.comments.splice(idx,1);
        await post.save();
        return res.status(200).json(post.comments);
    } catch(error) {
        console.log(error);
        if(error.kind == 'ObjectId' || error.message == 'ObjectId') return res.status(400).json({msg: 'Post Not Availabel'});
        return res.status(500).json({msg: 'Server Error'});
    }
});

module.exports = router;