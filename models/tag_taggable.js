module.exports = (sequelize, DataTypes, Model) => {
    class TagTaggable extends Model { }
    TagTaggable.init({
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint'
        },
        taggable_id: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint',
            references: null
        },
        taggable_type: {
            type: DataTypes.STRING,
            unique: 'tt_unique_constraint'
        }
    }, { sequelize, modelName: 'tag_taggable', underscored: true });
    return TagTaggable
}