const db = require('../models')
const { Sequelize, Op } = require('sequelize')
const User = db.users;
const addUser = async (req, res) => {
    const jane = await User.create({ firstName: "Jane" });
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"
    // await jane.save();
    // jane.set({
    //     firstName: "Ada",
    //     lastName: "blue"
    // });

    console.log('Jane was saved to the database!');
    console.log(jane.toJSON());
    jane.update({
        firstName: "Hi",
        lastName: "blue"
    });
    await jane.save();
    await jane.destroy()
    res.status(200).json(jane.toJSON())
}

const getUsers = async (req, res) => {
    const data = await User.findAll()
    res.status(200).json({
        data: data
    })
}

const getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        data: data
    })
}

const postUser = async (req, res) => {
    // const data = await User.create({ firstName: "Ramveer", lastName: "Chauhan"})
    let postData = req.body
    if (postData.length > 1) {
        var data = await User.bulkCreate(postData)
    } else {
        var data = await User.create(postData)
    }

    res.status(200).json({
        data: data
    })
}

const deleteUser = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        data: data
    })
}

const patchUser = async (req, res) => {
    const data = await User.update({
        firstName: "TEST UPDATE",
        lastName: "Test ALSt"
    }, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        data: data
    })
}

const queryUser = async (req, res) => {
    // const user = await User.create({
    //     firstName: 'alice',
    //     lastName: 'gupta'
    // }, { fields: ['firstName'] });

    // const user = await User.findAll({
    //     attributes: [
    //         [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'count'],

    //     ]
    // })

    // const user = await User.findAll({
    //     attributes: {
    //         exclude:['firstName','id'],
    //         include:['id']
    //     }
    // })

    // const user = await User.findAll({
    //     where: {
    //         id: {
    //             [Op.eq]: 20
    //         }
    //     }
    // })


    //order by 
    // const user = await User.findAll({
    //     order:[
    //         ['id', 'DESC']
    //     ]
    // })

    //limit
    // const user = await User.findAll({
    //     limit:5
    // })

    //offset
    // const user = await User.findAll({
    //     offset: 5
    // })

    //count direct
    const user = await User.count({

    })
    res.status(200).json({
        data: user
    })
}


const finderUser = async (req, res) => {
    //-----find by Primary key-----------------
    // const user = await User.findByPk(20)

    //------find or create------------
    // const [user, created] = await User.findOrCreate({
    //     where: { firstName: 'Monu' },
    //     defaults: {
    //         lastName: 'Khare'
    //     }
    // });

    //------find and count all-------------
    const { count, rows } = await User.findAndCountAll({
        where: {
            lastName: 'Chauhan'
        }
    });
    res.status(200).json({
        data: rows,
        count: count
    })
}


const getSetVirtual = async (req, res) => {
    const user = await User.findAll()
    // const user = await User.create({firstName: "Ram", lastName: "Chauhan"})
    res.status(200).json({
        status: true,
        data: user
    })
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser,
    deleteUser,
    patchUser,
    queryUser,
    finderUser,
    getSetVirtual
}