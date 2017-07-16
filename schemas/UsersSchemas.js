/**
 * Created by killer on 2017/2/7.
 */
const mongoose = require('mongoose')

const UserSchemas = new mongoose.Schema({
    username: String,
    password: String,
    jwxtId: String,
    jwxtPw: String,
    email: String
})

UserSchemas.statics = {
    getSize(cb) {
        return this
            .count()
            .exec(cb)
    },
    findById(id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    },
    findByUsername(username, cb) {
        return this
            .findOne({username})
            .exec(cb)
    }
}

module.exports = UserSchemas
