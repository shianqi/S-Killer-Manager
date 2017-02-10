/**
 * Created by killer on 2017/2/7.
 */
let mongoose = require('mongoose');
let UserSchemas = require('../schemas/UsersSchemas');

let Users = mongoose.model('UserSchemas',UserSchemas);

module.exports = Users;