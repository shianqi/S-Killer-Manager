/**
 * Created by killer on 2017/2/7.
 */
let mongoose = require('mongoose');
let ExaminationSchemas = require('../schemas/ExaminationSchemas');

let Examination = mongoose.model('ExaminationSchemas',ExaminationSchemas);

module.exports = Examination;