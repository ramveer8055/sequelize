const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('testDB', 'root', 'admin@123', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    // logging: false
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
db.educations = require('./education')(sequelize, DataTypes)
db.customers = require('./customer')(sequelize, DataTypes)
db.profiles = require('./profile')(sequelize, DataTypes)


//----------One To One--------------
// db.users.hasOne(db.contacts);  //{ foreignKey: 'user_id', as: 'contact_detials' } as always work on define foreignKey
// db.contacts.belongsTo(db.users);


//---------One To Many--------------
db.users.hasMany(db.contacts, { foreignkey: 'user_id' });
db.contactUser = db.contacts.belongsTo(db.users, { foreignKey: 'user_id', as: 'users' })


//------------Many To Many-----------------
// db.users.belongsToMany(db.contacts,{through: 'user_contacts'});
// db.contacts.belongsToMany(db.users, { through: 'user_contacts' });


//------------Many To Many-----------------
// db.users.belongsToMany(db.contacts, { through: db.usercontacts });
// db.contacts.belongsToMany(db.users, { through: db.usercontacts });


db.contacts.hasMany(db.educations)
db.educations.belongsTo(db.contacts)


//-------------Advanced M:N Association-----------------
const Grant = sequelize.define('grant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    self_granted: DataTypes.BOOLEAN
}, {
    timestamps: false,
    underscored: true
});

db.grants = Grant
db.customers.belongsToMany(db.profiles, { through: Grant, uniqueKey: 'my_custom_unique' });
db.profiles.belongsToMany(db.customers, { through: Grant, uniqueKey: 'my_custom_unique' });

// Setup a One-to-Many relationship between User and Grant
// db.customers.hasMany(db.grants);
// db.grants.belongsTo(db.customers);
// db.profiles.hasMany(db.grants);
// db.grants.belongsTo(db.profiles);


db.players = sequelize.define('player', { username: DataTypes.STRING }, { underscored: true });
db.teams = sequelize.define('team', { name: DataTypes.STRING }, { underscored: true });
db.games = sequelize.define('game', { name: DataTypes.STRING }, { underscored: true });

db.game_team = sequelize.define('game_team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    game_id:{
        type: DataTypes.INTEGER
    },
    team_id:{
        type: DataTypes.INTEGER
    }

}, { underscored: true });
db.teams.belongsToMany(db.games, { through: db.game_team });
db.games.belongsToMany(db.teams, { through: db.game_team });
db.game_team.belongsTo(db.games);
db.game_team.belongsTo(db.teams);
db.games.hasMany(db.game_team);
db.teams.hasMany(db.game_team);



// Super Many-to-Many relationship between Player and GameTeam
db.player_game_team = sequelize.define('player_game_team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    player_id:{
        type: DataTypes.INTEGER,
    },
    game_team_id:{
        type: DataTypes.INTEGER,
    }
}, { underscored: true });
db.players.belongsToMany(db.game_team, { through: db.player_game_team });
db.game_team.belongsToMany(db.players, { through: db.player_game_team });
db.player_game_team.belongsTo(db.players);
db.player_game_team.belongsTo(db.game_team);
db.players.hasMany(db.player_game_team);
db.game_team.hasMany(db.player_game_team);



//------------Polymorphic Associations -One to many--------------
db.images = require('./image')(sequelize, DataTypes, Model)
db.videos = require('./video')(sequelize, DataTypes, Model)
db.comments = require('./comment')(sequelize, DataTypes, Model)

db.images.hasMany(db.comments, {
    foreignKey: 'comment_table_id',
    constraints: false,
    scope: {
        comment_table_type: 'image'
    }
});
db.comments.belongsTo(db.images, { foreignKey: 'comment_table_id', constraints: false });



db.videos.hasMany(db.comments, {
    foreignKey: 'comment_table_id',
    constraints: false,
    scope: {
        comment_table_type: 'video'
    }
});
db.comments.belongsTo(db.videos, { foreignKey: 'comment_table_id', constraints: false });


// db.sequelize.sync({ force: true })

module.exports = db