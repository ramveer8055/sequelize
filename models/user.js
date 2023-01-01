module.exports = (sequelize, DataTypes, Model) => {


    class User extends Model { }

    User.init({
        // Model attributes are defined here
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlpha: {
                    msg: "Only alphabet allowed"
                },
                isLowercase: true,
                len: [2, 10],
            },
            get() {
                const rawValue = this.getDataValue('first_name');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
        last_name: {
            type: DataTypes.STRING,
            set(value) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
                this.setDataValue('last_name', value + ", Indian");
            }
            // allowNull defaults to true
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name} ${this.last_name}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        },
        status: DataTypes.BOOLEAN
    }, {
        // Method 1 via the .init() method
        // hooks: {
        //     beforeValidate: (user, options) => {
        //         user.last_name = 'happy';
        //     },
        //     afterValidate: (user, options) => {
        //         user.status = 1;
        //     }
        // },
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        underscored: true,
        paranoid: true,
    });

    // the defined model is the class itself
    console.log(User === sequelize.models.User); // true





    // const { DataTypes } = require('sequelize');
    // const sequelize = require('./index');

    // const User = sequelize.define('User', {
    //     // Model attributes are defined here
    //     first_name: {
    //         type: DataTypes.STRING,
    //         allowNull: false
    //     },
    //     last_name: {
    //         type: DataTypes.STRING,
    //         defaultValue: 'Singh'
    //         // allowNull defaults to true
    //     }
    // }, {
    //     // Other model options go here
    //     tableName: 'users',
    //     // timestamps: false,
    //     createdAt: false,
    //     // updatedAt: 'updated_at'
    //     underscored: true
    // });

    // // `sequelize.define` also returns the model
    // console.log(User === sequelize.models.User); // true


    // Method 2 via the .addHook() method
    // User.addHook('beforeValidate', (user, options) => {
    //     user.last_name = 'happy';
    // });

    // User.addHook('afterValidate', 'someCustomName', (user, options) => {
    //     user.status = 1
    // });


    // Method 3 via the direct method
    User.beforeValidate(async (user, options) => {
        user.last_name = 'rocky';
    });

    User.afterValidate('myHookAfter', (user, options) => {
        user.status = 0;
    });

    // User.removeHook('beforeValidate', 'myHookAfter');

    // User.removeHook()

    return User

}