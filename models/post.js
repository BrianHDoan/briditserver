module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Post;
}