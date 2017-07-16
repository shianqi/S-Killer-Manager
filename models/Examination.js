/**
 * Created by killer on 2017/2/7.
 */
const mongoose = require('mongoose')
const ExaminationSchemas = require('../schemas/ExaminationSchemas')

const Examination = mongoose.model('ExaminationSchemas',ExaminationSchemas)

module.exports = Examination
