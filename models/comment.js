module.exports = (sequelize, DataTypes, Model) => {
    class Comment extends Model { }
    Comment.init({
        title: DataTypes.STRING,
        comment_table_id: DataTypes.INTEGER,
        comment_table_type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'comment',
        underscored: true,
    });
    return Comment
}