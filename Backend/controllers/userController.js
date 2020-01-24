const model = require('../models')
const User = model.Users
const bcrypt = require('password-hash')
const jwt = require('jsonwebtoken')
const key = require('../config/key.json')

Users = () => {

}

Users.getUserDetails = (id) => {
    let promise = User.findOne({
        attributes: ['name'],
        where: {
            id
        }
    })

    return promise
}

Users.verifyUser = async (data) => {
    let { mail, password } = data;
    let auth;

    let promise = User.findAll({
        attributes: ['id', 'password'],
        where: {
            mail
        }
    })

    await promise.then((res) => {
        auth = res[0];
    })

    if (bcrypt.verify(password, auth.password)) {
        var activeToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, key.tokenKey)

        await User.update({
            activeToken
        }, {
            where: {
                id: auth.id
            }
        })

        return { token: activeToken };

    } else {
        return null;
    }
}

Users.createUser = async (data) => {
    let { mail, password, name } = data;
    var id;

    password = bcrypt.generate(password)
    let promise = await User.findAll({
        attributes: ['id'],
        where: {
            mail
        }
    })

    if (promise[0])
        return '409';

    promise = User.create({
        name, mail, password
    })

    await promise.then((res) => {
        id = res.id
    })

    let activeToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, key.tokenKey)

    await User.update({
        activeToken
    }, {
        where: {
            id: id
        }
    })

    return { token: activeToken }

}

Users.getUserName = (id) => {

    let promise = User.findOne({
        attributes: ['name'],
        where: {
            id
        }
    })

    return promise;
}

Users.getToken = async (id) => {
    let promise = await User.findOne({
        attributes: ['activeToken'],
        where: {
            id
        }
    })

    return promise;
}

Users.getId = async (activeToken) => {
    let promise = await User.findOne({
        attributes: ['id'],
        where: {
            activeToken
        }
    })

    return promise
}
    

Users.signOut = (id) => {
    let promise = User.update({
        activeToken: null
    }, {
        where: {
            id
        }
    })
    return promise
}

module.exports = Users