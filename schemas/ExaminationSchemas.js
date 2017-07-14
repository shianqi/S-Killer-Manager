/**
 * Created by killer on 2017/2/7.
 */
let mongoose = require('mongoose')

let ExaminationSchemas = new mongoose.Schema({
    userId: String,
    examination:[],
})

ExaminationSchemas.statics = {
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
    findByUsername: function (userId, cb) {
        return this
            .findOne({userId:userId})
            .exec(cb)
    }
}

module.exports = ExaminationSchemas
