const router = require('express').Router();
const User = require('../db').import('../models/user')
const Post = require('../db').import('../models/post');
const validateSession = require('../middleware/validateSession');

router.get('/posts', validateSession, (req, res) => {
    // console.log(req.user)
    // Post.findAll({where: {userId : req.user.id}})
    Post.findAll()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error:err}))
}
)

router.get('/:id', validateSession, (req,res) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error:err}))
})

router.post('/createPost', validateSession, (req, res) => {
    
    const postInfo = {
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription,
        username: req.user.username,
        userId: req.user.id
    }
    Post.create(postInfo)
        .then(post => res.status(200).json(post))
        .catch(err => res.json(req.err))
})

router.put('/:id', validateSession, (req, res) => {
    Post.update(req.body, {where: {id: req.params.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.json({errors: err}))
})

router.delete('/:id', validateSession, (req, res) => {
    Post.destroy({where: {id: req.params.id, username: req.user.username}})
    .then(res => res.status(200).send('post has been deleted'))
    .catch(err => res.json({ error: err}))
})

module.exports = router;