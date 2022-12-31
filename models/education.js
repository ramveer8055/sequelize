module.exports = (sequelize, DataTypes) => {

    const Education = sequelize.define('Educations', {
        // Model attributes are defined here
        class_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        passing_year: DataTypes.INTEGER,
        contact_id: DataTypes.INTEGER
    }, {
        // Other model options go here
        underscored: true
    });
    return Education
}