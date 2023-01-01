module.exports = (sequelize, DataTypes, Model) => {
    class Video extends Model { }
    Video.init({
        title: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'video',
        underscored: true,
    });
    return Video
}