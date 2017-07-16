/**
 * Created by killer on 2017/2/7.
 */
const mongoose = require('mongoose')
const UserSchemas = require('../schemas/UsersSchemas')

const Users = mongoose.model('UserSchemas',UserSchemas)

module.exports = Users
