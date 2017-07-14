/**
 * Created by killer on 2017/2/12.
 */
let mongoose = require('mongoose')

let MongooseSchemas = new mongoose.Schema({
    address: String,
    describe: String,
})

MongooseSchemas.statics = {
    getSize: function (cb) {
        return this
            .count()
            .exec(cb)
    }
}

module.exports = MongooseSchemas