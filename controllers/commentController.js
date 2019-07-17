const router = require('express').Router();
const Comment = require('../db').import('../models/comment');
const validateSession = require('../middleware/validateSession');
const User = require('../db').import('../models/user');
const Post = require('../db').import('../models/post');

router.get('/comments', (req, res) => 
Comment.findall()
.then(comment => res.status(200).json(comment))
.catch(err => res.status(500).json({error:err}))
)

router.post('/createComment/:id', validateSession, (req, res) => {
    console.log('params', req.params.id)
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
    // const commentInfo = {
    //     comment: req.body.comment,
    //     userId: req.user.id,
    //     postId: post.id
    // }
    
    console.log('postId', post.id )
    
    Comment.create({
        comment: req.body.comment,
        userId: req.user.id,
        postId: post.id})
    })
        .then(comment => res.status(200).json(comment))
        .then(err => res.send(500, err.message))
})


router.put('/:id', (req, res) => {
    Comment.update(req.body, {where: {id:req.params.id}})
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json({error:err}))
})

router.delete('/:id', (req, res) => {
    Comment.destroy({where: {id: req.params.id}})
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json({error:err}))
})

module.exports = router;