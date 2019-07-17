module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    })

    return Comment;
}