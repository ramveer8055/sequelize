const db = require('../models')
const { Sequelize, Op, QueryTypes } = require('sequelize')
const User = db.users;
const Contact = db.contacts
const Education = db.educations
const Customer = db.customers
const Profile = db.profiles
const Grant = db.grants
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


const validateUser = async (req, res) => {
    var user = {}
    var messages = {}
    try {
        user = await User.create({ firstName: "m2", lastName: "Chauhan" })
    } catch (e) {
        let message
        e.errors.forEach(error => {
            switch (error.validatorKey) {
                case 'isAlpha':
                    message = error.message
                    break;
                case 'isLowercase':
                    message = 'Only lower case allow'
                    break;
                case 'len':
                    message = 'please minimum 2 character and maximum 10'
                    break;

            }
            messages[error.path] = message
        });

    }
    res.status(200).json({
        data: user,
        messages: messages
    })
}


const rawQueries = async (req, res) => {

    // const users = await db.sequelize.query("SELECT * FROM `Users`", { 
    //     type: QueryTypes.SELECT,
    //     model:User,
    //     plain: true,
    // });
    // We didn't need to destructure the result here - the results were returned directly


    //------------------Replacements-------------------

    // const users = await db.sequelize.query(
    //     'SELECT * FROM Users WHERE id = ?',
    //     {
    //         replacements: [1],
    //         type: QueryTypes.SELECT
    //     }
    // );


    // const users = await db.sequelize.query(
    //     'SELECT * FROM Users WHERE firstName = :firstName',
    //     {
    //         replacements: { firstName: 'Manpreet' },
    //         type: QueryTypes.SELECT
    //     }
    // );

    // const users = await db.sequelize.query(
    //     'SELECT * FROM Users WHERE firstName IN(:firstName)',
    //     {
    //         replacements: { firstName: ['Manpreet', 'Ram'] },
    //         type: QueryTypes.SELECT
    //     }
    // );


    //-----------Like----------------------------
    // const users = await db.sequelize.query(
    //     'SELECT * FROM Users WHERE firstName LIKE :search_name',
    //     {
    //         replacements: { search_name: 'Ra%' },
    //         type: QueryTypes.SELECT
    //     }
    // );

    const users = await db.sequelize.query(
        'SELECT * FROM Users WHERE id=$id',
        {
            bind: { id: 1 },
            type: QueryTypes.SELECT
        }
    );
    res.status(200).json({
        status: true,
        data: users
    })
}

const oneToOneUser = async (req, res) => {
    // const user = await User.create({ firstName: 'ram', lastName: 'singh' })
    // if(user && user.id){
    //     await Contact.create({ permanent_address: 'fgh', current_address :'jkl', user_id: user.id})
    // }

    // const users = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include: {

    //         model: Contact,
    //         attributes: ['permanent_address', 'current_address'],

    //     },
    //     where:{
    //         id: 1
    //     }
    // })

    const contact = await Contact.findAll({
        attributes: ['permanent_address', 'current_address'],
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        }
    })
    res.status(200).json({
        status: true,
        data: contact
    })
}

const oneToManyUser = async (req, res) => {

    // const contact = await Contact.create({ permanent_address: 'Tes', current_address: 'test', user_id: 2 })

    //--------One To Many-----------------
    // const users = await User.findAll({
    //     attributes: ['id', 'firstName','lastName'],
    //     include:{
    //         model: Contact,
    //         attributes: ['id','current_address']
    //     }
    // })  

    //-------belongsTo-----------------
    const users = await Contact.findAll({
        include: User
    })

    res.status(200).json({
        status: true,
        data: users
    })
}

const manyToManyUser = async (req, res) => {
    const users = await Contact.findAll({
        include: User
    })


    // const users = await User.findAll({
    //     include: Contact
    // })

    res.status(200).json({
        status: true,
        data: users
    })
}

const paranoidUser = async (req, res) => {

    // const users = await User.create({
    //     first_name: "jjlkkjlml",
    //     last_name: "test"
    // })

    // const users = await User.destroy({
    //     where:{
    //         id: 4
    //     },
    //     // force: true //hard delete
    // })

    // const users = await User.restore({
    //     where: {
    //         id: 2
    //     }
    // })


    // const users = await User.findAll({
    //     paranoid:false
    // })


    const users = await User.findByPk(2, {
        paranoid: false
    })

    res.status(200).json({
        status: true,
        data: users
    })
}

const loadingUser = async (req, res) => {
    // const user = await User.create({ first_name: 'hello', last_name: 'singh' })
    // if(user && user.id){
    //     await Contact.create({ permanent_address: 'fgh', current_address :'jkl', user_id: user.id})
    // }

    const user = await User.findAll({
        where: {
            id: 2
        },

    })

    res.status(200).json({
        status: true,
        data: user
    })
}

const eagerUser = async (req, res) => {
    const user = await User.findAll({

        //---------Multiple Join--------------
        // include: [{
        //     model: Contact,
        //     // right: true,
        //     required: true
        // },{
        //     model: Education,
        //     // right: true,
        //     required: true
        // }]


        //-----Multiple Join-----------
        // include:{all:true}

        //-----------Nested Join------------
        // include:{
        //     model: Contact,
        //     include:{
        //         model: Education
        //     }
        // }

        //-------Nested Join-----------------
        include: { all: true, nested: true }
    })
    res.status(200).json({
        status: true,
        data: user
    })
}

const creatorUser = async (req, res) => {
    // const user = await User.create({ first_name: 'hello', last_name: 'singh' })
    // if (user && user.id) {
    //     await Contact.create({ permanent_address: 'fgh', current_address: 'jkl', user_id: user.id })
    // }


    // const user = await Contact.create({
    //     permanent_address: 'hapur',
    //     current_address: 'jamesdpur',
    //     users: {
    //         first_name: 'oo',
    //         last_name: 'dev'
    //     }
    // }, {
    //     include: [db.contactUser]
    // })

    //-------------BulkCreate-------------
    const user = await Contact.bulkCreate([{
        permanent_address: 'hapur',
        current_address: 'jamesdpur',
        users: {
            first_name: 'oo',
            last_name: 'dev'
        }
    }, {
        permanent_address: 'hapur',
        current_address: 'jamesdpur',
        users: {
            first_name: 'ooo',
            last_name: 'dev'
        }
    }], {
        include: [db.contactUser]
    })
    res.status(200).json({
        status: true,
        data: user
    })
}

const mNAssociationUser = async(req, res)=>{
    //----------------Lazy Loading-------------------------
    // const amidala = await Customer.create({ username: 'p4dm3', points: 1000 });
    // const queen = await Profile.create({ name: 'Queen' });
    // await amidala.addProfile(queen, { through: { selfGranted: false } });
    // const result = await Customer.findOne({
    //     where: { username: 'p4dm3' },
    //     include: Profile
    // });

    // --------------Eager Loading--------------------------
    // const amidala = await Customer.create({
    //     username: 'p4dm3',
    //     points: 1000,
    //     profiles: [{
    //         name: 'Queen',
    //         user_profile: {
    //             selfGranted: true
    //         }
    //     }]
    // }, {
    //     include: Profile
    // });

    
    //-------------Find Query-----------------
    // const result = await Profile.findOne({
    //     where: { name: 'Queen' },
    //     include: Customer
    // });

    // const result = await Customer.findOne({
    //     where: { username: 'p4dm3' },
    //     include: Profile
    // });

    // const data = await Customer.findAll({
    //     include: {
    //         model: Grant,
    //         include: Profile
    //     }
    // });

    const data = await db.customers.findOne({
        
            include: {
                model: Profile,
                through: {
                    attributes: ['id','self_granted']
                }
            }
       
    })

    res.status(200).json({
        status: true,
        data: data
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
    getSetVirtual,
    validateUser,
    rawQueries,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
    paranoidUser,
    loadingUser,
    eagerUser,
    creatorUser,
    mNAssociationUser
}