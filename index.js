require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db')

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'))

const user = require('./controllers/userController')
const post = require('./controllers/postController')
const comment = require('./controllers/commentController')

app.use('/user', user)

app.use(require('./middleware/validateSession'))

app.use('/post', post)
app.use('/comment', comment)

app.listen(process.env.PORT, () => console.log('App listening'))