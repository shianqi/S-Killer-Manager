/**
 * Created by killer on 2017/2/7.
 */
const mongoose = require('mongoose')

const ExaminationSchemas = new mongoose.Schema({
    userId: String,
    examination:[]
})

ExaminationSchemas.statics = {
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
    findByUsername(userId, cb) {
        return this
            .findOne({userId})
            .exec(cb)
    }
}

module.exports = ExaminationSchemas
