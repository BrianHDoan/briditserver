const router = require('express').Router();
const User = require('../models/user')
const Post = require('../db').import('../models/post');
const validateSession = require('../middleware/validateSession');

router.get('/posts', (req, res) => 
Post.findAll()
.then(post => res.status(200).json(post))
.catch(err => res.status(500).json({error:err}))
)

router.post('/createPost', validateSession, (req, res) => {
    const postInfo = {
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription,
        userId: req.user.id
    }
    Post.create(postInfo)
        .then(post => res.status(200).json(post))
        .catch(err => res.json(req.err))
})

router.put('/:id', (req, res) => {
    Post.update(req.body, {where: {id: req.params.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.json({errors: err}))
})

module.exports = router;