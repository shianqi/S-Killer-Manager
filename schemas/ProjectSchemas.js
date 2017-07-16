/**
 * Created by killer on 2017/2/12.
 */
const mongoose = require('mongoose')

const MongooseSchemas = new mongoose.Schema({
    address: String,
    describe: String
})

MongooseSchemas.statics = {
    getSize(cb) {
        return this
            .count()
            .exec(cb)
    }
}

module.exports = MongooseSchemas
