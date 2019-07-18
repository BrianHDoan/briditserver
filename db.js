const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate()
.then(() => console.log('postgres is connected'))
.catch(err => console.log(err))

const User = sequelize.import('./models/user');
const Post = sequelize.import('./models/post');
const Comment = sequelize.import('./models/comment');

User.hasMany(Post);
User.hasMany(Comment);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post)

module.exports = sequelize;