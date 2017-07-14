/**
 * Created by killer on 2017/2/7.
 */
let mongoose = require('mongoose')

let UserSchemas = new mongoose.Schema({
    username: String,
    password: String,
    jwxtId: String,
    jwxtPw: String,
    email: String,
})

UserSchemas.statics = {
    getSize: function(cb){
        return this
            .count()
            .exec(cb)
    },
    findById: function(id, cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    },
    findByUsername: function (username, cb) {
        return this
            .findOne({username:username})
            .exec(cb)
    }
}

module.exports = UserSchemas
