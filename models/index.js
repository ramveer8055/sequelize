const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('testDB', 'root', 'admin@123', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    logging: false
});


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user')(sequelize, DataTypes, Model)
db.contacts = require('./contact')(sequelize, DataTypes)
db.usercontacts = require('./userContacts')(sequelize, DataTypes, db.users, db.contacts)


//----------One To One--------------
// db.users.hasOne(db.contacts);  //{ foreignKey: 'user_id', as: 'contact_detials' } as always work on define foreignKey
// db.contacts.belongsTo(db.users);


//---------One To Many--------------
db.users.hasMany(db.contacts);
db.contacts.belongsTo(db.users)


//------------Many To Many-----------------
// db.users.belongsToMany(db.contacts,{through: 'user_contacts'});
// db.contacts.belongsToMany(db.users, { through: 'user_contacts' });


//------------Many To Many-----------------
// db.users.belongsToMany(db.contacts, { through: db.usercontacts });
// db.contacts.belongsToMany(db.users, { through: db.usercontacts });

// db.sequelize.sync({ force: true })

module.exports = db