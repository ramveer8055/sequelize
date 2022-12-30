module.exports = (sequelize, DataTypes, User, Contact) => {
    const UserContacts = sequelize.define('user_contacts', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User, // 'User' would also work
                key: 'id'
            }
        },
        contact_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Contact, // 'Contact' would also work
                key: 'id'
            }
        }
    },{
        underscored: true
    });

    return UserContacts
}