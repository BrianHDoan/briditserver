require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db')

app.use(require('./middleware/headers'))
sequelize.sync({force:true});
app.use(express.json());

const user = require('./controllers/userController')
const post = require('./controllers/postController')
const comment = require('./controllers/commentController')

app.use('/user', user)

app.use(require('./middleware/validateSession'))

app.use('/post', post)
app.use('/comment', comment)

app.listen(process.env.PORT, () => console.log('App listening'))